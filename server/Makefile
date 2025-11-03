.PHONY: test

test:
	uv run manage.py test --parallel

test-coverage:
	coverage run manage.py test --parallel

test-coverage-html:
	coverage run manage.py test --parallel
	coverage html

run-dockers:
	cd build && docker compose up -d

stop-dockers:
	cd build && docker compose down
