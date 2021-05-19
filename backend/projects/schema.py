import graphene
from django.contrib.contenttypes.models import ContentType
from django.db.models import Sum
from graphene_django.types import DjangoObjectType

from projects import models


class ProjectType(DjangoObjectType):
    class Meta:
        model = models.Project


class Query(object):
    project = graphene.Field(ProjectType, slug=graphene.String())

    def resolve_project(self, info, slug, **kwargs):
        return models.Project.objects.get(slug=slug)
