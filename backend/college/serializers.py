from rest_framework import serializers
from .models import Student
from django.utils import timezone


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['roll_number', 'email',
                  'password', 'first_name', 'last_name']

    # def create(self, validated_data):
    #     # Generate roll_number based on the pattern "Year-L****"
    #     current_year = timezone.now().year
    #     last_student = Student.objects.last()

    #     if last_student:
    #         last_roll_number = last_student.roll_number.split('-')[1]
    #         new_roll_number = f'{current_year}-L{str(int(last_roll_number) + 1).zfill(4)}'
    #     else:
    #         new_roll_number = f'{current_year}-L0001'

    #     # Add the generated roll_number to the validated data
    #     validated_data['roll_number'] = new_roll_number

    #     # Create and return the new instance
    #     return super().create(validated_data)
