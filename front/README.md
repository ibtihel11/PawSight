# 🐾 PawSight — Cat vs Dog AI Classifier

A portfolio-grade React frontend for a TensorFlow/Keras image classification model. Upload any photo of a cat or dog and get an instant prediction with a confidence score.

---

## ✨ Features

| Feature | Details |
|---|---|
| Drag & drop upload | react-dropzone with live image preview |
| Prediction result | Animated confidence bar, both class probabilities |
| Loading states | Spinner + progress animation while waiting for API |
| Error handling | Field-level errors + API error messages with shake animation |
| Prediction history | Scrollable card grid of past predictions (auto-cleared on refresh) |
| Smooth animations | CSS keyframes + spring transitions throughout |
| Responsive | Mobile-first, works from 375px up |

---

## 🗂️ Project structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed top nav with scroll-aware blur
│   ├── Navbar.module.css
│   ├── Hero.jsx            # Landing hero with stats bar
│   ├── Hero.module.css
│   ├── Upload.jsx          # Drag-and-drop image uploader
│   ├── Upload.module.css
│   ├── Result.jsx          # Prediction display with animated bars
│   ├── Result.module.css
│   ├── History.jsx         # Card grid of recent predictions
│   ├── History.module.css
│   ├── About.jsx           # "How it works" section
│   └── About.module.css
├── hooks/
│   └── usePredict.js       # API hook (fetch → Flask /predict)
├── styles/
│   └── globals.css         # Design tokens, reset, noise texture
├── App.js                  # Root component + state orchestration
└── App.module.css
```

---

## 🚀 Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the React app

```bash
npm start
```

Opens at **http://localhost:3000**

### 3. Run your Flask backend

Make sure your Flask server is running at `http://localhost:5000` with this endpoint:

```python
@app.route('/predict', methods=['POST'])
def predict():
    image_file = request.files['image']
    # ... your inference logic ...
    return jsonify({
        "prediction": "Cat",   # or "Dog"
        "confidence": 0.92     # float 0.0–1.0
    })
```

Enable CORS for local development:

```python
from flask_cors import CORS
CORS(app)
```

```bash
pip install flask-cors
```

---

## 🔌 Changing the API URL

Edit `src/hooks/usePredict.js`:

```js
const response = await fetch('http://localhost:5000/predict', { ... });
//                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                            Change this to your deployed URL
```

---

## 🎨 Design system

The UI uses CSS custom properties (design tokens) defined in `globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--bg-0` | `#0a0908` | Page background |
| `--gold` | `#e8a328` | Primary accent |
| `--cat` | `#e07a5f` | Cat prediction color |
| `--dog` | `#81b29a` | Dog prediction color |
| `--font-display` | Instrument Serif | Headings |
| `--font-body` | DM Sans | Body text |
| `--font-mono` | DM Mono | Labels, badges, stats |

---

## 🧠 Model summary

| Property | Value |
|---|---|
| Architecture | MobileNetV2 (transfer learning) |
| Dataset | Kaggle Dogs vs Cats (25,000 images) |
| Input shape | 224 × 224 × 3 |
| Output | Sigmoid (binary) |
| Val accuracy | ~95.4% |
| Optimizer | Adam (lr=1e-4) |

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-dropzone": "^14.2.3",
  "lucide-react": "^0.363.0"
}
```

---

Built as a portfolio project. Feel free to fork and adapt.
