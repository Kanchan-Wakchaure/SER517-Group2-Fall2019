# Generated by Django 2.2.6 on 2019-11-15 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travlendar_app', '0003_auto_20191017_1059'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='notifyUsers',
            field=models.CharField(default='', max_length=300),
        ),
        migrations.AlterField(
            model_name='event',
            name='source',
            field=models.CharField(default='', max_length=300),
        ),
    ]
