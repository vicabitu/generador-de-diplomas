from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *
from users.serializers import UserSerializer

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['name', 'logo']

class ListInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['name', 'logo', 'id']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class FirmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirmaImage
        fields = '__all__'

class AvalSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvalImage
        fields = '__all__'

class ListProductSerializer(serializers.ModelSerializer):
    firmas = FirmaSerializer(many=True)
    avales = AvalSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'code', 'firmas', 'avales']

class DiplomaGenerationHistorySerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = DiplomaGenerationHistory
        fields = ['id', 'date', 'observations', 'file_name', 'user']