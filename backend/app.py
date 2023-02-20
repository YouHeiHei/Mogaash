import flask
from flask import Flask, request
from flask_cors import CORS, cross_origin

from database import get_db, get_word_def, write_memovalue_to_db
from helper import get_word_def_from_API, choose_word_from_list, get_word_definition_from_MW_API


app = Flask(__name__)
cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
db = get_db()
vocab_coll = db.Vocab
memovalue_coll = db.MemoValue


@app.route("/")
def test():
    return "<p>test</p>"


@app.route("/word", methods=['GET'])
def word_search():

    """
    Get <word> definition from database:
        if <word> is not in database, it will make request to MW API and write definition to the database

    :param
        http://127.0.0.1:5000/word?name=[WORD_TO_REPLACE]

    ex.
        http://127.0.0.1:5000/word?name=wind =>
        {
            "word": "wind",
            "sense_list": [
                {
                    "def_list": [
                        [
                            [
                                {
                                    "text": "a force or agency that carries along or influences tendency, trend",
                                    "usage": [
                                        "withstood the winds of popular opinion"
                                    ]
                                },
                                {
                                    "text": "a destructive force or influence"
                                }
                            ]
                        ]
                    ],
                    "fl": "noun",
                    "sound": [
                        "wind0003",
                        "wind0004"
                    ]
                }
            }
        }

    :return:
        {
            "word": "WORD",
            "sense_list": [
                {
                    "def_list" : [
                        [
                            [
                                {
                                    "text": <Definition Text>,
                                    (Optional)"usage": ["<Word Usage>", ...]
                                }
                            ]
                        ]
                    ],
                    "fl": "<Function Label, ex. 'noun', 'verb'>",
                    "sound": [
                        "<audio filename for MW media api>", ...
                    ]
                }, ...
            ]
        }
    """
    args = request.args
    word = args.get("name")
    data = get_word_def(vocab_coll, word)
    # print(data)
    return flask.jsonify(data)


@app.route("/randWord", methods=['GET'])
def get_random_word():
    """
    Handles "Get next word" function based on input list_name

    :param
        http://127.0.0.1:5000/randWord?list=[LIST_NAME_TO_REPLACE]&prev=[previous word]
    ex.
        http://127.0.0.1:5000/randWord?list=Test_List_1&prev=censure =>
        {
        "sense_list": [
            {
                "def_list": [
                    [
                        [
                            {
                                "text": "to subvert or weaken insidiously or secretly",
                                "usage": [
                                    "trying to undermine his political rivals"
                                ]
                            }
                        ],
                    ]
                ],
                "fl": "verb",
                "sound": [
                    "underm02"
                ]
            }
        ],
        "word": "undermine"
    }

    :return: Selected word and its definition in database based on algorithm
        {
            "word": "WORD",
            "sense_list": [
                {
                    "def_list" : [
                        [
                            [
                                {
                                    "text": <Definition Text>,
                                    (Optional)"usage": ["<Word Usage>", ...]
                                }
                            ]
                        ]
                    ],
                    "fl": "<Function Label, ex. 'noun', 'verb'>",
                    "sound": [
                        "<audio filename for MW media api>", ...
                    ]
                }, ...
            ]
        }
    """
    args = request.args
    list_name = args.get("list")
    prev_word = args.get("prev")
    data = list(memovalue_coll.find({"list_name": list_name}, {"_id": False}))

    if data:
        new_word = choose_word_from_list(data, prev_word)
        print(new_word)
        return flask.jsonify(get_word_def(vocab_coll, new_word))
    return flask.jsonify(data)


@app.route("/test", methods=['GET'])
def api():
    # http://127.0.0.1:5000/test?word=censure&list_name=test_list1&value=0
    args = request.args
    word = args.get("word")
    list_name = args.get("list_name")
    value = args.get("value", type=int)
    res = write_memovalue_to_db(memovalue_coll, word, list_name, value)
    return flask.jsonify(res)
