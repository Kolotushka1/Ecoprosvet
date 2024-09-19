import datetime
from dataclasses import dataclass

from aiogram.types import CallbackQuery
from asgiref.sync import sync_to_async
from django.utils import timezone

from apps.events.models import UserTag, Tag, EventSub, Event
from apps.main.models import User, District


@dataclass
class DistrictData:
    id: int
    name: str


@dataclass
class TagData:
    id: int
    name: str


@sync_to_async
def get_all_districts():
    districts = District.objects.all()
    return [DistrictData(district.id, district.name) for district in districts]


@sync_to_async
def get_all_tags():
    tags = Tag.objects.all()
    return [TagData(tag.id, tag.name) for tag in tags]


@sync_to_async
def get_user_tags_ids(user: User):
    user_tags = UserTag.objects.filter(user=user)
    return [user_tag.tag.id for user_tag in user_tags]


async def get_user(c: CallbackQuery):
    try:
        user = await sync_to_async(User.objects.get)(telegram_id=c.from_user.id)
        return user
    except User.DoesNotExist:
        await c.bot.send_message(chat_id=c.from_user.id, text='Вы не зарегистрированы, нажмите /start')
        raise User.DoesNotExist


@sync_to_async
def get_user_events_ids(user):
    event_subs = EventSub.objects.filter(user=user)
    return [event_sub.event.id for event_sub in event_subs]


@dataclass
class EventData:
    id: int
    title: str
    organisation: str
    image: str
    about: str
    date_time: datetime.datetime
    tags: list[Tag]


@sync_to_async
def get_events():
    events = Event.objects.filter(date__gt=timezone.now()).order_by('date')
    return [EventData(event.id, event.title, event.organization.organization_name,
                      event.image.path, event.about, event.date, []) for event in events]
