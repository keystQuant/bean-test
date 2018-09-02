from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^fnguide-api/', include('fnguide.urls', namespace='fn-api')),
    url(r'^upbit-api/', include('upbit.urls', namespace='up-api')),
]
