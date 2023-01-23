import flask
from flask import Flask, request
from flask_cors import CORS, cross_origin

from database import get_collection
from helper import get_word_def_from_API


app = Flask(__name__)
cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
collection = get_collection()


@app.route("/")
def test():
    return "<p>test</p>"


@app.route("/word", methods=['GET'])
def word_search():
    args = request.args
    word = args.get("name")
    data = collection.find_one({"word": word})
    if data is not None:
        print(data["def"])
        return flask.jsonify(data["def"])
    print(word)
    return get_word_def_from_API(word)

