import json

import dateparser
from django.db import models

from models.models import ModelClass


class Project(ModelClass):
    content = models.JSONField()
    image_hash = models.CharField(max_length=255, null=True, blank=True)
    image_props = models.TextField(null=True, blank=True)
    name = models.CharField(max_length=255, unique=True)
    slug = models.CharField(max_length=255, unique=True)

    @classmethod
    def content_resource_name(cls):
        return "projects"

    @classmethod
    def get_defaults_from_content_model(cls, content_model_dict: dict):
        name = content_model_dict["entry"]["name"]
        slug = content_model_dict["entry"]["slug"]
        content = json.dumps(content_model_dict["entry"])
        image_hash = (
            content_model_dict["entry"]["image"]["hash"]
            + content_model_dict["entry"]["image"]["ext"]
            if content_model_dict["entry"]["image"]
            else None
        )
        return dict(
            created=dateparser.parse(content_model_dict["created_at"]),
            name=name,
            slug=slug,
            content=content,
            image_hash=image_hash,
            image_props=content_model_dict["entry"]["imageProps"],
        )
