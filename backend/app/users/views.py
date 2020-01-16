from django.shortcuts import render
from rest_framework import generics
from .models import Usuario
from .serializers import *

class GetUser(generics.RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UserSerializer

class UpdateUser(generics.UpdateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UpdateUserSerializer
