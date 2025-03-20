import json
import os
'''
with open("spotify_data.json", "r") as f:
    content = f.read()

parsed_values = []
decoder = json.JSONDecoder()

while content:
    value, new_start = decoder.raw_decode(content)
    content = content[new_start:].strip()
    # You can handle the value directly in this loop:
    print("Parsed:", value)
    # Or you can store it in a container and use it later:
    parsed_values.append(value)

with open('spotify_formatted.json', 'w') as json_file:
    json.dump(parsed_values, json_file, indent=4)
'''

# Read the content of the JSON file
with open('spotify_data.json', 'r') as file:
    # Get text without whitespace or newlines
    text = file.read().replace(' ', '').replace('\n', '')

# Split by '{', discard first entry (will be empty)
objects = text.split('{')[1:]

parsed_objects = []

for object in objects:
    # Add the split delimiter back
    object = '{' + object
    # Get the id relative to the json data
    id_start = object.find('"ID"') + 6
    id_end = object.find('"Name"') - 2
    id = object[id_start:id_end]
    # Add the file extension
    id += '.json'

    # Parse the JSON object
    try:
        parsed_object = json.loads(object)
        parsed_objects.append(parsed_object)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON object: {e}")

# Save all parsed objects to a single JSON file
with open('spotify_formatted.json', 'w') as json_file:
    json.dump(parsed_objects, json_file, indent=4)

print("Data has been saved to spotify_formatted.json")


