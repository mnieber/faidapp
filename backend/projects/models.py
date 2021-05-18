import json

import dateparser
from django.db import models

from models.models import ModelClass
from models.types import ContentModelT


class Project(ModelClass):
    name = models.CharField(max_length=255)
    content = models.JSONField()

    @classmethod
    def content_resource_name(cls):
        return "projects"

    @classmethod
    def get_defaults_from_content_model(cls, content_model: ContentModelT):
        return dict(
            created=dateparser.parse(content_model.created_at),
            name=content_model.entry.name,
            content=json.dumps(content_model.entry),
        )
