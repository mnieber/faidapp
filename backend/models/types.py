import typing as T

from pydantic import BaseModel


class ContentModelT(BaseModel):
    id: int
    uid: str
    model: str
    entry: T.Any
    created_at: str
