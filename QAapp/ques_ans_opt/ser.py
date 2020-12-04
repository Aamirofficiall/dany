from rest_framework import routers, serializers, viewsets
from django.urls import path, include
from .models import *


class IterationSer(serializers.ModelSerializer):

    class Meta:
        model = Iteration
        fields = [
            'id', 'title','question_answer_1', 'question_answer_2', 'question_answer_3',
            'is_completed',
            'date_created'
            ]
        read_only_fields=('date_created', )

class QuestionSer(serializers.ModelSerializer):
    
    class Meta:
        model = Question
        fields = '__all__'
