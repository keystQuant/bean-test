from django.shortcuts import render

from rest_framework import generics

from fnguide.models import Fnguide
from fnguide.serializers import FnguideSerializer


# WantedContent view GET POST
class FnguideAPIView(generics.ListCreateAPIView):
    queryset = Fnguide.objects.all()
    serializer_class = FnguideSerializer
