
# coding: utf-8

# In[89]:

import requests
from bs4 import BeautifulSoup


# In[101]:

url = "http://studentorg.ucsd.edu/"


# In[8]:

r = requests.get(url)
soup = BeautifulSoup(r.content, "lxml")


# In[100]:

for x in soup.find_all("h2"):
    print x.text


# In[99]:

for y in soup.find_all("span"):
    print y.text + "\n"


# In[ ]:



