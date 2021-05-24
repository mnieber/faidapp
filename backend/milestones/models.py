import json
from uuid import UUID

import dateparser
from django.db import models

from models.models import ModelClass
from models.types import ContentModelT
from projects.models import Project


class Milestone(ModelClass):
    name = models.CharField(max_length=255, unique=True)
    is_completed = models.BooleanField(default=False)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="milestones"
    )
    content = models.JSONField()

    @classmethod
    def content_resource_name(cls):
        return "milestones"

    @classmethod
    def get_defaults_from_content_model(cls, content_model: ContentModelT):
        name = content_model.entry.name
        project_id = UUID(content_model.entry.project.uid)
        project = Project.objects.get(id=project_id)
        content = json.dumps(content_model.entry)

        return dict(
            created=dateparser.parse(content_model.created_at),
            name=name,
            project=project,
            content=content,
        )
