from django.urls import path
from . import views

urlpatterns = [
    # Institution
    path('crear_institucion', views.CreateInstitution.as_view(), name='crear_institucion'),
    path('instituciones', views.ListInstitution.as_view(), name='instituciones'),
    path('eliminar_institucion/<int:pk>', views.DeleteInstitution.as_view(), name='eliminar_institucion'),
    path('modificar_institucion/<int:pk>', views.UpdateInstitution.as_view(), name='modificar_institucion'),
    path('institucion/<int:pk>', views.GetInstitution.as_view(), name='institucion'),
    # Product
    path('crear_producto', views.CreateProduct.as_view(), name='crear_producto'),
    path('products', views.ListProducts.as_view(), name='products'),
    path('crear_firma', views.CreateFirma.as_view(), name='crear_firma'),
    path('crear_aval', views.CreateAval.as_view(), name='crear_aval')
]