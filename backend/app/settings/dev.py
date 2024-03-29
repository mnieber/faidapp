from __future__ import absolute_import, unicode_literals

from .base import *  # noqa

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

FORCE_SERVE_STATIC = True

ALLOWED_HOSTS = ["*"]

CORS_ORIGIN_ALLOW_ALL = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "553b5bfe-862e-4226-9648-a5718f7120de"

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

INTERNAL_IPS = ("127.0.0.1",)

try:
    from .local import *  # noqa
except ImportError:
    pass

CACHES["default"] = {
    "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
}
