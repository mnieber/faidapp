import graphene
from graphene_django.types import DjangoObjectType

from milestones.schema import MilestoneType
from projects import models


class ProjectType(DjangoObjectType):
    class Meta:
        model = models.Project


class Query(object):
    project = graphene.Field(ProjectType, slug=graphene.String())

    def resolve_project(self, info, slug, **kwargs):
        return models.Project.objects.get(slug=slug)
