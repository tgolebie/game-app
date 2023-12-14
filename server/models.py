from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    rentals = db.relationship('Rental', back_populates= 'user', cascade = 'all, delete-orphan')
    games = association_proxy('rentals', 'game')

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, plain_text_password):
        byte_object = plain_text_password.encode('utf-8')
        encrypted_password_object = bcrypt.generate_password_hash(byte_object)
        hashed_password_string = encrypted_password_object.decode('utf-8')
        self._password_hash = hashed_password_string

    def authenticate(self, password_string):
        byte_object = password_string.encode('utf-8')
        return bcrypt.check_password_hash(self.password_hash, byte_object)


class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    serialize_rules = ('-rentals.game')

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    rating = db.Column(db.String)
    price = db.Column(db.Float)
    image = db.Column(db.String)
    rentals = db.relationship('Rental', back_populates = 'game', cascade = 'all, delete-orphan')
    users = association_proxy('rentals', 'user')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'rating': self.rating,
            'price': self.price,
            'image': self.image,
        }


class Rental(db.Model, SerializerMixin):
    __tablename__ = 'rentals'

    serialize_rules = ('-user.rentals', '-game.rentals')

    id = db.Column(db.Integer, primary_key=True)
    rented_at = db.Column(db.DateTime)
    returned_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    game = db.relationship('Game', back_populates = 'rentals')
    user = db.relationship("User", back_populates = 'rentals')