from django.conf.urls import url

from upbit.views import UpbitAPIView

urlpatterns = [
    url(r'^candle/$', UpbitAPIView.as_view(), name='upbit-api-view'),
]
