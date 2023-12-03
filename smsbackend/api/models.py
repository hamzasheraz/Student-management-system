from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password


class Person(models.Model):
    names = models.TextField(null=False, blank=True)
    sections = models.CharField(null=True, blank=True, max_length=20)
    passwords = models.TextField(null=False, blank=True, max_length=40)


class Course(models.Model):
    course_title = models.CharField(max_length=30, unique=True)
    fee = models.PositiveIntegerField()

    def get_course_name(self):
        return self.course_title

    def get_course_fee(self):
        return self.fee

    def __str__(self):
        return self.course_title


class Subjects(models.Model):
    course = models.ForeignKey(
        Course, related_name='subjects', on_delete=models.CASCADE)
    subject = models.CharField(max_length=50)

    def get_subject(self):
        return self.subject

    def __str__(self):
        return self.subject


class Teacher(models.Model):

    name = models.TextField(null=False, blank=True)
    section = models.CharField(null=True, blank=True, max_length=20)
    username = models.TextField(unique=True)
    password = models.TextField(null=False, blank=True, max_length=40)

    def get_name(self):
        return self.name

    def get_section(self):
        return self.section

    def get_username(self):
        return self.username

    def get_password(self):
        return self.password

    def __str__(self):
        return f'{self.username} - {self.section}'


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

    def get_name(self):
        return self.name

    def get_section(self):
        return self.section

    def get_password(self):
        return self.password

    def get_rollNumber(self):
        return self.rollNumber

    def get_department(self):
        return self.department

    def get_email(self):
        return self.email

    def get_bloodgroup(self):
        return self.group

    def get_date_of_birth(self):
        return self.dob

    def get_cnic(self):
        return self.cnic

    def get_nationality(self):
        return self.nationality

    def get_phone(self):
        return self.MobileNo

    def save(self, *args, **kwargs):
        if not self.rollNumber:
            # Save the object to get a valid pk
            super().save(*args, **kwargs)

            # Check if pk is not None before formatting
            if self.pk is not None:
                rollNumber = f"{self.pk:04d}"
                self.rollNumber = rollNumber

                # Check if password is not None before hashing
                if self.password:
                    self.password = make_password(self.password)

                # Save the object after setting rollNumber and hashing password
                super().save(*args, **kwargs)

        else:
            super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.rollNumber}'


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

    def get_english_marks(self):
        return self.English

    def get_maths_marks(self):
        return self.Maths

    def get_urdu_marks(self):
        return self.Urdu

    def get_computer_marks(self):
        return self.ComputerScience

    def get_pakstudies_marks(self):
        return self.SocialStudies

    def get_physics_marks(self):
        return self.physics

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

    def get_english_marks(self):
        return self.English

    def get_maths_marks(self):
        return self.Maths

    def get_urdu_marks(self):
        return self.Urdu

    def get_computer_marks(self):
        return self.ComputerScience

    def get_pakstudies_marks(self):
        return self.SocialStudies

    def get_physics_marks(self):
        return self.physics

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

    def get_english_marks(self):
        return self.English

    def get_maths_marks(self):
        return self.Maths

    def get_urdu_marks(self):
        return self.Urdu

    def get_computer_marks(self):
        return self.ComputerScience

    def get_pakstudies_marks(self):
        return self.SocialStudies

    def get_physics_marks(self):
        return self.physics

    class Meta:
        unique_together = ['rollno', 'testtype']


class SectionAattendance(models.Model):
    rollno = models.ForeignKey(
        Studentdata, on_delete=models.CASCADE, to_field='rollNumber')
    attendance = models.CharField(null=True, blank=True, max_length=10)
    date = models.CharField(null=True, blank=True, max_length=15)

    def get_attendance(self):
        return self.attendance

    def get_date(self):
        return self.date

    class Meta:
        unique_together = ['rollno', 'date']


class SectionBattendance(models.Model):
    rollno = models.ForeignKey(
        Studentdata, on_delete=models.CASCADE, to_field='rollNumber')
    attendance = models.CharField(null=True, blank=True, max_length=15)
    date = models.CharField(null=True, blank=True, max_length=10)

    def get_attendance(self):
        return self.attendance

    def get_date(self):
        return self.date

    class Meta:
        unique_together = ['rollno', 'date']


class SectionCattendance(models.Model):
    rollno = models.ForeignKey(
        Studentdata, on_delete=models.CASCADE, to_field='rollNumber')
    attendance = models.CharField(null=True, blank=True, max_length=15)
    date = models.CharField(null=True, blank=True, max_length=10)

    def get_attendance(self):
        return self.attendance

    def get_date(self):
        return self.date

    class Meta:
        unique_together = ['rollno', 'date']


class TimeTable(models.Model):
    DAYS_OF_WEEK = (
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
    )

    Sections = (
        ('SectionA', 'SectionA'),
        ('SectionB', 'SectionB'),
        ('SectionC', 'SectionC'),
    )

    section = models.CharField(max_length=20, choices=Sections)
    lecture_title = models.CharField(max_length=255)
    lecturer = models.CharField(max_length=255)
    duration = models.CharField(max_length=20)
    day_of_week = models.CharField(max_length=10, choices=DAYS_OF_WEEK)

    def get_section(self):
        return self.section

    def get_lecture_title(self):
        return self.lecture_title

    def get_lecturer(self):
        return self.lecturer

    def get_duration(self):
        return self.duration

    def get_day(self):
        return self.day_of_week

    class Meta:
        unique_together = ['section', 'lecture_title', 'day_of_week']

    def __str__(self):
        return f'{self.lecture_title} - {self.day_of_week} - {self.duration}'


class Notification(models.Model):
    roll_number = models.ForeignKey(Studentdata, on_delete=models.CASCADE)
    notification_text = models.TextField()
    testtype = models.CharField(null=True, blank=True, max_length=30)

    def get_notification(self):
        return self.notification_text

    def get_test(self):
        return self.testtype

    def __str__(self):
        return f'Notification for {self.roll_number.rollNumber}'
