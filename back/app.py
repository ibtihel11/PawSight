from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from utils.predict import predict
import os

app = Flask(__name__)
CORS(app)  # Allow requests from React app

# Load model once at startup
MODEL_PATH = os.path.join("model", "cat_dog_model.keras")
print(f"Loading model from {MODEL_PATH}...")
model = tf.keras.models.load_model(MODEL_PATH)
print("Model loaded ✓")


@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "PawSight API running"})


@app.route("/predict", methods=["POST"])
def predict_route():
    # Check an image was sent
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400
    # Validate type
    allowed = {"jpg", "jpeg", "png", "webp", "gif"}
    ext = file.filename.rsplit(".", 1)[-1].lower()
    if ext not in allowed:
        return jsonify({"error": f"File type .{ext} not supported"}), 415

    try:
        file_bytes = file.read()
        result = predict(model, file_bytes)
        return jsonify(result), 200

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": "Inference failed", "detail": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)