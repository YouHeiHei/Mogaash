import random


def get_word_def_from_API(word):
    # TODO
    return {"word": word, "def": []}


def choose_word_from_list(l):
    # TODO: better algorithm based on familiarity with the word
    return random.choice(l)
