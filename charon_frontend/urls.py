from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^', include('front.urls')),
    url(r'^admin/', admin.site.urls),
)
