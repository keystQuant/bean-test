from django.db import models


class Fnguide(models.Model):
    name = models.CharField(max_length=20)
    cls_prc = models.FloatField()
    trd_qty = models.FloatField()
