import json

from django.http import QueryDict


def get_post_data(request):
    method = request.META.get("REQUEST_METHOD", "").upper()
    if method in ["POST", "PUT", "DELETE"]:
        content_type = request.META.get("CONTENT_TYPE", "")
        if content_type.startswith("multipart"):
            POST, _ = request.parse_multipart(request.META, request)
            return POST
        elif content_type.startswith("application/x-www-form-urlencoded"):
            return QueryDict(request.body, encoding=request._encoding).dict()
        elif content_type.startswith("application/json"):
            return json.loads(request.body.decode("UTF-8"))
    return None
