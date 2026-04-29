import numpy as np
from PIL import Image
import io

IMG_SIZE = (150, 150)

def preprocess_image(file_bytes):
    img = Image.open(io.BytesIO(file_bytes))
    img = img.convert("RGB")
    img = img.resize(IMG_SIZE)
    # Convert to array and normalize to [0, 1]
    arr = np.array(img) / 255.0
    # Add batch dimension
    arr = np.expand_dims(arr, axis=0)
    return arr


def predict(model, file_bytes):
    processed = preprocess_image(file_bytes)
    raw = model.predict(processed)[0][0]
    # Convention: 0 = Cat, 1 = Dog 
    if raw > 0.5:
        label = "Dog"
        confidence = float(raw)
    else:
        label = "Cat"
        confidence = float(1 - raw)
    return {"prediction": label, "confidence": round(confidence, 4)}