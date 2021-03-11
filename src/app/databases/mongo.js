use editor
db.createCollection("documents")
db.createCollection("users")
db.createCollection("company")
db.documents.createIndex({"name": 'text'}, {unique: true})
db.users.createIndex({"username": 'text'}, {unique: true})