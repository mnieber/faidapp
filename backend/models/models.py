from app.models import Entity
from models.types import ContentModelT


class ModelClass(Entity):
    class Meta:
        abstract = True

    @classmethod
    def content_resource_name(cls):
        raise Exception("Not implemented")

    @classmethod
    def get_defaults_from_content_model(cls, contentModel: ContentModelT):
        raise Exception("Not implemented")
