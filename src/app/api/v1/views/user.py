from typing import Tuple

import flask_bcrypt
from flask import request
from flask_jwt_extended import create_access_token, \
    create_refresh_token
from flask_restplus import Namespace, Resource

from src.app.api.v1.user_schemas import validate_user
from src.app.databases.mongodb import database

api = Namespace(name="users")


@api.route('/')
class UsersListView(Resource):

    def post(self) -> Tuple:
        data = validate_user(request.get_json())
        if data['ok']:
            data = data['data']
            if database.username_exists(data['username']):
                return {}, 400
            data['password'] = flask_bcrypt.generate_password_hash(
                data['password']
            )
            database.post_user(data)
            return {}, 200
        else:
            return {}, 400

    def get(self) -> Tuple:
        users = database.get_users()
        return users, 200


@api.route("/auth/")
class UserAuthView(Resource):
    def post(self) -> Tuple:
        data = validate_user(request.get_json())
        if data['ok']:
            data = data['data']
            user = database.get_user(data['username'])
            if user and flask_bcrypt.check_password_hash(
                    user['password'],
                    data['password']
            ):
                access_token = create_access_token(identity=data)
                refresh_token = create_refresh_token(identity=data)
                user['token'] = access_token
                user['refresh'] = refresh_token
                del user['password']
                return {
                           'ok': True,
                           'message': 'Valid data',
                           'user': user
                       }, 200
            else:
                return {
                           'ok': False,
                           'message': 'invalid username or password'
                       }, 401
        else:
            return {
                       'ok': False,
                       'message': 'Bad request parameters'
                   }, 400
