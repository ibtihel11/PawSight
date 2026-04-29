from importlib.resources import files

import kagglehub
import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

path = kagglehub.dataset_download("bhavikjikadara/dog-and-cat-classification-dataset")
data_dir = os.path.join(path, "PetImages")

# Configuration pour le split 70% train 10% validation
datagen_train_val = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.125, # 0.125 de 80% donne 10%
    rotation_range=20,
    horizontal_flip=True
)

# Configuration pour le test (20%)
datagen_test = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

train_generator = datagen_train_val.flow_from_directory(
    data_dir,
    target_size=(150, 150),
    batch_size=32,
    class_mode='binary',
    subset='training' # Donne 70%
)

validation_generator = datagen_train_val.flow_from_directory(
    data_dir,
    target_size=(150, 150),
    batch_size=32,
    class_mode='binary',
    subset='validation' # Donne 10%
)

test_generator = datagen_test.flow_from_directory(
    data_dir,
    target_size=(150, 150),
    batch_size=32,
    class_mode='binary',
    subset='validation',
    shuffle=False
)

from tensorflow.keras import layers, models

model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(150, 150, 3)),
    layers.MaxPooling2D(2, 2),

    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D(2, 2),

    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D(2, 2),

    layers.Flatten(),
    layers.Dense(512, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

history = model.fit(
    train_generator,
    steps_per_epoch=200,  # 200 batches
    validation_data=validation_generator,
    validation_steps=20,   # limite la validation
    epochs=5
)
    
model.save("cat_dog_model.keras")
files.download("cat_dog_model.keras")