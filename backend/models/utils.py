from uuid import UUID

import requests
from django.conf import settings

from milestones.models import Milestone
from projects.models import Project


def get_model_id_from_content_model(content_model_dict):
    try:
        return UUID(content_model_dict["entry"]["uid"])
    except ValueError:
        return None


def get_model_class_from_content_model(content_model_dict):
    model_name = content_model_dict.get("model", None)
    if model_name == "project":
        return Project
    if model_name == "milestone":
        return Milestone
    return None


def update_content_model(model_class, intId, body):
    return requests.put(
        f"http://{settings.STRAPI_HOST}/{model_class.content_resource_name()}/{intId}",
        body,
    )
