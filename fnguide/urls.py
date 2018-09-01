from django.conf.urls import url

from fnguide.views import FnguideAPIView

urlpatterns = [
    url(r'^test/$', FnguideAPIView.as_view(), name='fnguide-api-view'),
]
