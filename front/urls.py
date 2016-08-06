from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

from front.views import IndexView
from . import views

urlpatterns = [
    url('^.*$', IndexView.as_view(), name='index'),
]

# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
