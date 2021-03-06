import json

import dateparser
from django.db import models

from models.models import ModelClass
from models.types import ContentModelT


class Project(ModelClass):
    name = models.CharField(max_length=255, unique=True)
    slug = models.CharField(max_length=255, unique=True)
    image_hash = models.CharField(max_length=255, unique=True, null=True, blank=True)
    image_props = models.TextField(null=True, blank=True)
    content = models.JSONField()

    @classmethod
    def content_resource_name(cls):
        return "projects"

    @classmethod
    def get_defaults_from_content_model(cls, content_model: ContentModelT):
        name = content_model.entry.name
        slug = content_model.entry.slug
        content = json.dumps(content_model.entry)
        image_hash = (
            content_model.entry.image.hash + content_model.entry.image.ext
            if content_model.entry.image
            else None
        )
        return dict(
            created=dateparser.parse(content_model.created_at),
            name=name,
            slug=slug,
            content=content,
            image_hash=image_hash,
            image_props=content_model.entry.imageProps,
        )
