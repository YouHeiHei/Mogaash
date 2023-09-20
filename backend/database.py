from pymongo import MongoClient
from helper import get_word_definition_from_MW_API


def get_db():
    client = MongoClient('localhost', 27017)
    db = client.Mogaash
    return db


def get_word_def(collection, word):
    data = collection.find_one({"word": word}, {'_id': False})
    if data is not None:
        print(word + " is in db")
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


def get_vocab_list_number_from_name(collection, list_name):
    list = collection.find_one({'list_name': list_name})
    if list is not None:
        return list['list_num']
    return 0


def get_vocab_list_summary(collection, list_num):
    key = {'list_num': list_num}

    num_success = 0
    num_warning = 0
    num_dangerous = 0
    for memo_val in collection.find(key):
        if memo_val['value'] == 0:
            num_dangerous += 1
        elif memo_val['value'] < 5:
            num_warning += 1
        else:
            num_success += 1
    return {"success": num_success, "warning": num_warning, "danger": num_dangerous}


def get_all_vocab_list_summary(collection, memo_collection):
    ret_list = []
    for pair in collection.find({}):
        dict = get_vocab_list_summary(memo_collection, pair['list_num'])
        dict['list_name'] = pair['list_name']
        dict['list_num'] = pair['list_num']

        ret_list.append(dict)
    return ret_list


def get_all_vocab_list_name(collection):
    return list(collection.find({}, {"_id": False}))
