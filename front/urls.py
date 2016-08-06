from django.conf.urls import url, patterns

from charon_frontend import settings

# from front.views import IndexView
from front import views

urlpatterns = [
    # url('^.*$', IndexView.as_view(), name='index'),
    url(r'^$', views.homepage, name='index'),
]

urlpatterns += patterns('django.contrib.staticfiles.views',
                        url(r'', 'serve', {'document_root': settings.STATIC_ROOT,
                                           'path': '/base.html'}))
