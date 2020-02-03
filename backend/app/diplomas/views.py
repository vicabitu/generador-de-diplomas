from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
# Para la generacion del pdf
import pandas as pd
from io import BytesIO
from diplomas.diploma import Diploma
from django.http import HttpResponse
from django.http import FileResponse
import zipfile
import io
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from datetime import datetime

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

class DeleteInstitution(generics.DestroyAPIView):
    serializer_class = InstitutionSerializer
    queryset = Institution.objects.all()

class GetInstitution(generics.RetrieveAPIView):
    serializer_class = ListInstitutionSerializer
    queryset = Institution.objects.all()

class UpdateInstitution(generics.UpdateAPIView):
    serializer_class = InstitutionSerializer
    queryset = Institution.objects.all()

    def put(self, request, *args, **kwargs):

        institution = self.queryset.filter(id=request.data['id']).first()

        if request.data['logo'] != '' and request.data['name'] != '': # tengo logo e imagen, modifico los dos campos
            institution.name = request.data['name']
            institution.logo = request.data['logo']
            institution.save()
            return Response(data=InstitutionSerializer(institution).data, status=status.HTTP_200_OK)
        elif request.data['logo'] != '': # tengo imagen, modifico solo la imagen
            institution.logo = request.data['logo']
            institution.save()
            return Response(data=InstitutionSerializer(institution).data, status=status.HTTP_200_OK)
        elif request.data['name'] != '': # tengo nombre, modifico solo el nombre
            institution.name = request.data['name']
            institution.save()
            return Response(data=InstitutionSerializer(institution).data, status=status.HTTP_200_OK)
    
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

class DeleteProduct(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class ListProducts(generics.ListAPIView):
    serializer_class = ListProductSerializer
    queryset = Product.objects.all()

class GetProduct(generics.RetrieveAPIView):
    serializer_class = ListProductSerializer
    queryset = Product.objects.all()

class CreateFirma(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        firma_serializer = FirmaSerializer(data=request.data)
        if firma_serializer.is_valid():
            firma_serializer.save()
            return Response(firma_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(firma_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteFirma(generics.DestroyAPIView):
    serializer_class = FirmaSerializer
    queryset = FirmaImage.objects.all()

class CreateAval(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        aval_serializer = AvalSerializer(data=request.data)
        if aval_serializer.is_valid():
            aval_serializer.save()
            return Response(aval_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(aval_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteAval(generics.DestroyAPIView):
    serializer_class = AvalSerializer
    queryset = AvalImage.objects.all()

class GenerateDiploma(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        attachment_file = request.data['file']
        df = pd.read_excel(attachment_file, 'Hoja1')

        zip_buffer = BytesIO()
        zip_filename = 'finalizados-' + datetime.now().strftime("%d-%m-%Y") + '.zip'
        with zipfile.ZipFile(zip_buffer, "a", zipfile.ZIP_DEFLATED) as zip_file:
            # Por cada file del excel genero un diploma
            for index, row in df.iterrows():
                # Elimino los espacios en blanco al final del nombre del archivo y agrego los -
                pdf_filename = row['Nombre y apellido'].rstrip().replace(' ', '-') + '.pdf'
                buffer = BytesIO()
                diploma = Diploma(buffer)
                pdf = diploma.generar(row)
                zip_file.writestr(pdf_filename, pdf.getvalue())
        
        zip_buffer.seek(0)

        # Almaceno el archivo en la carpeta media
        folder = '/diplomas/'
        fs = FileSystemStorage(location=settings.MEDIA_ROOT + folder)
        filename = fs.save(zip_filename, zip_buffer)
        filename_url = fs.url(filename)

        return Response(
                data={"url_file": filename_url,},
                status=status.HTTP_200_OK
            )


        # resp = HttpResponse(zip_buffer, content_type='application/zip')
        # resp['Content-Disposition'] = 'attachment; filename = %s' % zip_filename
        # return resp
        
        # return FileResponse(zip_buffer, as_attachment=True, filename='diplomas.zip')

        # return Response(status=204)