import nltk

def tokenize(text):
    tokens = nltk.word_tokenize(text)
    taggedTokens = nltk.pos_tag(tokens)
    return taggedTokens
