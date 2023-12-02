from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Studentdata
from .serializers import StudentSerializer
from rest_framework import status
from .serializers import SectionASerializer, SectionBSerializer, SectionCSerializer
from .models import SectionA, SectionB, SectionC
from .models import SectionAattendance, SectionBattendance, SectionCattendance, Subjects, Course, TimeTable, Teacher
from .serializers import SectionAattendanceSerializer, SectionBattendanceSerializer, SectionCattendanceSerializer, CourseSerializer, SubjectsSerializer, TimeTableSerializer, TeacherSerializer
from django.http import JsonResponse
import logging
import json
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def register_student_for_course(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        selected_course_id = data.get('selectedCourse')
        rollNumber = data.get('rollNumber')
        # Assuming you have a way to identify the student, you can use request.user
        # Replace this with your actual logic to get the student instance
        student = Studentdata.objects.get(rollNumber=rollNumber)

        try:
            # Update the student's course
            student.course_id = selected_course_id
            student.save()

            # You can customize the response based on your requirements
            return Response({'success': True, 'message': 'Registration successful'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'success': False, 'message': 'Registration failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({'success': False, 'message': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def subjects_info(request, pk):
    if request.method == "GET":
        # Assuming user.course is a ForeignKey to the Course model
        subjects = Subjects.objects.filter(course=pk)
        serializer = SubjectsSerializer(subjects, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = SubjectsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_course_info_id(request, pk):
    courses = Course.objects.filter(id=0)
    serializer = CourseSerializer(courses)
    return Response(serializer.data)


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
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def getstudentsdata(request):
    data = Studentdata.objects.all()
    serializer = StudentSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getstudentdata(request, pk):
    data = Studentdata.objects.get(rollNumber=pk)
    serializer = StudentSerializer(data, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def update_student_marks(request, section, testtype, rollno):
    # Determine the model and serializer based on the section
    if section == 'SectionA':
        model = SectionA
        serializer_class = SectionASerializer
    elif section == 'SectionB':
        model = SectionB
        serializer_class = SectionBSerializer
    elif section == 'SectionC':
        model = SectionC
        serializer_class = SectionCSerializer
    else:
        return Response({'error': 'Invalid section'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Retrieve the specific student with the given rollno and testtype
        student = model.objects.get(rollno=rollno, testtype=testtype)

        # Use serializer to update the student with the request data
        serializer = serializer_class(
            instance=student, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # Return the serialized data of the updated student
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)  # Add this line for debugging
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except model.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
# def update_student_marks(request, section, testtype,rollno):
    # Determine the model and serializer based on the section
    if section == 'SectionA':
        model = SectionA
        serializer_class = SectionASerializer
    elif section == 'SectionB':
        model = SectionB
        serializer_class = SectionBSerializer
    elif section == 'SectionC':
        model = SectionC
        serializer_class = SectionCSerializer
    else:
        return Response({'error': 'Invalid section'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Retrieve all rows with the given test type
        students = model.objects.filter(testtype=testtype)
        # serializeri = serializer_class(data=students, many=True)
        # if serializeri.is_valid():
        #     serializeri.save()

        print("Retrieved Data:", students)
        if not students:
            return Response({'error': 'Students not found'}, status=status.HTTP_404_NOT_FOUND)

        print("Request Data:", request.data)
        for student in students:
            # Use serializer to validate and save each student
            serializer = serializer_class(data=student, partial=True)
            if serializer.is_valid():
                serializer.save()
            else:
                print(serializer.errors)  # Add this line for debugging
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Return the serialized data of all students
        return Response(serializer_class(students, many=True).data, status=status.HTTP_200_OK)

    except model.DoesNotExist:
        print("hello3")
        return Response({'error': 'Section not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def getsectiondata(request, section, testtype):
    print("pahlay walay ma hun")
    if section == 'SectionA':
        model = SectionA
        serializer_class = SectionASerializer
    elif section == 'SectionB':
        model = SectionB
        serializer_class = SectionBSerializer
    elif section == 'SectionC':
        model = SectionC
        serializer_class = SectionCSerializer
    else:

        # print(serializer_class.errors)  # Add this line
        return Response({'error': 'Invalid section'}, status=status.HTTP_400_BAD_REQUEST)

    data = model.objects.filter(testtype=testtype)
    if not data:

        return Response({'error': 'Section data not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer_class(data, many=True).data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getstudentmarks(request, rollno, testtype):
    student = Studentdata.objects.get(rollNumber=rollno)
    section = student.section
    print(section)
    if section == 'SectionA':
        model = SectionA
        serializer_class = SectionASerializer
    elif section == 'SectionB':
        model = SectionB
        serializer_class = SectionBSerializer
    elif section == 'SectionC':
        model = SectionC
        serializer_class = SectionCSerializer
    else:

        return Response({'error': 'Invalid section'}, status=status.HTTP_400_BAD_REQUEST)

    print(model)
    data = model.objects.filter(rollno=student.rollNumber, testtype=testtype)

    if not data:
        return Response({'error': 'Section data not found'}, status=status.HTTP_404_NOT_FOUND)

    else:
        return Response(serializer_class(data, many=True).data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getstudentattendance(request, section):
    if section == 'SectionA':
        model = SectionA
    elif section == 'SectionB':
        model = SectionB
    elif section == 'SectionC':
        model = SectionC
    else:
        return JsonResponse({'error': 'Invalid section'}, status=400)

    # Retrieve unique roll numbers
    u = model.objects.values_list('rollno').distinct()

    if not u:
        return JsonResponse({'error': 'Data not found'}, status=404)

    # Convert the queryset result to a list
    unique_rollnos_list = list(u)

    # Manually constructing the JSON response
    response_data = [{'rollno': rollno} for rollno in unique_rollnos_list]

    return JsonResponse(response_data, safe=False)


@api_view(['PUT', 'POST'])
def updatestudentattendance(request, section, rollno, date):
    try:
        if section == 'SectionA':
            model = SectionAattendance
            serializer_class = SectionAattendanceSerializer
        elif section == 'SectionB':
            model = SectionBattendance
            serializer_class = SectionBattendanceSerializer
        elif section == 'SectionC':
            model = SectionCattendance
            serializer_class = SectionCattendanceSerializer
        else:
            return JsonResponse({'error': 'Invalid section'}, status=400)

        try:
            student = model.objects.get(rollno=rollno, date=date)
        except model.DoesNotExist:
            student = None

        if not student:
            # Set the rollno in the request data
            request.data['rollno'] = rollno

            serializer = serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Set the rollno in the request data
            request.data['rollno'] = rollno

            serializer = serializer_class(
                instance=student, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'error': 'Not updated correctly'}, status=400)

    except model.DoesNotExist:
        return JsonResponse({'error': 'Student not found'}, status=404)


@api_view(['GET'])
def displaystudentattendance(request, rollno):
    student = Studentdata.objects.get(rollNumber=rollno)
    section = student.section
    print(section)
    if section == 'SectionA':
        model = SectionAattendance
        serializer_class = SectionAattendanceSerializer
    elif section == 'SectionB':
        model = SectionBattendance
        serializer_class = SectionBattendanceSerializer
    elif section == 'SectionC':
        model = SectionCattendance
        serializer_class = SectionCattendanceSerializer
    else:
        return JsonResponse({'error': 'Invalid section'}, status=400)

    print(model)
    data = model.objects.filter(rollno=student.rollNumber)

    if not data:
        return Response({'error': 'Section data not found'}, status=status.HTTP_404_NOT_FOUND)

    else:
        return Response(serializer_class(data, many=True).data, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
def student_login(request):
    # Ensure the request has JSON data
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    # Retrieve the rollNumber and password from the JSON data
    roll_number = data.get('rollNum')
    password = data.get('password')

    # Retrieve the student based on rollNumber
    student = Studentdata.objects.filter(rollNumber=roll_number).first()

    if student and password == student.password:
        # You may want to add additional checks or validations here
        response_data = {
            "roll_number": roll_number,
            "status": True,
        }
        return JsonResponse(response_data, status=200)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=401)


@api_view(['GET'])
def timetable(request, pk):
    timetable = TimeTable.objects.filter(section=pk)
    serializer = TimeTableSerializer(timetable, many=True)

    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
def teacher_login(request):
    # Ensure the request has JSON data
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    # Retrieve the rollNumber and password from the JSON data
    username = data.get('username')
    password = data.get('password')

    # Retrieve the student based on rollNumber
    teacher = Teacher.objects.filter(username=username).first()

    if teacher and password == teacher.password:
        # You may want to add additional checks or validations here
        response_data = {
            "status": True,
        }
        return JsonResponse(response_data, status=200)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=401)
