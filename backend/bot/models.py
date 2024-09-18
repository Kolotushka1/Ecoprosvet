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
    __tablename__ = 'event'

    id: Mapped[int] = mapped_column(primary_key=True)
    address: Mapped[str]
    date: Mapped[datetime.date]
    description: Mapped[str] = mapped_column(Text)
    name: Mapped[str]
    district_id: Mapped[int] = mapped_column(ForeignKey('district.id'))
    organization_id: Mapped[int] = mapped_column(ForeignKey('organization.id'))


class UserEvent(Base):
    __tablename__ = 'user_event'

    user_id: Mapped[int]
    event_id: Mapped[int]


class Organization(Base):
    __tablename__ = 'organization'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
