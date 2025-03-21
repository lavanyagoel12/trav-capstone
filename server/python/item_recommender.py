import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Load the KNN model
with open('knn_model_spotify.pkl', 'rb') as file:
    knn_model = pickle.load(file)

@app.route('/run-model', methods=['POST'])
def run_model():
    # Get cart items from the request
    cart_items = request.json.get('cart_items', [])
    
    # Process cart items through the model
    # Assuming the model expects a certain format, adjust as needed
    predictions = knn_model.predict(cart_items)
    
    return jsonify(predictions=predictions.tolist())

if __name__ == '__main__':
    app.run(debug=True)
