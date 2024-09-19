FROM python:3.12

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

CMD ["sh", "-c", "python manage.py makemigrations events main && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]