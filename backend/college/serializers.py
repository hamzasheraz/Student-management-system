from rest_framework import serializers
from .models import Student
from django.utils import timezone


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['email', 'first_name', 'last_name', 'password', 'cnic',
                  'dob', 'mobile_number', 'nationality', 'blood_group', 'department']
