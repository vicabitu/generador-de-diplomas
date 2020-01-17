from django.urls import path
from . import views

urlpatterns = [
    path('crear_institucion', views.CreateInstitution.as_view(), name='crear_institucion'),
    path('crear_producto', views.CreateProduct.as_view(), name='crear_producto')
]