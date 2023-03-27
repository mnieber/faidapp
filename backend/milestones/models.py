import json
from uuid import UUID

import dateparser
from django.db import models

from models.models import ModelClass
from projects.models import Project


class Milestone(ModelClass):
    content = models.JSONField()
    name = models.CharField(max_length=255, unique=True)
    is_completed = models.BooleanField(default=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    @classmethod
    def content_resource_name(cls):
        return "milestones"

    @classmethod
    def get_defaults_from_content_model(cls, content_model_dict):
        name = content_model_dict["entry"]["name"]
        project_id = UUID(content_model_dict["entry"]["project"]["uid"])
        project = Project.objects.get(id=project_id)
        content = json.dumps(content_model_dict["entry"])

        return dict(
            created=dateparser.parse(content_model_dict["created_at"]),
            name=name,
            project=project,
            content=content,
        )
