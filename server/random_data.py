import random
import json

# Sample data for genres
genres = ["Jazz", "Hip Hop", "Country", "Classical", "R&B"]

# Function to generate random customer names
def generate_random_name():
    first_names = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Avery", "Peyton", "Quinn"]
    last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]
    return f"{random.choice(first_names)} {random.choice(last_names)}"

# Record data --NOT FINAL-- 
def generate_record_name():
    first_word = ["empty", "full", "available", "unavailable", "valid", "invalid", "ready", "busy",
    "new", "old", "small", "large", "high", "low", "first", "last", "next", "previous",
    "active", "inactive", "public", "private", "open", "closed", "visible", "hidden",
    "true", "false", "safe", "unsafe", "clean", "dirty", "fast", "slow", "strong", "weak",
    "online", "offline", "local", "remote", "default", "custom", "simple", "complex",
    "important", "trivial", "critical", "normal", "urgent", "pending", "running", 
    "finished", "failed", "successful"]
    last_word = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]
    return f"{random.choice(first_word)} {random.choice(last_word)}"

def generate_customer_data(num_data_points=1000):
    data = []
    for _ in range(num_data_points):
        customer_name = generate_random_name()
        record_name = generate_record_name()
        popularity = random.randint(1, 5)
        condition = random.randint(1, 10)
        price = round(random.uniform(3.99, 30.99), 2)
        genre = random.choice(genres)

        data_point = {
            "customer_name": customer_name,
            "record_name": record_name,
            "popularity": popularity,
            "condition": condition,
            "price": price,
            "genre": genre
        }
        data.append(data_point)
    return data

# Generate the data
customer_data = generate_customer_data()

# Save the data to a JSON file
with open('customer_data.json', 'w') as json_file:
    json.dump(customer_data, json_file, indent=4)

print("Data has been saved to customer_data.json")
