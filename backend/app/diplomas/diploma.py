from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import blue
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from diplomas.models import *
from generador_de_diplomas.settings import STATIC_URL

class Diploma:

    def __init__(self, buffer):
        # self.tamanio_pagina = A4
        # self.ancho, self.alto = self.tamanio_pagina
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

        c.setFont("GOTHAM-BOOK", 10)
        c.drawString(self.m(36.154),self.m(124.901),"Con DNI 36980954 ha completado satisfactoriamente el programa online de")

        # c.setStrokeColorRGB(self.col(82),self.col(133),self.col(197))
        c.setFillColorRGB(self.col(0),self.col(65),self.col(134))
        c.setFont("GOTHAM-BLACK", 22)
        # c.drawString(self.m(36.154),self.m(112.338),"Farmacología aplicada en atención primaria,")
        # Nombre del curso
        c.drawString(self.m(36.154),self.m(112.338), row['Curso']+",")

        c.setFillColorRGB(0,0,0)
        c.setFont("GOTHAM-BOOK", 10)
        c.drawString(self.m(36.154),self.m(101.347),"con una duración estimada de 400 horas cátedra, obteniendo la calificación de 8,6.")

        c.setFont("GOTHAM-BOOK", 10)
        c.drawString(self.m(36.154),self.m(92.086),"Y para que así conste donde pudiera interesar lo firma:")

        c.setFont("GOTHAM-BOOK", 10)
        c.drawString(self.m(36.154),self.m(58.95),"Fecha de inicio - finalización: 16/05/2019 - 27/01/2020")

        c.save()

        self.buffer.seek(0)

        return self.buffer
        