from dataclasses import dataclass

@dataclass
class User:
    id: int
    email: str
    password: str
    isadmin: bool
