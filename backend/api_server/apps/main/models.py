from django.contrib.auth.models import AbstractUser
from django.db import models


class District(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'district'
        verbose_name = "Район"
        verbose_name_plural = "Районы"

    def __str__(self):
        return self.name


class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    active = models.BooleanField()
    birth_date = models.DateTimeField(blank=True, null=True)
    email = models.CharField(unique=True, max_length=255, blank=True, null=True)
    email_confirm = models.BooleanField()
    fio = models.CharField(max_length=255, blank=True, null=True)
    gender = models.BooleanField()
    password = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(unique=True, max_length=255, blank=True, null=True)
    telegram = models.CharField(unique=True, max_length=255, blank=True, null=True)
    telegram_id = models.IntegerField(unique=True, blank=True, null=True)
    district = models.ForeignKey(District, models.DO_NOTHING, db_column='district', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def get_gender_display(self):
        return {
            1: "М",
            0: "Ж"
        }[self.gender]

    def __str__(self):
        return (self.email or '') + ' ' + (self.fio or '') + ' id:' + str(self.id)


class DjangoUser(AbstractUser):
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
        db_table = 'main_user'


class Organization(models.Model):
    id = models.BigAutoField(primary_key=True)
    address_registration = models.CharField(max_length=255, verbose_name='Адрес регистрации')
    inn = models.CharField(max_length=255, verbose_name='ИНН')
    is_active = models.BooleanField(default=False, verbose_name='Активно')
    organization_name = models.CharField(max_length=255, verbose_name='Наименование организации')
    user_admin = models.ForeignKey(User, on_delete=models.DO_NOTHING, db_column='user_admin_id',
                                   verbose_name='Администратор')
    address = models.CharField(max_length=255, verbose_name='Адрес')
    is_eco_centre = models.BooleanField(default=False, verbose_name='Эко-центр')
    pointx = models.CharField(max_length=255, verbose_name='Точка Х')
    pointy = models.CharField(max_length=255, verbose_name='Точка Y')
    data = models.TextField(verbose_name='Информация')
    org_type = models.CharField(max_length=3, blank=True, null=True, verbose_name='Тип организации')

    class Meta:
        managed = False
        db_table = 'organization'
        verbose_name = "Организация"
        verbose_name_plural = "Организации"

    def __str__(self):
        return self.organization_name


class OrganizationUsers(models.Model):
    id = models.BigAutoField(primary_key=True)
    organization = models.ForeignKey(Organization, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'organization_users'
        verbose_name = "Пользователь организации"
        verbose_name_plural = "Пользователи организаций"


class OrganizationSub(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, verbose_name="Организация")

    class Meta:
        verbose_name = "Подписчик организации"
        verbose_name_plural = "Подписчики организаций"
