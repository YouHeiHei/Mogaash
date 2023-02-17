import random
import re
import requests
from dotenv import load_dotenv

import os

load_dotenv()
dictionary_api_key = os.environ.get("dictionary-api-key")
thesaurus_api_key = os.environ.get("thesaurus-api-key")


def get_word_def_from_API(word):
    # TODO
    return {"word": word, "def": []}


def choose_word_from_list(l):
    # TODO: better algorithm based on familiarity with the word
    return random.choice(l)


def simplify_text_from_MW(text):
    simplified_text = text.replace("{bc}", "").strip()

    sx_reg = re.compile(r'{sx\|(.*?)\|\|(.*?)}')
    simplified_text = re.sub(sx_reg, r'\1', simplified_text)

    dx_def_reg = re.compile(r' {dx_def}(.*?){/dx_def}')
    simplified_text = re.sub(dx_def_reg, "", simplified_text)

    d_link_reg = re.compile(r'{d_link\|(.*?)\|(.*?)}')
    simplified_text = re.sub(d_link_reg, r'\1', simplified_text)

    dx_reg = re.compile(r' {dx}(.*?){/dx}')
    simplified_text = re.sub(dx_reg, "", simplified_text)

    a_link_reg = re.compile(r'{a_link\|(.*?)}')
    simplified_text = re.sub(a_link_reg, r'\1', simplified_text)

    it_reg = re.compile(r'{it}(.*?){/it}')
    simplified_text = re.sub(it_reg, r'\1', simplified_text)

    wi_reg = re.compile(r'{wi}(.*?){/wi}')
    simplified_text = re.sub(wi_reg, r'\1', simplified_text)

    gloss_reg = re.compile(r'{gloss}(.*?){/gloss}')
    simplified_text = re.sub(gloss_reg, "", simplified_text)

    phrase_reg = re.compile(r'{phrase}(.*?){/phrase}')
    simplified_text = re.sub(phrase_reg, r'\1', simplified_text)

    return simplified_text


def get_full_def(definition: list):
    list_of_def_dict = []

    for i in definition:

        if "def" in i and "fl" in i:
            def_dict = {"fl": i["fl"]}

            definitions = i["def"]

            def_list = []
            for de in definitions:
                temp_dict = {"vd": "not verb"}

                if "vd" in de:
                    temp_dict["vd"] = de["vd"]

                sseq_list = []
                sseqs = de["sseq"]

                for sseq in sseqs:
                    sense_list = []

                    for senses in sseq:
                        sense_type = senses[0]

                        if sense_type == "sense":
                            sense_dict = {}
                            sense = senses[1]

                            if "dt" in sense:
                                text = sense["dt"]

                                for t in text:
                                    text_type = t[0]

                                    if text_type == "text":
                                        # sense_dict["def"] = t[1]
                                        sense_dict["def"] = simplify_text_from_MW(t[1])
                                    elif text_type == "vis":
                                        usages = t[1]
                                        usage_list = []
                                        for usage in usages:
                                            # usage_list.append(usage["t"])
                                            usage_list.append(simplify_text_from_MW(usage["t"]))

                                        sense_dict["usage"] = usage_list
                            sense_list.append(sense_dict)
                    sseq_list.append(sense_list)
                def_list.append(sseq_list)
            def_dict["def"] = def_list
            list_of_def_dict.append(def_dict)
    print(list_of_def_dict)


def test_api(test_word: str):
    req_link = 'https://dictionaryapi.com/api/v3/references/collegiate/json/{}?key={}'.format(test_word, dictionary_api_key)

    r = requests.get(req_link)
    definition = r.json()

    # Pronunciation:
    # "hwi" => "prs" [] => "sound" => "audio"
    #
    # "https://media.merriam-webster.com/audio/prons/en/us/mp3/[subdirectory]/[base filename].mp3"
    # [subdirectory] is determined as follows:
    #   if audio begins with "bix", the subdirectory should be "bix",
    #   if audio begins with "gg", the subdirectory should be "gg",
    #   if audio begins with a number or punctuation (eg, "_"), the subdirectory should be "number",
    #   otherwise, the subdirectory is equal to the first letter of audio.

    # Vocab type:
    # "fl"

    # Definition:
    # "def" [] => "vd" (transitive / intransitive),
    #             "sseq" [] => [] => []@[1] => "sn" sense number
    #                                          "dt" definition text []@[0] => []@[1] => definition
    #                                                               []@[1+](optional) => []@[1] [] => "t" => phrase/sentence ex.

    get_full_def(definition)

    return definition
