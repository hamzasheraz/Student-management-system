# Generated by Django 4.2.7 on 2023-12-02 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_timetable_unique_together'),
    ]

    operations = [
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True)),
                ('section', models.CharField(blank=True, max_length=20, null=True)),
                ('username', models.TextField(unique=True)),
                ('password', models.TextField(blank=True, max_length=40)),
            ],
        ),
    ]
