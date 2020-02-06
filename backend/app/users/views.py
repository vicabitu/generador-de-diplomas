from django.shortcuts import render
from rest_framework import generics
from .models import Usuario
from .serializers import *
from rest_framework.permissions import IsAuthenticated

class GetUser(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Usuario.objects.all()
    serializer_class = UserSerializer

class UpdateUser(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Usuario.objects.all()
    serializer_class = UpdateUserSerializer
