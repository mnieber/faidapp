import json

from django.http import JsonResponse
from django.views import View

from app.utils.get_post_data import get_post_data
from models.utils import (
    get_model_class_from_content_model,
    get_model_id_from_content_model,
    update_content_model,
)


# Note that we expect content fields from strapi to use camelCase
class WebhookEndpoint(View):
    def post(self, request):
        content_model_dict = get_post_data(request)
        model_class = get_model_class_from_content_model(content_model_dict)
        if model_class:
            model_id = get_model_id_from_content_model(content_model_dict)
            model, is_created = model_class.objects.update_or_create(
                id=model_id,
                defaults=model_class.get_defaults_from_content_model(
                    content_model_dict
                ),
            )
            if is_created:
                update_content_model(
                    model_class,
                    content_model_dict["entry"]["id"],
                    {
                        "uid": str(model.id),
                    },
                )
        return JsonResponse(status=200, data={})
