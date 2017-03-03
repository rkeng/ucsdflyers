
# coding: utf-8

# In[1]:

import requests
from bs4 import BeautifulSoup
import json


# In[2]:

url ="http://studentorg.ucsd.edu/RdOnlyDetail.aspx?data="


# In[3]:

websites = []
for x in range(6524,7202):
    i = 0
    newUrl = url + str(x)
    r = requests.get(newUrl)
    soup = BeautifulSoup(r.content, "lxml")
    for x in soup.find_all("div"):
        if(i==0):
            websites.append([x.findNext('div').findNext('h2').text,x.findNext('div').findNext('span', {'id':'MainContent_fvOrgDetail_lblWeb'}).text])
            i += 1


# In[7]:

websites[:10]


# In[5]:

abc = []
abc.append(websites[0][0])


# In[12]:

X = sorted(websites, key=lambda x:x[0])


# In[15]:

import json
import pprint


# In[44]:

X[615][0] = u'Triton Pokemon Go'


# In[45]:

Y = []
for x in X:

    website = {"club" : str(x[0]), "website" : str(x[1])}
    Y.append(website)
    


# In[46]:

pp = pprint.PrettyPrinter(indent=2)


# In[47]:

pp.pprint(Y)


# In[53]:


with open("C:/Users/aravi/Desktop/websites.json", 'w') as f:
    f.write('{"websites": ')
    json.dump(Y, f)
    f.write("}")


# In[ ]:



