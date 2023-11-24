from django.contrib.auth import login
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .auth_backends import StudentBackend
from django.http import JsonResponse
import json


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
                    # login(request, user,
                    #       backend='college.auth_backends.StudentBackend')
                    response_data = {"status": True}
                    return JsonResponse(response_data)
                else:
                    response_data = {"status": False}
                    return JsonResponse({"message": "Login failed"}, status=401)

            except json.JSONDecodeError:
                return JsonResponse({"message": "Invalid JSON data"}, status=400)
        else:
            return JsonResponse({"message": "Invalid content type"}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)
