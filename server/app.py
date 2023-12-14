#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from flask_cors import CORS
# Add your model imports
from models import User, Game, Rental

class Rentals(Resource):
    def post(self):
        try:
            data = request.get_json(force=True)
            new_rental = Rental(
                game_id=data['game_id'],  
                # user_id=data['user_id'], 
               
            )
            db.session.add(new_rental)
            db.session.commit()
            return make_response(new_rental.to_dict(), 201)
        except Exception as e:
            print(f"Error while processing POST request for rentals: {str(e)}")
            import traceback
            traceback.print_exc()  
            return make_response({'error': 'internal server error'}, 500)

api.add_resource(Rentals, '/api/v1/rentals')

class Users(Resource):
    def post(self):
        data = request.get_json()
        user = User(username=data['username'], email=data['email'], password_hash=data['password'])
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return make_response({'user': user.to_dict()}, 201 )

api.add_resource(Users, '/api/v1/users')  

# @app.route('/api/v1/authorized')
# def authorized():
#     try:
#         user = User.query.filter_by(id=session.get('user_id')).first()
#         return make_response(user.to_dict(), 200)
#     except:
#         return make_response({ "error": "User not found"}, 404)

# @app.route('/api/v1/logout', methods=['DELETE'])
# def logout():
#     session['user_id'] = None 
#     return make_response('', 204)

# @app.route('/api/v1/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     try:
#         user = User.query.filter_by(username=data['username']).first()
#         # import ipdb; ipdb.set_trace()
#         if user.authenticate(data['password']):
#             session['user_id'] = user.id
#             return make_response({'user': user.to_dict()}, 200)
#         else:
#             return make_response({'error': 'incorrect password'}, 401)
#     except:
#         return make_response({'error': 'username incorrect'}, 401)
    


@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Games(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.all()]
        return make_response(games, 200)
    def post(self):
        try:
            data = request.get_json(force=True)
            print("Received data:", data) 
            new_game = Game(
                title=data['title'],
                image=data['image'],
                rating=data['rating'],
                price=data['price']
            )
            db.session.add(new_game)
            db.session.commit()
            return make_response(new_game.to_dict(), 201)
        except Exception as e:
            print(f"Error while processing POST request: {str(e)}")
            import traceback
            traceback.print_exc() 
            return make_response({'error': 'internal server error'}, 500)
api.add_resource(Games, '/addgame')

class Get_games(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.all()]
        if not games:
            return make_response({'error':'not a game'}, 400)
        return make_response(games, 200)
api.add_resource(Get_games, '/api/v1/games')

class Game_by_id(Resource):
    def delete(self, id):
        game = Game.query.get(id)
        if not game:
            return make_response({'errors':'game not found'}, 400)
        else:
            db.session.delete(game)
            db.session.commit()
            return make_response('', 200)
        
api.add_resource(Game_by_id, '/games/<id>')

class GameUpdate(Resource):
    def put(self, id):
        
        game = Game.query.get(id)
        if not game:
            return make_response({'errors': 'game not found'}, 404)

        try:
            
            data = request.get_json(force=True)

            
            game.title = data.get('title', game.title)
            game.image = data.get('image', game.image)
            game.rating = data.get('rating', game.rating)
            game.price = data.get('price', game.price)

           
            db.session.commit()

            
            return make_response(game.to_dict(), 200)
        except Exception as e:
            print(f"Error while processing PUT request: {str(e)}")
            import traceback
            traceback.print_exc()
            return make_response({'error': 'internal server error'}, 500)

api.add_resource(GameUpdate, '/games/<id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)