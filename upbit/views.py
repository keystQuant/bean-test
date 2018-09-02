from django.shortcuts import render

from rest_framework import generics

from upbit.models import Upbit
from upbit.serializers import UpbitSerializer


# WantedContent view GET POST
class UpbitAPIView(generics.ListCreateAPIView):
    queryset = Upbit.objects.all()
    serializer_class = UpbitSerializer
