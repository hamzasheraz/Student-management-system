from django.contrib import admin
from .models import Student, Subjects, Course


admin.site.register(Student)
admin.site.register(Course)
admin.site.register(Subjects)
