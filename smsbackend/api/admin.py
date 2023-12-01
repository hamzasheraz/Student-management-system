from django.contrib import admin
from .models import Studentdata, SectionA, SectionB, SectionC, SectionAattendance, SectionBattendance, SectionCattendance, Course, Subjects

admin.site.register(Studentdata)
admin.site.register(SectionA)
admin.site.register(SectionB)
admin.site.register(SectionC)
admin.site.register(SectionAattendance)
admin.site.register(SectionBattendance)
admin.site.register(SectionCattendance)
admin.site.register(Course)
admin.site.register(Subjects)
