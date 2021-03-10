from flask_restplus import Api

from .views.documents import api as ns
from .views.user import api as user_ns

api = Api(
    title='My Title',
    version='1.0',
)
api.add_namespace(ns, path='/api/v1/documents')
api.add_namespace(user_ns, path='/api/v1/users')
