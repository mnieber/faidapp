import graphene

import projects.schema

# Schema app


class Query(projects.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
