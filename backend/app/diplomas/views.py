from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

class CreateInstitution(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        institution_serializer = InstitutionSerializer(data=request.data)
        if institution_serializer.is_valid():
            institution_serializer.save()
            return Response(institution_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(institution_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateProduct(generics.CreateAPIView):
    serializer_class = ProductSerializer

class CreateFirma(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        firma_serializer = FirmaSerializer(data=request.data)
        if firma_serializer.is_valid():
            firma_serializer.save()
            return Response(firma_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(firma_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
