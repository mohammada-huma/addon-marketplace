FROM python:3.13-slim
COPY --from=ghcr.io/astral-sh/uv:0.4.30 /uv /uvx /bin/

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    git \
    && rm -rf /var/lib/apt/lists/*


ENV UV_PROJECT_ENVIRONMENT="/usr/local/"
COPY pyproject.toml uv.lock ./

RUN --mount=type=secret,id=GIT_AUTH_TOKEN,env=GITHUB_TOKEN \
    git config --global url."https://_:${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/" && \
    uv sync --no-install-project --locked

COPY . .
RUN mv build/entry.sh .
RUN chmod +x entry.sh

RUN useradd -m appuser
USER appuser

EXPOSE 8000

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=project.settings.production

# run entry.sh
CMD ["./entry.sh"]