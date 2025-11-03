from huma.core.plugin import HumaPlugin


class Config(HumaPlugin):
    default_auto_field = "django.db.models.BigAutoField"
    name = "huma.marketplace.core"
    label = "huma_marketplace_core"
