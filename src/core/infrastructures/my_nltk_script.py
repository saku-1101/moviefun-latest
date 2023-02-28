import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag

def extract_keywords(text):
    tokens = word_tokenize(text)
    tagged = pos_tag(tokens)
    keywords = [word for word, pos in tagged if pos.startswith('NN') or pos.startswith('JJ')]
    return keywords

if __name__ == '__main__':
    text = input().strip()
    keywords = extract_keywords(text)
    print(keywords)
