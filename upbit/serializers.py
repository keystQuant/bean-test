from rest_framework import serializers
from upbit.models import Upbit


class UpbitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upbit
        fields = "__all__"
