
from django.db import models

class Question(models.Model):
    question = models.CharField(max_length=256)
    option1 = models.CharField(max_length=256)
    option2 = models.CharField(max_length=256)
    answer = models.CharField(max_length=256)



class Iteration(models.Model):
    is_completed=models.BooleanField(default=False)
    title = models.CharField(max_length=256)
    question_answer_1=models.CharField(max_length=256,null=True)
    question_answer_2=models.CharField(max_length=256,null=True)
    question_answer_3=models.CharField(max_length=256,null=True)
    date_created = models.DateTimeField(auto_now=True)

    class Meta:
       ordering = ['-date_created']

