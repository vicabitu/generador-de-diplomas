from django.db import models

class Institution(models.Model):
    name = models.CharField(max_length=60)
    logo = models.ImageField()

    def __str__(self):
        return "{0}".format(self.name)

class Product(models.Model):
    code = models.CharField(max_length=60)

    def __str__(self):
        return "{}".format("Id: " + str(self.id) + " - Codigo: " + str(self.code))

class AvalImage(models.Model):
    image = models.ImageField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='avales')

    def __str__(self):
        return "{}".format("Id: " + str(self.id) + " - Aval del producto: " + str(self.product.code))

class FirmaImage(models.Model):
    image = models.ImageField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='firmas')

    def __str__(self):
        return "{}".format("Id: " + str(self.id) + " - Firma del producto: " + str(self.product.code))