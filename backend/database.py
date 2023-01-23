from pymongo import MongoClient


def get_collection():
    client = MongoClient('localhost', 27017)
    db = client.Mogaash
    return db.Vocab


def write_word_to_db(collection):
    # TODO
    pass
