from django.contrib import admin
from .models import Teacher, TimeTable, Studentdata, SectionA, SectionB, SectionC, SectionAattendance, SectionBattendance, SectionCattendance, Course, Subjects
from .models import Notification
admin.site.register(Studentdata)
admin.site.register(SectionA)
admin.site.register(SectionB)
admin.site.register(SectionC)
admin.site.register(SectionAattendance)
admin.site.register(SectionBattendance)
admin.site.register(SectionCattendance)
admin.site.register(Course)
admin.site.register(Subjects)
admin.site.register(TimeTable)
admin.site.register(Teacher)
admin.site.register(Notification)