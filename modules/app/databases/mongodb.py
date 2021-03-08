from typing import Optional

from bson import ObjectId
from pymongo import MongoClient

from helpers import get_time

DATABASE_NAME = 'editor'


class MongoDB:

    def __init__(self) -> Optional[None]:
        client = self.connect()
        self.db = client[DATABASE_NAME]

    def doc_name_exists(self, name) -> dict:
        return self.db.documents.find_one({'name': name})

    @staticmethod
    def connect() -> MongoClient:
        return MongoClient()

    def get_document(self, doc_id: str) -> Optional[dict]:
        document = self.db.documents.find_one({'_id': ObjectId(doc_id)})
        return dict(document) if document else None

    def get_documents(self) -> list:
        return list(self.db.documents.find())

    def create_document(self, args: dict) -> int:
        return self.db.documents.insert_one({
            'name': args['name'],
            'status': "Creating",
            'create_date': get_time(),
            'content': args["content"]
        })

    def delete_post(self, doc_id: str) -> int:
        return self.db.documents.delete_one({'_id': ObjectId(doc_id)})

    def update_document(self, args: dict, doc_id: str) -> int:
        return self.db.documents.update_one(
            {'_id': ObjectId(doc_id)},
            {'$set': args}
        )


database = MongoDB()
