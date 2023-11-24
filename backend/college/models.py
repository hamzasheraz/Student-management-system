from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser
# Create your models here.


class Student(AbstractBaseUser):
    roll_number = models.CharField(max_length=20, unique=True, editable=False)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    USERNAME_FIELD = 'roll_number'

    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'password']

    def save(self, *args, **kwargs):
        if not self.roll_number:
            super().save(*args, **kwargs)  # Save the object to get a valid pk
            year_joined = timezone.now().year
            roll_number = f"{year_joined}L-{self.pk:04d}"
            self.roll_number = roll_number
            self.password = make_password(self.password)
            super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.roll_number} - {self.first_name} {self.last_name}"
