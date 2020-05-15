from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response

from .serializers import *
from .models import *


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class PerfilLogadoViewSet(viewsets.ModelViewSet):
    """
    Endpoint que permite obter e cadastrar um perfil para o usuário logado
    """
    serializer_class = PerfilSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Perfil.objects.filter(usuario=self.request.user)

    def list(self, request, *args, **kwargs):
        perfil = self.get_queryset()
        if perfil.exists():
            serializer = self.get_serializer(perfil.first())
            return Response(serializer.data)
        else:
            return Response(None, status=404)


class PerfilViewSet(viewsets.ModelViewSet):
    """
    Endpoint que permite recuperar e editar informações sobre perfis de usuários
    """
    serializer_class = PerfilSerializer
    queryset = Perfil.objects.all()
    permission_classes = [permissions.IsAuthenticated]
