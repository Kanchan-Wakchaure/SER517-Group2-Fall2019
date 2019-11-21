release: python manage.py makemigrations
release: python manage.py migrate
web: gunicorn Travlendar.wsgi --log-file -
