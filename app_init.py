from flask import Flask

from api.v1 import api

app = Flask(__name__)
api.init_app(app)

app.config.from_object(__name__)


# CORS(app, resources={r'/*': {'': '*', 'Access-Control-Allow-Methods': '*', 'headers': '*'}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return response


if __name__ == "__main__":
    app.run(debug=True)
