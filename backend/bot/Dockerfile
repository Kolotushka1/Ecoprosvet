FROM python:3.12.2-slim as builder

WORKDIR /bot

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc

COPY requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /bot/wheels -r requirements.txt

FROM python:3.12.2-slim

WORKDIR /bot

COPY --from=builder /bot/wheels /wheels
COPY --from=builder /bot/requirements.txt .

RUN pip install --no-cache /wheels/*

COPY . .

CMD ["python", "bot.py"]
