import graphene
from graphene_django.types import DjangoObjectType

from milestones.schema import MilestoneType
from projects.models import Project


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project

    content = graphene.String()
    milestones = graphene.List(MilestoneType)

    def resolve_content(self, info, **kwargs):
        return self.content

    def resolve_milestones(self, info, **kwargs):
        return self.milestones.all()


class Query(object):
    project_by_slug = graphene.Field(ProjectType, slug=graphene.String())

    def resolve_project_by_slug(self, info, slug, **kwargs):
        return Project.objects.get(slug=slug)
