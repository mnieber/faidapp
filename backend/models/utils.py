from uuid import UUID

import requests
from django.conf import settings

from projects.models import Project


def get_model_id_from_content_model(content_model):
    try:
        return UUID(content_model.entry.uid)
    except ValueError:
        return None


def get_model_class_from_content_model(content_model):
    if content_model.model == "project":
        return Project
    return None


def update_content_model(model_class, intId, body):
    return requests.put(
        f"http://{settings.STRAPI_HOST}/{model_class.content_resource_name()}/{intId}",
        body,
    )
