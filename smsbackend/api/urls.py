from django.urls import path
from .views import update_student_marks
from . import views

urlpatterns = [
    path("student-login/", views.student_login, name="login"),
    path('register-student/', views.register_student_for_course,
         name='register_course_student'),
    path("course-info/", views.get_course_info, name="courseinfo"),
    path("course-info/<str:pk>", views.get_course_info_id, name="coursesinfo"),
    path('subjects-info/<str:pk>/', views.subjects_info, name='post_subjects_info'),
    path('', views.getRoutes, name="routes"),
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

]
