# PawSight AI - Cat vs. Dog Classifier

A high-performance deep learning application designed to classify images of cats and dogs with high accuracy and speed. Built using transfer learning and a modern web stack.

<img width="1920" height="2266" alt="PawSight-·-Cat-vs-Dog-AI-Classifier1" src="https://github.com/user-attachments/assets/29326015-7420-4231-9040-1ec29527bd3c" />


---

## 🐾 Overview
**PawSight AI** is a binary image classifier trained on a dataset of 25,000 images to provide instant predictions. Users can upload a photo and receive a classification result along with a confidence score in under a second.

---

## 🛠️ Built With
This project leverages a robust tech stack for both machine learning and web development:
* **Frontend:** React 18
* **Backend:** Flask (Python)
* **Deep Learning:** TensorFlow & Keras
* **Dataset:** Kaggle Cats and Dogs Dataset

---

## ⚙️ How It Works
The application utilizes a transfer learning pipeline to repurpose ImageNet knowledge for highly accurate binary classification.

1.  **Image Ingestion:** Uploaded images are resized to 150 x 150 pixels and normalized to match ImageNet preprocessing standards.
2.  **Feature Extraction:** A pre-trained model extracts complex visual features via convolutional layers.
3.  **Classification:** A fine-tuned sigmoid output layer collapses those features into a single probability: cat or dog.
4.  **Confidence Score:** The raw sigmoid output represents the model's confidence; values over 0.5 indicate a categorical result.

---

## 🚀 Features
* **Instant Prediction:** Rapid processing of uploaded images.
* **Detailed Analytics:** View confidence percentages for each classification.
* **Recent History:** Track and review previous predictions in a "Recent Predictions" gallery.
* **Clean UI:** A dark-themed, modern interface optimized for user experience.

---

## 📂 Project Structure
```text
├── front/           # React application (UI/UX)
├── back/            # Flask API and Model loading
│   ├── model/              # Saved Keras/TensorFlow model files
├── training/
│   └── train.py        # Training script
└── README.md
