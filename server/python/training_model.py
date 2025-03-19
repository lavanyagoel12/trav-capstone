import pandas as pd
from sklearn.neighbors import NearestNeighbors
import random
from wonderwords import RandomWord

# Sample data for genres
genres = ["Jazz", "Hip Hop", "Country", "Classical", "R&B"]

# Record data --NOT FINAL-- 
def generate_record_name():
    r = RandomWord()
    words = set()
    # Generate 1000 different words
    while len(words) < 1000:
        word = r.word()
        if word:
            words.add(word)

    # Convert the set to a list
    words_list = list(words)
    
    # Choose two random words from the list and return as a tuple
    record_name = ' '.join(random.sample(words_list, 2))
    
    return record_name

def generate_customer_data(num_data_points=1000):
    data = []
    for _ in range(num_data_points):
        record_name = generate_record_name()
        popularity = random.randint(1, 5)
        condition = random.randint(1, 10)
        price = round(random.uniform(3.99, 30.99), 2)
        genre = random.choice(genres)

        data_point = {
            "record_name": record_name,
            "genre": genre,
            "popularity": popularity,
            "condition": condition,
            "price": price
        }
        data.append(data_point)
    return data

# Generate the data
customer_data = generate_customer_data()

# Create a DataFrame
df = pd.DataFrame(customer_data)

# Convert categorical 'genre' to numeric using one-hot encoding
df_encoded = pd.get_dummies(df, columns=['genre'])

# Prepare the feature set
X = df_encoded.drop(columns=['record_name'])

# Train the NearestNeighbors model
knn = NearestNeighbors(n_neighbors=3, algorithm='auto').fit(X)

# Select a random product index
selected_product_index = random.randint(0, len(df) - 1)

# Get the features of the selected product
selected_product_features = X.iloc[selected_product_index].values.reshape(1, -1)

# Find the nearest neighbors
distances, indices = knn.kneighbors(selected_product_features)
recommended_product_indices = indices.flatten()
recommended_products = df.iloc[recommended_product_indices]

print("Selected Product:")
print(df.iloc[selected_product_index])
print("\nRecommended Products:")
print(recommended_products)
