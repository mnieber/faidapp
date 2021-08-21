import graphene
from graphene_django.types import DjangoObjectType

from milestones.models import Milestone


class MilestoneType(DjangoObjectType):
    class Meta:
        model = Milestone

    content = graphene.String()

    def resolve_content(self, info, **kwargs):
        return self.content
