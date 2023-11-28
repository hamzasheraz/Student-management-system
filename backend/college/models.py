from django.contrib.auth.models import AbstractBaseUser, User
from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password


class Course(models.Model):
    course_title = models.CharField(max_length=30, unique=True)
    fee = models.PositiveIntegerField()

    def __str__(self):
        return self.course_title


class Subjects(models.Model):
    course = models.ForeignKey(
        Course, related_name='subjects', on_delete=models.CASCADE)
    subject = models.CharField(max_length=50)

    def __str__(self):
        return self.subject


class Student(AbstractBaseUser):

    course = models.ForeignKey(
        Course, related_name='course_registered', on_delete=models.CASCADE, blank=True, null=True)

    BLOOD_GROUP_CHOICES = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
        ('NAN', 'NAN'),
    ]

    DEPARTMENT_CHOICES = [
        ('CS', 'CS'),
        ('ELECTRICAL', 'ELECTRICAL'),
        ('CIVIL', 'CIVIL'),
        ('yet_to_be_registered', 'Yet to be Registered'),
    ]

    NATIONALITY_CHOICES = [
        ('pakistani', 'Pakistani'),
        ('foreign', 'Foreign'),
    ]

    roll_number = models.CharField(max_length=20, unique=True, editable=False)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    department = models.CharField(
        max_length=40, choices=DEPARTMENT_CHOICES, default='yet_to_be_registered')
    batch = models.IntegerField(default=timezone.now().year, editable=False)
    blood_group = models.CharField(
        max_length=3, choices=BLOOD_GROUP_CHOICES, default='NAN')
    cnic = models.CharField(
        max_length=15, unique=True)
    dob = models.DateField()
    mobile_number = models.CharField(max_length=15, unique=True)
    nationality = models.CharField(
        max_length=15, choices=NATIONALITY_CHOICES, default='Pakistani')

    USERNAME_FIELD = 'roll_number'

    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'password',
                       'nationality', 'blood_group', 'department']

    def save(self, *args, **kwargs):
        if not self.roll_number:
            super().save(*args, **kwargs)  # Save the object to get a valid pk
            year_joined = timezone.now().year
            roll_number = f"{year_joined}L-{self.pk:04d}"
            self.roll_number = roll_number
            self.password = make_password(self.password)
            super().save(*args, **kwargs)
        else:
            self.password = make_password(self.password)
            super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.roll_number} - {self.first_name} {self.last_name}"
