from flask_restplus import fields

document_create_schema = {
    'name': fields.String(required=True),
    'status': fields.String(required=True),
    'content': fields.String(required=True)
}
document_update_schema = {
    'name': fields.String(required=False),
    'status': fields.String(required=False),
    'content': fields.String(required=False)
}

document_return_schema = {
    '_id': fields.String,
    'name': fields.String(required=True),
    'status': fields.String(required=True),
    'content': fields.String(required=True)
}
