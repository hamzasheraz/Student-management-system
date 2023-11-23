from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.StudentSerializer):
    class Meta:
        model = Student
        fields = ('first_name', 'last_name',
                  'email', 'roll_number', 'password')
