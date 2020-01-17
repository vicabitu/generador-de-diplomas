from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['name', 'logo']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class FirmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirmaImage
        fields = '__all__'
