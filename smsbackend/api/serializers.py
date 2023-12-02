from rest_framework.serializers import ModelSerializer
from .models import Teacher, Studentdata, SectionA, SectionB, SectionC, SectionAattendance, SectionBattendance, SectionCattendance, Course, Subjects, TimeTable
from rest_framework import serializers


class SectionASerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionA
        fields = '__all__'


class SectionBSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionB
        fields = '__all__'


class SectionCSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionC
        fields = '__all__'


class SectionAattendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionAattendance
        fields = '__all__'


class SectionBattendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionBattendance
        fields = '__all__'


class SectionCattendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionCattendance
        fields = '__all__'


class StudentSerializer(ModelSerializer):
    class Meta:
        model = Studentdata
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class SubjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subjects
        fields = '__all__'


class TimeTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeTable
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'
