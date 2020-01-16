from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['name', 'logo']
