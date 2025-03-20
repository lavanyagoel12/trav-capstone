import pandas as pd
import numpy as np
import random
import json
from sklearn.neighbors import NearestNeighbors
import random
from wonderwords import RandomWord
from datetime import datetime, timedelta
from sklearn.preprocessing import LabelEncoder


file_path = 'C:/spotify_data/final.csv'  
df = pd.read_csv(file_path)

def random_date(start_year=1975, end_year=2024):
    start_date = datetime(start_year, 1, 1)
    end_date = datetime(end_year, 12, 31)
    random_days = random.randint(0, (end_date - start_date).days)
    return (start_date + timedelta(days=random_days)).strftime('%m/%d/%Y')

df['release_date'] = df['release_date'].apply(lambda x: random_date() if pd.isnull(x) else x)
df_sampled = df.groupby('country').apply(lambda x: x.sample(frac=0.02)).reset_index(drop=True)
df_sampled = df_sampled.rename(columns={'track_name': 'record_name'})
df_sampled['price'] = np.random.uniform(3.99, 30.99, size=len(df_sampled))
df_sampled['condition'] = np.random.uniform(1, 5, size=len(df_sampled))
df_sampled['popularity'] = np.random.uniform(1, 5, size=len(df_sampled))

#music_array = df_sampled.to_numpy()
#df_dict = df_sampled.to_dict(orient='dict')
df_sampled.to_json('spotify_data.json', orient='records', lines=True, indent=4)
#with open('customer_data.json', 'w') as json_file:
    #json.dump(df_dict, json_file, indent=4)


print("Data has been saved to spotify_data.json")