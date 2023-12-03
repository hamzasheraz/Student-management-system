from django.urls import path
from .views import update_student_marks
from . import views

urlpatterns = [
    path("student-login/", views.student_login, name="login"),
    path("teacher-login/", views.teacher_login, name="login"),
    path("student-edit/", views.student_edit, name="student_edit"),
    path("teacher-edit/", views.teacher_edit, name="teacher_edit"),
    path("view-timetable/<str:pk>", views.timetable, name="timetable"),
    path('register-student/', views.register_student_for_course,
         name='register_course_student'),
    path("course-info/", views.get_course_info, name="courseinfo"),
    path("courses-info/", views.get_course_info_id, name="coursesinfo"),
    path('subjects-info/<str:pk>/', views.subjects_info, name='post_subjects_info'),
    path('studentsdata/', views.getstudentsdata, name="studentsdata"),
    path('studentsdata/<str:pk>/', views.getstudentdata, name="studentsdata"),
    path('studentsdata/<str:section>/<str:testtype>',
         views.getsectiondata, name="studentsdata"),
    path('update_student_marks/<str:section>/<str:testtype>/<str:rollno>',
         update_student_marks, name="update_student_marks"),
    path('students2data/<str:rollno>/<str:testtype>',
         views.getstudentmarks, name="studentsmarksdata"),
    path('studentsattendancedata/<str:section>',
         views.getstudentattendance, name="studentsattendancedata"),
    path('updatestudentattendance/<str:section>/<str:rollno>/<str:date>',
         views.updatestudentattendance, name="updatestudentattendance"),
    path('displaystudentattendance/<str:rollno>',
         views.displaystudentattendance, name="displaystudentattendance"),
    path('displaynotifications/<str:rollno>',
         views.getnotifications, name="displaynotifications"),


]
