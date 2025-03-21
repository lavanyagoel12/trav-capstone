import pickle
import sys
import json
import numpy as np

file_path = r"C:/Capstone/trav-capstone/server/python/updated_model.pkl"

with open(file_path, 'rb') as model_file:
    model = pickle.load(model_file)


input_data = json.loads(sys.argv[1])

feature_keys = [
    'uri', 'rank', 'artist_names', 'artists_num', 'artist_individual',
    'artist_id', 'artist_genre', 'artist_img', 'collab', 'record_name', 'release_date',
    'album_num_tracks', 'album_cover', 'source', 'peak_rank', 'previous_rank', 'weeks_on_chart',
    'streams', 'week', 'danceability', 'energy', 'key', 'mode', 'loudness', 'speechiness',
    'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'duration', 'country',
    'region', 'language', 'pivot', 'price', 'condition', 'popularity'
]

extracted_features = []

for record in input_data:
    features = []
    for key in feature_keys:
        try:
            features.append(float(record[key]))
        except ValueError:
            features.append(0.0)  
    extracted_features.append(features)


input_array = np.array(extracted_features)

if input_array.ndim == 1:
    input_array = input_array.reshape(1, -1)

predictions = model.predict(input_array)

print(json.dumps(predictions.tolist()))
