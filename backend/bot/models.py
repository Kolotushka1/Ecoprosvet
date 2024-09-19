from typing import Optional
import datetime

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, BigInteger, Text


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = 'user'

    id: Mapped[int] = mapped_column(primary_key=True)
    fio: Mapped[Optional[str]]
    telegram_id: Mapped[Optional[int]] = mapped_column(BigInteger)


class Event(Base):
    __tablename__ = 'events_event'

    id: Mapped[int] = mapped_column(primary_key=True)
    address: Mapped[str]
    date: Mapped[datetime.date]
    description: Mapped[str] = mapped_column(Text)
    title: Mapped[str]
    district_id: Mapped[int] = mapped_column(ForeignKey('district.id'))
    organization_id: Mapped[int] = mapped_column(ForeignKey('organization.id'))


class UserEvent(Base):
    __tablename__ = 'events_eventsub'

    user_id: Mapped[int]
    event_id: Mapped[int]


class Organization(Base):
    __tablename__ = 'main_organization'

    id: Mapped[int] = mapped_column(primary_key=True)
    organization_name: Mapped[str]
