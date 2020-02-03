from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.hashers import make_password

class Persona(models.Model):
    """
    Clase que representa a una persona dentro del sistema
    """
    
    dni = models.PositiveIntegerField(null=True)

    def __str__(self):
        if self.sos(Usuario):
            # print("Soy usuario")
            usuario = self.como(Usuario)
            print("Soy usuario " + usuario.first_name)
        else:
            print("No soy usuario")
        # return f"{self.dni}"
        return "{0}".format(self.dni)

    def get_nombre_completo(self):
        """
        Metodo que permite obtener el nombre completo.
        """
        #TO DO: ver de obtener el nombre y apellido del rol usuario
        pass
        # return f"{self.nombre} {self.apellido}"

    def como(self, klass):
        """ 
        Retorna una instancia de un rol asociado a una persona con la ayuda 
        del método related de la clase Rol.
        Args
            Klass (string): nombre de una subclase de Rol
        Returns
            instancia de alguna subclase de Rol
        """
        return self.roles.get(tipo=klass.TIPO).related()

    def agregar_rol(self, rol):
        """ Agrega un rol a una persona.
        **Args:**
            - rol (string): rol - ACA ME PARECE QUE VA LA INSTANCIA DEL ROL NO UN STRING
        """
        if not self.sos(rol.__class__):
            rol.persona = self
            rol.save()

    def eliminar_rol(self, rol):
        
        if self.sos(rol.__class__):
            rol.delete()
        
        if len(self.roles_related()) == 0:
            self.delete()

    def roles_related(self):
        """ Retorna la colección de roles asociados a una persona. """
        return [rol.related() for rol in self.roles.all()]

    def sos(self, klass):
        """ Recibe una subclase de rol y retorna True si la persona está asociada y False si no.
        **Args:**
            - Klass (string): subclase de Rol
        **Returns:**
            - bool
        """
        return any([isinstance(rol, klass) for rol in self.roles_related()])

class Rol(models.Model):
    """
    Modelo genérico para la gestión de roles de usuarios dentro del sistema.
    """
    TIPO = 0
    ROLNAME = 'Rol'

    TIPOS = [
        (0, ROLNAME)
    ]

    tipo = models.PositiveSmallIntegerField(choices=TIPOS)
    persona = models.ForeignKey(
        Persona,
        related_name='roles',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return "{}".format(
            self.ROLNAME
        )

    def save(self, *args, **kwargs):
        # pylint: disable=W0221
        if self.pk is None:
            self.tipo = self.__class__.TIPO
        super(Rol, self).save(*args, **kwargs)

    def related(self):
        """ Retorna una instancia de una subclase de Rol """
        return self.__class__ != Rol and self or getattr(self, self.get_tipo_display())

    @classmethod
    def register(cls, klass):
        """ Método de clase para registrar TIPOS """
        cls.TIPOS.append((klass.TIPO, klass.__name__.lower()))


class Administrativo(Rol):
    """
    Clase que representa al rol administrativo dentro del sistema.
    Dicho rol se encarga de generar los ABM y los diplomas.
    """
    
    TIPO = 2
    ROLNAME = 'Administrativo'


class CustomUserManager(BaseUserManager):

    def create_user(self, username, password, email): ## tuve que agregar el mail porque sino no me andaba para crear un super usuario

        user = self.model(
            username = username,
            email = email
        )

        password = make_password(password)
        user.set_password(password)
        user.is_active = False
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, email):

        user = self.create_user(
            username = username,
            password = password,
            email = email
        )
        user.is_staff = True
        user.is_active = True
        user.is_superuser = True
        user.is_admin = True
        user.save(using=self._db)
        return user

class Usuario(Rol, AbstractUser):
    """ 
    Clase para el modelo de rol de Usuario.
    """
    TIPO = 1
    ROLNAME = "Usuario"

    pais = models.CharField(max_length=50, null=True)

    objects = CustomUserManager()

    def __str__(self):
        return "{}".format(self.username)

for Klass in Rol.__subclasses__():
    Rol.register(Klass)