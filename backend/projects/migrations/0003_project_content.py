# Generated by Django 3.2.3 on 2021-05-19 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_project_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='content',
            field=models.JSONField(default={}),
            preserve_default=False,
        ),
    ]