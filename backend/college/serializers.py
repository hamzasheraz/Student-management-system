from rest_framework import serializers
from .models import Student
from django.utils import timezone


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
