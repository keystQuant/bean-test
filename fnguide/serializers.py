from rest_framework import serializers
from fnguide.models import Fnguide


class FnguideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fnguide
        fields = "__all__"
