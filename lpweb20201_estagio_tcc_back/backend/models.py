from django.db import models
from django.contrib.auth.models import *


# Create your models here.
class Perfil(models.Model):
    cadastrado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    usuario = models.OneToOneField(User, models.CASCADE)
    nome = models.CharField(max_length=128, db_index=True)
    sexo = models.CharField(max_length=1, null=True) # F, M
    cpf = models.CharField(max_length=14, null=True, unique=True) # 000.000.000-00
    telefone = models.CharField(max_length=15, null=True) # (00) 00000-0000
    endereco = models.TextField(max_length=512, null=True)
    cep = models.CharField(max_length=10, null=True) # 00.000-000
    estado_uf = models.CharField(max_length=2, null=True) # AA
    cidade = models.CharField(max_length=64, null=True)
