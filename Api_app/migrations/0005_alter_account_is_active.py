# Generated by Django 4.1.2 on 2022-10-14 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api_app', '0004_remove_account_full_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
