import graphene
from django.contrib.contenttypes.models import ContentType
from django.db.models import Sum
from graphene_django.types import DjangoObjectType

from milestones import models


class MilestoneType(DjangoObjectType):
    class Meta:
        model = models.Milestone
