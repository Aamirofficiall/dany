# Generated by Django 3.1.4 on 2020-12-01 20:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ques_ans_opt', '0002_iterations_is_completed'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Iterations',
            new_name='Iteration',
        ),
        migrations.RenameModel(
            old_name='Questions',
            new_name='Question',
        ),
    ]
