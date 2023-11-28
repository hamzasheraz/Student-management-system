from django.urls import path
from .import views

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("student-info/", views.get_student_info, name="student_info"),
    path('post-courses/', views.post_course_info, name='post_courses_info'),
    path('course-info/', views.get_course_info, name='get_courses_info'),
    path('subjects-info/', views.subjects_info, name='post_subjects_info'),

]
