from django.contrib import admin
from . models import *
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.admin import UserAdmin

admin.site.register(Persona)
# admin.site.register(Usuario)
admin.site.register(Administrativo)

# https://stackoverflow.com/questions/15012235/using-django-auth-useradmin-for-a-custom-user-model
class UsuarioChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = Usuario

class MyUserAdmin(UserAdmin):
    form = UsuarioChangeForm

    fieldsets = UserAdmin.fieldsets + (
            (None, {'fields': ('tipo','persona',)}),
    )


#Agrego a la admin de Django la posiblidad de ABM objetos del tipo Usuario
admin.site.register(Usuario, MyUserAdmin)