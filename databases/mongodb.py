from typing import Optional

from bson import ObjectId
from pymongo import MongoClient

from helpers import get_time

DATABASE_NAME = 'editor'


class MongoDB:

    def __init__(self) -> Optional:
        client = self.connect()
        self.db = client[DATABASE_NAME]

    @staticmethod
    def connect() -> MongoClient:
        return MongoClient()

    def get_document(self, args) -> Optional[dict]:
        document = self.db.documents.find_one({'_id': ObjectId(args)})
        return dict(document) if document else None

    def get_documents(self) -> list:
        return list(self.db.documents.find())

    def create_document(self, args: str):
        return self.db.documents.insert_one({
            'name': args['name'],
            'status': "Creating",
            'create_date': get_time(),
            'content': args["content"]
        })

    def delete_post(self, args):
        return self.db.documents.delete_one({'_id': ObjectId(args)})

    def update_document(self, args, post_id):
        return self.db.documents.update_one(
            {'_id': ObjectId(post_id)},
            {'$set': args}
        )


database = MongoDB()
