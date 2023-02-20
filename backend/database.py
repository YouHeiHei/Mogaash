from pymongo import MongoClient
from helper import get_word_definition_from_MW_API


def get_db():
    client = MongoClient('localhost', 27017)
    db = client.Mogaash
    return db


def get_word_def(collection, word):
    data = collection.find_one({"word": word}, {'_id': False})
    if data is not None:
        return data
    write_word_to_db(collection, word)
    return collection.find_one({"word": word}, {'_id': False})


def write_word_to_db(collection, word):
    data = get_word_definition_from_MW_API(word)
    collection.insert(data)
    return data


def write_memovalue_to_db(collection, word, list_name, value):
    key = {'word': word, 'list_name': list_name}
    new_value = {'word': word, 'list_name': list_name, 'value': value}
    collection.update(key, new_value, upsert=True)
    return collection.find_one(key, {"_id": False})
