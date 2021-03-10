import datetime
import json
import os

from bson import ObjectId
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from src.app.api.v1 import api


class JSONEncoder(json.JSONEncoder):

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)


ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})

app = Flask(__name__)
api.init_app(app)

app.json_encoder = JSONEncoder
app.config.from_object(__name__)
app.config['JWT_SECRET_KEY'] = b'5\xc2s\xa7\x14_#mlb&\xc4\xe6\xd0\xa8O'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
app.json_encoder = JSONEncoder
flask_bcrypt = Bcrypt(app)
jwt = JWTManager(app)


@app.after_request
def after_request(response) -> dict:
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return response


if __name__ == '__main__':
    app.config['DEBUG'] = os.environ.get('ENV') == 'development'
    app.run()  # Run the app
