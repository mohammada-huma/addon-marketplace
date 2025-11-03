from .base import *  # noqa: F401, F403

import sentry_sdk
from sentry_sdk.integrations.celery import CeleryIntegration
from sentry_sdk.integrations.django import DjangoIntegration


DEBUG = False
SENTRY_DSN = os.environ.get("SENTRY_DSN", None)
if SENTRY_DSN:
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        integrations=[DjangoIntegration(), CeleryIntegration()],
        auto_session_tracking=False,
        environment="sandbox" if DEBUG else "production",
        traces_sample_rate=0,
    )
