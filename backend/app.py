import flask
from flask import Flask, request
from flask_cors import CORS, cross_origin

from database import get_db
from helper import get_word_def_from_API, choose_word_from_list, test_api


app = Flask(__name__)
cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
db = get_db()
collection = db.Vocab

@app.route("/")
def test():
    return "<p>test</p>"


@app.route("/word", methods=['GET'])
def word_search():

    """
    Search specific word in database

    :param
        http://127.0.0.1:5000/word?name=[WORD_TO_REPLACE]
    ex.
        http://127.0.0.1:5000/word?name=censure =>
        {"def":
            [{"text":"harsh criticism or disapproval","type":"noun"},
            {"text":"the state of being excommunicated","type":"noun"},
            {"text":"rebuke formally","type":"verb"}],
        "word":"censure"}

    :return: {"def":[LIST OF DEFINITION: {"text" : "DEF"}], "word":"WORD"}
        if WORD not in database, list will be empty
    """
    args = request.args
    word = args.get("name")
    data = collection.find_one({"word": word})
    if data is not None:
        dict = {"word": word, "def": data["def"]}
        print(dict)
        return flask.jsonify(dict)
    print(word)
    return flask.jsonify(get_word_def_from_API(word))


@app.route("/randWord", methods=['GET'])
def get_random_word():
    """
    Handles "Get next word" function based on input list_name

    :param
        http://127.0.0.1:5000/randWord?list=[LIST_NAME_TO_REPLACE]
    ex.
        http://127.0.0.1:5000/randWord?list=Test_List_1 =>
        {"def":
            [{"text":"harsh criticism or disapproval","type":"noun"},
            {"text":"the state of being excommunicated","type":"noun"},
            {"text":"rebuke formally","type":"verb"}],
        "word":"censure"}

    :return: Selected word and its definition in database based on algorithm
        {"def":[LIST OF DEFINITION: {"text" : "DEF"}], "word":"WORD"}
    """
    args = request.args
    list_name = args.get("list")
    data = list(collection.find({"list_name": list_name}))
    data = [{"word": d["word"], "def": d["def"]} for d in data]
    if data:
        print(choose_word_from_list(data))
        return flask.jsonify(choose_word_from_list(data))
    print(list_name)
    return "SORRY!"


@app.route("/test", methods=['GET'])
def api():
    # http://127.0.0.1:5000/test?word=censure
    args = request.args
    test_word = args.get("word")
    res = test_api(test_word)
    # return flask.jsonify(res)
    return "test"
