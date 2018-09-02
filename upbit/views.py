from django.shortcuts import render

from rest_framework import generics

from upbit.models import Upbit
from upbit.serializers import UpbitSerializer

from django.core.cache import cache


# WantedContent view GET POST
class UpbitAPIView(generics.ListCreateAPIView):
    queryset = Upbit.objects.all()
    serializer_class = UpbitSerializer

    def get_queryset(self, *args, **kwargs):
        data = cache.get('UPBIT_DATA')
        if data == None:
            cache.set('UPBIT_DATA', Upbit.objects.all())
            return Upbit.objects.all()
        else:
            return data
