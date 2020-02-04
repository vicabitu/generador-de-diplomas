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
    path('eliminar_producto/<int:pk>', views.DeleteProduct.as_view(), name='eliminar_producto'),
    path('producto/<int:pk>', views.GetProduct.as_view(), name='producto'),
    # Firma
    path('crear_firma', views.CreateFirma.as_view(), name='crear_firma'),
    path('eliminar_firma/<int:pk>', views.DeleteFirma.as_view(), name='eliminar_firma'),
    # Aval
    path('crear_aval', views.CreateAval.as_view(), name='crear_aval'),
    path('eliminar_aval/<int:pk>', views.DeleteAval.as_view(), name='eliminar_aval'),
    path('generar_diplomas', views.GenerateDiploma.as_view(), name='generar_diplomas'),
    # Historial
    path('historial', views.ListDiplomaGenerationHistory.as_view(), name='historial')
]