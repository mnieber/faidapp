# Generated by Django 3.2.3 on 2021-05-19 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='name',
            field=models.CharField(default='cycrep', max_length=255),
            preserve_default=False,
        ),
    ]