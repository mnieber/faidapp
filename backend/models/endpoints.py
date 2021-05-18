import json

from django.http import JsonResponse
from django.views import View
from munch import munchify

from app.utils.get_post_data import get_post_data
from models.utils import (
    get_model_class_from_content_model,
    get_model_id_from_content_model,
    update_content_model,
)


class WebhookEndpoint(View):
    def post(self, request):
        raw_body = get_post_data(request)
        content_model = munchify(raw_body)
        model_class = get_model_class_from_content_model(content_model)
        if model_class:
            model_id = get_model_id_from_content_model(content_model)
            model, is_created = model_class.objects.update_or_create(
                id=model_id,
                defaults=model_class.get_defaults_from_content_model(content_model),
            )
            if is_created:
                update_content_model(
                    model_class,
                    raw_body["entry"]["id"],
                    {
                        "uid": str(model.id),
                    },
                )
        return JsonResponse(status=200, data={})
