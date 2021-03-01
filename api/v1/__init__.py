from flask_restplus import Api

from .views.documents import api as ns

api = Api(
    title='My Title',
    version='1.0',
    description='A description',
    # All API metadatas
)

api.add_namespace(ns, path='/api/v1/documents')
