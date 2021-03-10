from typing import Tuple

from flask import request
from flask_jwt_extended import jwt_required
from flask_restplus import Namespace
from flask_restplus import Resource

from src.app.api.v1.document_schemas import document_create_schema, \
    document_update_schema, document_return_schema
from src.app.databases.mongodb import database

api = Namespace(name="documents")


@api.route("/")
class DocumentsListView(Resource):

    @api.expect(document_create_schema)
    @jwt_required()
    def post(self) -> Tuple:
        content = request.get_json(silent=True)
        if database.doc_name_exists(content["name"]):
            return {}, 404
        result = database.create_document(content)
        return {'id': str(result.inserted_id)}, 200

    @api.marshal_with(document_return_schema)
    @jwt_required()
    def get(self) -> Tuple:
        content = database.get_documents()
        return content, 200


@api.route("/<id>/")
class DocumentsDetailView(Resource):

    @api.expect(document_update_schema)
    @jwt_required()
    def patch(self, id: str) -> Tuple:
        content = request.get_json(silent=True)
        result = database.update_document(content, id)
        if not result.modified_count:
            return {}, 404
        return {}, 200

    @api.marshal_with(document_return_schema)
    @jwt_required()
    def get(self, id: str) -> Tuple:
        content = database.get_document(id)
        if not content:
            return {}, 404
        return content, 200

    @api.marshal_with(document_return_schema)
    @jwt_required()
    def delete(self, id: str) -> Tuple:
        content = database.delete_post(id)
        if not content.deleted_count:
            return {}, 404
        return {}, 204
