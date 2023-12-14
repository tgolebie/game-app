#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Game


fake = Faker()


def create_games():
    games=[]
    for _ in range(10):
        a = Game(
            title=fake.title(),
            rating=fake.sentence(),
            image=fake.sentence(),
            price=randint(1,60)
        )
        games.append(a)

    return games

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
