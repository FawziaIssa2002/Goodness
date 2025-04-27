import flask
import pandas as pd

import pickle
import numpy as np
from flask import request, jsonify
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "Flask API is running"

@app.route('/predict', methods=['POST'])
def predict():
    filename = 'trained_model.sav'
    try:
        with open(filename, 'rb') as file:
            loaded_model = pickle.load(file)
    except (EOFError, FileNotFoundError) as e:
        return jsonify({"error": str(e)}), 500

    try:
        data = request.get_json()
        num_family = data.get('num_family')
        base_pay = data.get('base_pay')
        birthday = data.get('birthday')
        state = data.get('state')

        if None in [num_family, base_pay, birthday, state]:
            return jsonify({"error": "Missing parameters"}), 400

        input_data = {'num_family': [num_family], 'base_pay': [base_pay], 'birthday': [birthday], 'state': [state]}
        X = pd.DataFrame(input_data)

        prediction = loaded_model.predict(X)
        prediction = prediction[0].item() if isinstance(prediction[0], (np.generic, np.bool_)) else prediction[0]
        
        response = {"result": prediction}
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
