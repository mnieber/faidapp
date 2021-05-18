from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from models.endpoints import WebhookEndpoint

urlpatterns = [
    path(
        "strapi-webhook", csrf_exempt(WebhookEndpoint.as_view()), name="strapi-webhook"
    ),
]
