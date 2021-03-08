from flask import request
from flask_restplus import Namespace
from flask_restplus import Resource

from modules.app.api import document_create_schema, \
    document_return_schema, document_update_schema
from databases.mongodb import database

api = Namespace(name="documents")

document_model = api.model("Document", document_create_schema)


@api.route("/")
class DocumentsListView(Resource):

    @api.expect(document_update_schema)
    def post(self):
        content = request.get_json(silent=True)
        if database.doc_name_exists(content["name"]):
            return {}, 404
        result = database.create_document(content)
        return {'id': str(result.inserted_id)}, 200

    @api.marshal_with(document_return_schema)
    def get(self):
        content = database.get_documents()
        return content, 200


@api.route("/<id>/")
class DocumentsDetailView(Resource):

    @api.expect(document_update_schema)
    def patch(self, id):
        content = request.get_json(silent=True)
        result = database.update_document(content, id)
        print(result.modified_count)
        if not result.modified_count:
            return {}, 404
        return {}, 200

    @api.marshal_with(document_return_schema)
    def get(self, id):
        content = database.get_document(id)
        if not content:
            return {}, 404
        return content, 200

    @api.marshal_with(document_return_schema)
    def delete(self, id):
        content = database.delete_post(id)
        if not content.deleted_count:
            return {}, 404
        return {}, 204