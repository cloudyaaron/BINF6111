import re
import json

#obo file for phenotypes
f = open("./hp.obo")


# class HPO:
#     def __init__(self,name,hpid,parent,children):
#         self.name = name
#         self.hpid = hpid
#         self.parent = parent
#         self.children = children
#
def Initial():
    tree = []
    hpo = f.readlines()
    lines = len(hpo)
    # 15332
    i = 0
    temp = dict()
    parent = []
    while i < lines:
        if re.search("^\[Term\]", hpo[i]):
            temp.update({'parent': parent})
            tree.append(temp)
            temp = dict({'value': 0})
            parent = []
        if re.search("^id:", hpo[i]):
            temp.update({"id": re.sub("id:", "", hpo[i]).strip()})
        if re.search("^name", hpo[i]):
            temp.update({"name": re.sub("name:", "", hpo[i]).strip()})
        if re.search("^is_a:", hpo[i]):
            parent.append(re.sub("is_a:", "", hpo[i].split("!")[0]).strip())
        i = i + 1
    return tree


def GetChild(term):
    r = []
    for temp in data:
        if term in temp['parent']:
            r.append(temp)
    return r


def GetTree(term):
    print(term)
    r = dict()
    r.update({'hpoid': term['id'], 'name': term['name'], 'value': 1, 'children': [],'patients':[],'nP':0})
    children = GetChild(term['id'])
    if not children:
        return r
    for child in children:
        result = GetTree(child)
        r['children'].append(result)
    i = 0

    return r



# print(GetChild("HP:0000001"))
# print(len(data))

j = Initial()
#
with open("myHp.json","w") as outf:
    fil = json.dump(j, outf)
# js = open("myHp.json")
# data = json.load(js)
t = GetTree(j[0])
with open("tree.json","w") as outf:
    fil = json.dump(t, outf)


