
# coding: utf-8

# In[89]:

import requests
from bs4 import BeautifulSoup
import json
import pprint

# In[101]:

pp = pprint.PrettyPrinter(indent=2)
url = "http://studentorg.ucsd.edu/"


r = requests.get(url)
soup = BeautifulSoup(r.content, "lxml")

clubs = []
for x in soup.find_all("h2"):
    club = {}
    description_block = x.find_next_sibling("div").find("span")
    if (description_block):
        print(description_block.text)
        club['name'] = x.text
        club['description'] = description_block.text
        club = {"name": x.text.strip(), "description": description_block.text}
        clubs.append(club)


pp.pprint(clubs)

with open('clubs.json', 'w') as f:
    json.dump(clubs, f)