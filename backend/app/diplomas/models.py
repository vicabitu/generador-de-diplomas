from django.db import models

class Institution(models.Model):
    name = models.CharField(max_length=60)
    logo = models.ImageField()

    def __str__(self):
        return "{0}".format(self.name)
