from django.db import models

from apps.main.models import User, District, Organization


class Tag(models.Model):
    active = models.BooleanField(default=True)
    name = models.CharField(max_length=100, verbose_name="Название")

    class Meta:
        verbose_name = "Тег"
        verbose_name_plural = "Теги"

    def __str__(self):
        return self.name

class UserTag(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, verbose_name="Тег")

    class Meta:
        verbose_name = "Тег пользователя"
        verbose_name_plural = "Теги пользователей"


class Event(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название")
    short_description = models.CharField(max_length=255, verbose_name="Короткое описание")
    description = models.TextField(verbose_name="Описание")
    district = models.ForeignKey(District, on_delete=models.SET_NULL, null=True, verbose_name="Район")
    date = models.DateTimeField(verbose_name="Дата")
    address = models.CharField(max_length=255, verbose_name="Адрес")
    image = models.ImageField(upload_to='events')
    point_x = models.CharField(max_length=255)
    point_y = models.CharField(max_length=255)
    organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, verbose_name="Организация")

    class Meta:
        verbose_name = "Мероприятие"
        verbose_name_plural = "Мероприятия"

    def __str__(self):
        return self.title

class EventTag(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, verbose_name="Мероприятие", related_name='event_tags')
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, verbose_name="Тег", related_name='event_tags')

    class Meta:
        verbose_name = "Тег мероприятия"
        verbose_name_plural = "Теги мероприятий"


class EventPhoto(models.Model):
    image = models.ImageField(upload_to='events/photos', verbose_name="Путь")
    sort = models.IntegerField(verbose_name="Сортировка", default=500)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, verbose_name="Мероприятие", related_name='event_photos')

    class Meta:
        verbose_name = "Фотография мероприятия"
        verbose_name_plural = "Фотографии мероприятий"


class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, verbose_name="Мероприятие")
    rating = models.IntegerField(verbose_name="Рейтинг")
    comment = models.TextField(verbose_name="Комментарий")

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"

    def __str__(self):
        return self.user


class Suggestions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    content = models.TextField(verbose_name="Содержание")

    class Meta:
        verbose_name = "Предложение"
        verbose_name_plural = "Предложения"

    def __str__(self):
        return self.user