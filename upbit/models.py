from django.db import models


class Upbit(models.Model):
    market = models.CharField(max_length=20, null=True, blank=True)
    timestamp = models.CharField(max_length=30, null=True, blank=True)
    trade_price = models.FloatField(null=True, blank=True)
    candle_acc_trade_volume = models.FloatField(null=True, blank=True)
