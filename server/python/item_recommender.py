from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)
columns_to_keep = [
    "danceability", "energy", "key", "mode", "loudness", "speechiness",
    "acousticness", "instrumentalness", "liveness", "valence", "tempo",
    "duration", "price", "condition", "popularity"
]
# Load the KNN model from the pickle file
with open("C:/Capstone/trav-capstone/server/python/knn_model_spotify.pkl", "rb") as file:
    model = pickle.load(file)

@app.route('/run-model', methods=['POST'])
def predict():
    try:
        # Get features from the request
        cart_features = request.json.get(columns_to_keep, [])
        
        # Perform prediction using the KNN model
        recommendations = model.predict(cart_features)
        
        # Return the recommendations as a JSON response
        return jsonify(recommendations.tolist())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
