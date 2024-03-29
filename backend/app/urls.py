from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

urlpatterns = [
    path(r"admin/", admin.site.urls),
    path(r"graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path("", include("models.urls")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
