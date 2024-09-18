from django.contrib.auth.models import AbstractUser
from django.db import models


class District(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")

    class Meta:
        verbose_name = "Район"
        verbose_name_plural = "Районы"

    def __str__(self):
        return self.name


class User(AbstractUser):
    telegram = models.CharField(max_length=255, blank=True, null=True, verbose_name="Телеграм")
    phone_number = models.CharField(max_length=15, blank=True, null=True, verbose_name="Номер телефона")
    gender = models.CharField(max_length=10, choices=[('M', 'Мужской'), ('F', 'Женский')], blank=True, null=True,
                              verbose_name="Пол")
    email_confirm = models.BooleanField(default=False, verbose_name="Подтверждение email")
    active = models.BooleanField(default=True, verbose_name="Активный")
    district = models.ForeignKey(District, on_delete=models.SET_NULL, null=True, verbose_name="Район")

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"


class Organization(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название")
    data = models.TextField(verbose_name="Данные")

    class Meta:
        verbose_name = "Организация"
        verbose_name_plural = "Организации"

    def __str__(self):
        return self.name


class OrganizationUsers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, verbose_name="Организация")

    class Meta:
        verbose_name = "Пользователь организации"
        verbose_name_plural = "Пользователи организаций"


class OrganizationSub(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, verbose_name="Организация")

    class Meta:
        verbose_name = "Подписчик организации"
        verbose_name_plural = "Подписчики организаций"
