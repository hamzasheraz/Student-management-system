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


class Studentdata(models.Model):
    course = models.ForeignKey(
        Course, related_name='course_registered', on_delete=models.CASCADE, blank=True, null=True)
    name = models.TextField(null=False, blank=True)
    section = models.CharField(null=True, blank=True, max_length=20)
    password = models.TextField(null=False, blank=True, max_length=40)
    rollNumber = models.IntegerField(
        primary_key=True, blank=True, editable=False)
    department = models.TextField(null=True, blank=True)
    email = models.TextField(null=True, blank=True)
    group = models.TextField(null=True, blank=True)
    dob = models.TextField(null=True, blank=True)
    cnic = models.TextField(null=True, blank=True)
    nationality = models.TextField(null=True, blank=True)
    MobileNo = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.rollNumber:
            # Save the object to get a valid pk
            super().save(*args, **kwargs)

            # Check if pk is not None before formatting
            if self.pk is not None:
                rollNumber = f"{self.pk:04d}"
                self.rollNumber = rollNumber

                # Check if password is not None before hashing

            # self.password = make_password(self.password)

            super().save(*args, **kwargs)

        else:
            super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.rollNumber}'

# Create your models here.


# class test(models.Model):

#     sectiontype=models.CharField(null=True,blank=True)
#     rollno = models.ForeignKey(Studentdata.rollNumber, on_delete=models.CASCADE)

#     def __str__(self):
#        return self.name[0:50]


# class test2(models.Model):
#     sectiontype=models.CharField(null=True,blank=True)
#     rollno = models.ForeignKey(Studentdata.rollNumber, on_delete=models.CASCADE)

#     def __str__(self):
#        return self.name[0:50]


# class test3(models.Model):
#     sectiontype=models.CharField(null=True,blank=True)
#     rollno = models.ForeignKey(Studentdata.rollNumber, on_delete=models.CASCADE)

#     def __str__(self):
#        return self.name[0:50]

class SectionA(models.Model):
    testtype = models.CharField(null=True, blank=True, max_length=30)
    rollno = models.ForeignKey(
        Studentdata, on_delete=models.CASCADE, to_field='rollNumber')
    English = models.IntegerField(default=0)
    Maths = models.IntegerField(default=0)
    Urdu = models.IntegerField(default=0)
    Chemistry = models.IntegerField(default=0)
    SocialStudies = models.IntegerField(default=0)
    Physics = models.IntegerField(default=0)

    class Meta:
        unique_together = ['rollno', 'testtype']


class SectionB(models.Model):
    testtype = models.CharField(null=True, blank=True, max_length=30)
    rollno = models.ForeignKey(
        Studentdata, on_delete=models.CASCADE, to_field='rollNumber')
    English = models.IntegerField(default=0)
    Chemistry = models.IntegerField(default=0)
    Urdu = models.IntegerField(default=0)
    Physics = models.IntegerField(default=0)
    SocialStudies = models.IntegerField(default=0)
    Biology = models.IntegerField(default=0)

    class Meta:
        unique_together = ['rollno', 'testtype']


class SectionC(models.Model):
    testtype = models.CharField(null=True, blank=True, max_length=30)
    rollno = models.ForeignKey(
        Studentdata, on_delete=models.CASCADE, to_field='rollNumber')
    English = models.IntegerField(default=0)
    Maths = models.IntegerField(default=0)
    Urdu = models.IntegerField(default=0)
    ComputerScience = models.IntegerField(default=0)
    SocialStudies = models.IntegerField(default=0)
    Physics = models.IntegerField(default=0)

    class Meta:
        unique_together = ['rollno', 'testtype']


class SectionAattendance(models.Model):
    rollno = models.ForeignKey(
        Studentdata, on_delete=models.CASCADE, to_field='rollNumber')
    attendance = models.CharField(null=True, blank=True, max_length=10)
    date = models.CharField(null=True, blank=True, max_length=15)

    class Meta:
        unique_together = ['rollno', 'date']


class SectionBattendance(models.Model):
    rollno = models.ForeignKey(
        Studentdata, on_delete=models.CASCADE, to_field='rollNumber')
    attendance = models.CharField(null=True, blank=True, max_length=15)
    date = models.CharField(null=True, blank=True, max_length=10)

    class Meta:
        unique_together = ['rollno', 'date']


class SectionCattendance(models.Model):
    rollno = models.ForeignKey(
        Studentdata, on_delete=models.CASCADE, to_field='rollNumber')
    attendance = models.CharField(null=True, blank=True, max_length=15)
    date = models.CharField(null=True, blank=True, max_length=10)

    class Meta:
        unique_together = ['rollno', 'date']
