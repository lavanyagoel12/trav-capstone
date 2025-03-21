import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
import pickle
import numpy as np


data = pd.read_json('spotify_formatted.json')

for column in data.columns:
    if data[column].dtype == 'object':
        data[column] = data[column].astype(str)

label_encoder = LabelEncoder()
for column in data.columns:
    if data[column].dtype == 'object':
        data[column] = label_encoder.fit_transform(data[column])

features = data.drop('artist_genre', axis=1)
labels = data['artist_genre']

X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f'Accuracy: {accuracy * 100:.2f}%')

with open('updated_model.pkl', 'wb') as model_file:
    pickle.dump(knn, model_file)

print("Model saved as 'updated_model.pkl'")



print(f'Accuracy: {accuracy * 100:.2f}%')
