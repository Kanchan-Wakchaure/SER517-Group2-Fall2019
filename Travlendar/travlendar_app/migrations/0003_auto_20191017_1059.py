# Generated by Django 2.2.5 on 2019-10-17 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travlendar_app', '0002_auto_20191007_1242'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='lat',
            field=models.DecimalField(decimal_places=6, default=0, max_digits=9),
        ),
        migrations.AddField(
            model_name='event',
            name='long',
            field=models.DecimalField(decimal_places=6, default=0, max_digits=9),
        ),
    ]
