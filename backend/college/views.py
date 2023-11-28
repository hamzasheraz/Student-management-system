from django.contrib.auth import login
from django.views.decorators.csrf import csrf_exempt
from .auth_backends import StudentBackend
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import StudentSerializer, CourseSerializer, SubjectsSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
import json
from rest_framework import status
from .models import Course, Subjects


@api_view(['GET', 'POST'])
def subjects_info(request):
    if request.method == "GET":
        subjects = Subjects.objects.all()
        serializer = SubjectsSerializer(subjects, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = SubjectsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_course_info(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def post_course_info(request):
    serializer = CourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_student_info(request):
    # Get the user from the request
    student = request.user

    # Serialize the student data
    serializer = StudentSerializer(student)

    # Return the serialized data as a JSON response
    return Response(serializer.data)


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        if request.content_type == "application/json":
            try:
                # Parse JSON data from the request body
                data = json.loads(request.body)
                roll_number = data.get("rollNum")
                password = data.get("password")

                user = StudentBackend().authenticate(
                    request, roll_number=roll_number, password=password)

                if user is not None:
                    login(request, user,
                          backend='college.auth_backends.StudentBackend')
                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)
                    response_data = {
                        "status": True,
                        "access_token": access_token,
                    }
                    return JsonResponse(response_data, status=200)
                else:
                    response_data = {"status": False}
                    return JsonResponse({"message": "Login failed"}, status=401)

            except json.JSONDecodeError:
                return JsonResponse({"message": "Invalid JSON data"}, status=400)
        else:
            return JsonResponse({"message": "Invalid content type"}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)