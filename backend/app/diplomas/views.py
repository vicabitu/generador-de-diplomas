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

class ListInstitution(generics.ListAPIView):
    serializer_class = ListInstitutionSerializer
    queryset = Institution.objects.all()

class CreateProduct(generics.CreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def post(self, request, *args, **kwargs):
        product = self.queryset.filter(code=request.data["code"]).first()
        if product is None:
            new_product = Product.objects.create(code=request.data["code"])
            return Response(data=ProductSerializer(new_product).data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                data={
                    "error": f"Ya existe el producto con el codigo: '{request.data['code']}'.",
                },
                status=status.HTTP_409_CONFLICT
            )

class CreateFirma(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        firma_serializer = FirmaSerializer(data=request.data)
        if firma_serializer.is_valid():
            firma_serializer.save()
            return Response(firma_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(firma_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateAval(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        aval_serializer = AvalSerializer(data=request.data)
        if aval_serializer.is_valid():
            aval_serializer.save()
            return Response(aval_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(aval_serializer.errors, status=status.HTTP_400_BAD_REQUEST)