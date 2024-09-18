from django.db import models



class District(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    name = models.CharField(max_length=255, blank=True, null=True, verbose_name='Название района')

    class Meta:
        managed = False
        db_table = 'district'
        verbose_name = 'Район'
        verbose_name_plural = 'Районы'


class Event(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    address = models.CharField(max_length=255, blank=True, null=True, verbose_name='Адрес')
    date = models.CharField(max_length=255, blank=True, null=True, verbose_name='Дата')
    description = models.CharField(max_length=255, blank=True, null=True, verbose_name='Описание')
    name = models.CharField(max_length=255, blank=True, null=True, verbose_name='Название')
    district = models.ForeignKey(District, models.DO_NOTHING, blank=True, null=True, verbose_name='Район')
    organization = models.ForeignKey('Organization', models.DO_NOTHING, blank=True, null=True,
                                     verbose_name='Организация')
    tag = models.ForeignKey('Tag', models.DO_NOTHING, blank=True, null=True, verbose_name='Тег')

    class Meta:
        managed = False
        db_table = 'event'
        verbose_name = 'Событие'
        verbose_name_plural = 'События'


class EventPhoto(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    path = models.CharField(max_length=255, blank=True, null=True, verbose_name='Путь')
    sort = models.IntegerField(verbose_name='Порядок')
    event = models.ForeignKey(Event, models.DO_NOTHING, blank=True, null=True, verbose_name='Событие')

    class Meta:
        managed = False
        db_table = 'event_photo'
        verbose_name = 'Фото события'
        verbose_name_plural = 'Фотографии событий'


class EventTag(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    event = models.ForeignKey(Event, models.DO_NOTHING, blank=True, null=True, verbose_name='Событие')
    tag = models.ForeignKey('Tag', models.DO_NOTHING, blank=True, null=True, verbose_name='Тег')

    class Meta:
        managed = False
        db_table = 'event_tag'
        verbose_name = 'Тег события'
        verbose_name_plural = 'Теги событий'


class Feedback(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    comment = models.CharField(max_length=255, blank=True, null=True, verbose_name='Комментарий')
    rating = models.IntegerField(verbose_name='Оценка')
    event = models.ForeignKey(Event, models.DO_NOTHING, blank=True, null=True, verbose_name='Событие')
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True, verbose_name='Пользователь')

    class Meta:
        managed = False
        db_table = 'feedback'
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'


class Organization(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    data = models.CharField(max_length=255, blank=True, null=True, verbose_name='Данные')
    name = models.CharField(max_length=255, blank=True, null=True, verbose_name='Название')

    class Meta:
        managed = False
        db_table = 'organization'
        verbose_name = 'Организация'
        verbose_name_plural = 'Организации'


class OrganizationUsers(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    organization = models.ForeignKey(Organization, models.DO_NOTHING, blank=True, null=True, verbose_name='Организация')
    role = models.ForeignKey('Role', models.DO_NOTHING, blank=True, null=True, verbose_name='Роль')
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True, verbose_name='Пользователь')

    class Meta:
        managed = False
        db_table = 'organization_users'
        verbose_name = 'Пользователь организации'
        verbose_name_plural = 'Пользователи организаций'


class Role(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    name = models.CharField(max_length=255, blank=True, null=True, verbose_name='Название роли')

    class Meta:
        managed = False
        db_table = 'role'
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'


class Suggestions(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    content = models.CharField(max_length=255, blank=True, null=True, verbose_name='Содержание предложения')
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True, verbose_name='Пользователь')

    class Meta:
        managed = False
        db_table = 'suggestions'
        verbose_name = 'Предложение'
        verbose_name_plural = 'Предложения'


class Tag(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    name = models.CharField(max_length=255, blank=True, null=True, verbose_name='Название')

    class Meta:
        managed = False
        db_table = 'tag'
        verbose_name = 'Тег'
        verbose_name_plural = 'Теги'


class User(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    active = models.TextField(blank=True, null=True, verbose_name='Активен')  # Тип поля актив изменен на TextField
    email = models.CharField(max_length=255, blank=True, null=True, verbose_name='Email')
    email_confirm = models.TextField(blank=True, null=True, verbose_name='Подтверждение Email')
    fio = models.CharField(max_length=255, blank=True, null=True, verbose_name='ФИО')
    gender = models.CharField(max_length=255, blank=True, null=True, verbose_name='Пол')
    login = models.CharField(max_length=255, blank=True, null=True, verbose_name='Логин')
    password = models.CharField(max_length=255, blank=True, null=True, verbose_name='Пароль')
    phone_number = models.CharField(max_length=255, blank=True, null=True, verbose_name='Телефон')
    telegram = models.CharField(max_length=255, blank=True, null=True, verbose_name='Telegram')
    district = models.ForeignKey(District, models.DO_NOTHING, db_column='district', blank=True, null=True,
                                 verbose_name='Район')

    class Meta:
        managed = False
        db_table = 'user'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class UserTag(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    interese = models.ForeignKey(Tag, models.DO_NOTHING, blank=True, null=True, verbose_name='Интерес')
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True, verbose_name='Пользователь')

    class Meta:
        managed = False
        db_table = 'user_tag'
        verbose_name = 'Интерес пользователя'
        verbose_name_plural = 'Интересы пользователей'
