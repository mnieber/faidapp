runserver:
	python manage.py runserver 0.0.0.0:8000

pip-compile:
	pip-compile requirements.in -o requirements.txt
	pip-compile requirements.dev.in -o requirements.dev.txt

install:
	pip install -r requirements.dev.txt

set-superuser:
	python manage.py createsuperuser

show-urls:
	python manage.py show_urls

shell:
	python manage.py shell_plus
