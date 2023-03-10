import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
from flask import Flask, request
from flask_cors import CORS
import jsonpickle

app = Flask(__name__)
CORS(app)


@app.route('/extract-keywords/<text>/', methods=['GET'])
def extract_keywords(text=None):
    if request.method == 'GET':
        tokens = word_tokenize(text)
        tagged = pos_tag(tokens)
        keywords = [word for word, pos in tagged if pos.startswith('NN') or pos.startswith('JJ')]
    return jsonpickle.encode(keywords)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
    text = input().strip()
    keywords = extract_keywords(text)
    print(keywords)