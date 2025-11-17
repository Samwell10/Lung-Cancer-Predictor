from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Load your saved model
model = joblib.load('DecisionTreeModel.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the frontend
    data = request.get_json()

    features = [
        data['AGE'],
        data['SMOKING'],
        data['YELLOW_FINGERS'],
        data['ANXIETY'],
        data['PEER_PRESSURE'],
        data['CHRONIC DISEASE'],
        data['FATIGUE'],
        data['ALLERGY'],
        data['WHEEZING'],
        data['ALCOHOL CONSUMING'],
        data['COUGHING'],
        data['SHORTNESS OF BREATH'],
        data['SWALLOWING DIFFICULTY'],
        data['CHEST PAIN'],
        data['GENDER_M'],
    ]

    # Example: data = {"age": 55, "smoking": 1, "gender": 0, "chronic_disease": 1}
    input_data = np.array(features).reshape(1, -1)

    # Make prediction
    prediction = model.predict(input_data)

    # Send response back as JSON
    result = {"description": "High Possibility of Cancer Detected", "level": "HIGH"} if prediction[0] == 1 else {"description": "Little Possibility ofCancer Detected", "level": "LOW"} 
    return jsonify({"prediction": result})

if __name__ == '__main__':
    app.run(debug=True)