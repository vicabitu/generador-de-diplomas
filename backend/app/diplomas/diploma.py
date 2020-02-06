from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import blue
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from diplomas.models import *
from generador_de_diplomas.settings import STATIC_URL

from reportlab.platypus import Paragraph, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from PIL import Image

class Diploma:

    def __init__(self, buffer):
        self.buffer = buffer

    # paso la medida a mm.
    def m(self, medida):
        return medida*mm

    # Recibe un color en RGB y lo convierte en un valor entre 0 y 1.
    # Para que entre en el rango de reportlab.
    def col(self, color_256):
        return color_256/256

    def generar(self, row):
        # Defino las tipografias.
        pdfmetrics.registerFont(TTFont('GOTHAM-THIN', 'diplomas' + STATIC_URL + 'diplomas/fonts/GOTHAM-THIN.TTF'))
        pdfmetrics.registerFont(TTFont('GOTHAM-LIGHT', 'diplomas' + STATIC_URL + 'diplomas/fonts/GOTHAM-LIGHT.TTF'))
        pdfmetrics.registerFont(TTFont('GOTHAM-BLACK', 'diplomas' + STATIC_URL + 'diplomas/fonts/GOTHAM-BLACK.TTF'))
        pdfmetrics.registerFont(TTFont('GOTHAM-BOOK', 'diplomas' + STATIC_URL + 'diplomas/fonts/Gotham-Book.ttf'))
        pdfmetrics.registerFont(TTFont('GOTHAM-BOLD', 'diplomas' + STATIC_URL + 'diplomas/fonts/GOTHAM-BOLD.TTF'))

        c = canvas.Canvas(self.buffer, landscape(A4))
        ancho, alto = landscape(A4)

        # Recuadro azul
        c.setStrokeColorRGB(self.col(82),self.col(133),self.col(197))
        c.setLineWidth(self.m(20.30))
        c.rect(0, 0, ancho, alto, stroke=1, fill=0)

        # Logo de la istitucion
        # c.drawImage('imagenes/asco_logo.png', m(168.500), m(170.608), width=m(100.168), height=m(12.509))
        c.drawImage('diplomas' + STATIC_URL + 'diplomas/images/asco_logo.png', self.m(168.500), self.m(170.608), width=self.m(100.168), height=self.m(18))

        # Logo de oceano medicina
        # c.drawImage('imagenes/logo-oceano-2.png', m(36.154), m(166.67), width=m(35.106), height=m(17.902))
        c.drawImage('diplomas' + STATIC_URL + 'diplomas/images/logo-oceano-2.png', self.m(36.154), self.m(166.67), width=self.m(36.500), height=self.m(19.000))
        c.drawImage('diplomas' + STATIC_URL + 'diplomas/images/formacion-online-2.png', self.m(79.224), self.m(171.293), width=self.m(14), height=self.m(14))


        c.setFont("GOTHAM-LIGHT", 12)
        c.drawString(self.m(36.154),self.m(145.271),"Certifica que:")

        c.setFont("GOTHAM-LIGHT", 18)
        # Nombre y apellido
        # c.drawString(self.m(36.154),self.m(134.067),"Enrique Ruperti Bilbao") #Nombre y apellido
        c.drawString(self.m(36.154),self.m(134.067), row['Nombre y apellido'])

        # ---- nuevo texto del dni
        style = getSampleStyleSheet()
        p = Paragraph("<font fontName=GOTHAM-BOOK>Con </font><font fontName=GOTHAM-BOLD>DNI " + str(row['DNI']) + "</font><font fontName=GOTHAM-BOOK> ha completado satisfactoriamente el programa online de</font>", style=style["Normal"])
        p.wrapOn(c, ancho, alto)
        p.drawOn(c, self.m(36.154), self.m(124.901))
        # ---

        # Nombre del curso
        c.setFillColorRGB(self.col(0),self.col(65),self.col(134))
        c.setFont("GOTHAM-BLACK", 22)
        # c.drawString(self.m(36.154),self.m(112.338),"Farmacología aplicada en atención primaria,")
        c.drawString(self.m(36.154),self.m(112.338), row['Curso']+",")


        p = Paragraph("<font fontName=GOTHAM-BOOK>con una duración estimada de </font><font fontName=GOTHAM-BOLD>" + str(row['Duracion']) + "</font><font fontName=GOTHAM-BOOK> horas cátedra, obteniendo la calificación de </font> <font fontName=GOTHAM-BOLD>"  +  str(row['Nota']) + "</font>", style=style["Normal"])
        p.wrapOn(c, ancho, alto)
        p.drawOn(c, self.m(36.154), self.m(101.347))

        c.setFillColorRGB(self.col(0),self.col(0),self.col(0))
        c.setFont("GOTHAM-BOOK", 10)
        c.drawString(self.m(36.154),self.m(92.086),"Y para que así conste donde pudiera interesar lo firma:")
        
        # Fecha de inicio fin
        p = Paragraph("<font fontName=GOTHAM-BOOK>Fecha de inicio - finalización: " + row['INICIO'].strftime('%d/%m/%Y')  + " - " + row['FIN'].strftime('%d/%m/%Y') + "</font>", style=style["Normal"])
        p.wrapOn(c, ancho, alto)
        p.drawOn(c, self.m(36.154), self.m(58.95))

        # c.drawImage('diplomas' + STATIC_URL + 'diplomas/images/avales_ejemplo_5.jpg', self.m(36.154), self.m(23.600), width=self.m(180.168), height=self.m(18))

        # Imagen de los avales
        
        product_code = str(row['Codigo producto'])
        product = Product.objects.all().filter(code=product_code).first()
        aval = product.avales.all().first()

        # Abro la imagen con pillow
        im = Image.open(aval.image.path)
        # obtengo el ancho y el alto 
        width, height = im.size

        # calculo el ancho que debe ir en la imagen
        ancho_posta = width/10
        
        c.drawImage(aval.image.path, self.m(36.154), self.m(23.600), width=self.m(ancho_posta), height=self.m(18))

        # Imagen de las firmas

        firma = product.firmas.all().first()

        # Abro la imagen con pillow
        im = Image.open(firma.image.path)
        # obtengo el ancho y el alto 
        width, height = im.size

        # calculo el ancho que debe ir en la imagen
        ancho_posta = width/10
        
        c.drawImage(firma.image.path, self.m(134), self.m(58.95), width=self.m(ancho_posta), height=self.m(27))

        c.save()
        self.buffer.seek(0)
        return self.buffer
        