# Generated by Django 2.2.5 on 2019-10-04 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20191002_1101'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='phone_number',
            field=models.CharField(default='7893456098', max_length=300),
            preserve_default=False,
        ),
    ]
