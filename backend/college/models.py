from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser
# Create your models here.


class Student(AbstractBaseUser):

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
        ('pre_engineering', 'Pre Engineering'),
        ('medical', 'Medical'),
        ('icom', 'I.Com'),
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
    cnic = models.CharField(max_length=15, default='Not submitted yet')
    dob = models.DateField()
    mobile_number = models.CharField(max_length=15)
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
            super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.roll_number} - {self.first_name} {self.last_name}"
