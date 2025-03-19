import pandas as pd
from sklearn.neighbors import NearestNeighbors
from wonderwords import RandomWord
r = RandomWord()

random_word = r.word()
print(random_word)