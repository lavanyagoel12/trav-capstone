import random
import json
from wonderwords import RandomWord

genres = ["Jazz", "Hip Hop", "Country", "Classical", "R&B"]

def generate_unique_words(num_words=1000):
    r = RandomWord()
    words = set()
    while len(words) < num_words:
        word = r.word()
        if word:
            words.add(word)
    return list(words)

def generate_customer_data(words_list, num_data_points=1000):
    return [
        {
            "record_name": ' '.join(random.sample(words_list, 2)),
            "genre": random.choice(genres),
            "popularity": random.randint(1, 5),
            "condition": random.randint(1, 10),
            "price": round(random.uniform(3.99, 30.99), 2)
        }
        for _ in range(num_data_points)
    ]

unique_words = generate_unique_words()

customer_data = generate_customer_data(unique_words)

with open('customer_data.json', 'w') as json_file:
    json.dump(customer_data, json_file, indent=4)

print("Data has been saved to customer_data.json")

