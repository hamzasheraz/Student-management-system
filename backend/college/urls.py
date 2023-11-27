from django.urls import path
from .import views

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("student-info/", views.get_student_info, name="student_info"),
]
