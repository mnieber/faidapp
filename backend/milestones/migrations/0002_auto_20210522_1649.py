# Generated by Django 3.2.3 on 2021-05-22 16:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
        ('milestones', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='milestone',
            name='is_completed',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='milestone',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='milestones', to='projects.project'),
        ),
    ]
