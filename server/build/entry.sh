#!/bin/sh

# get env SERVER_TYPE and default to server
SERVER_TYPE=${SERVER_TYPE:-server}

if [ "$SERVER_TYPE" = "server" ]; then
    if ! python manage.py migrate; then
        echo "Failed to run migrations"
        exit 1
    fi
    if ! python manage.py createcachetable; then
        echo "Failed to create cache table"
        exit 1
    fi
    gunicorn project.wsgi:application --bind 0.0.0.0:8000 --threads 4
elif [ "$SERVER_TYPE" = "worker" ]; then
    if ! python manage.py celery --worker; then
        echo "Failed to start celery worker"
        exit 1
    fi
elif [ "$SERVER_TYPE" = "beat" ]; then
    if ! python manage.py celery --beat; then
        echo "Failed to start celery beat"
        exit 1
    fi
else
    echo "Invalid server type: $SERVER_TYPE"
    exit 1
fi
