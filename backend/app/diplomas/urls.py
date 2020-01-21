from django.urls import path
from . import views

urlpatterns = [
    path('crear_institucion', views.CreateInstitution.as_view(), name='crear_institucion'),
    path('instituciones', views.ListInstitution.as_view(), name='instituciones'),
    path('crear_producto', views.CreateProduct.as_view(), name='crear_producto'),
    path('crear_firma', views.CreateFirma.as_view(), name='crear_firma'),
    path('crear_aval', views.CreateAval.as_view(), name='crear_aval')
]