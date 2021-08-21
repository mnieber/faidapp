from django.contrib.auth.models import Group


def create_groups(apps, schema_editor):
    Group.objects.create(name="changemaker")
    Group.objects.create(name="volunteer")
    Group.objects.create(name="frontlineaid_member")
    Group.objects.create(name="frontlineaid_admin")
