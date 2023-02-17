from pymongo import MongoClient


def get_db():
    client = MongoClient('localhost', 27017)
    db = client.Mogaash
    return db


def write_word_to_db(collection):
    # TODO
    pass
