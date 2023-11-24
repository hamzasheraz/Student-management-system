from django.contrib.auth.backends import ModelBackend
from .models import Student


class StudentBackend(ModelBackend):
    def authenticate(self, request, roll_number=None, password=None, **kwargs):
        try:
            student = Student.objects.get(roll_number=roll_number)
        except Student.DoesNotExist:
            return None

        if student.check_password(password):
            return student

    def get_user(self, user_id):
        try:
            return Student.objects.get(pk=user_id)
        except Student.DoesNotExist:
            return None
