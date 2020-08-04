import json

t = open("tree.json")
tree = json.load(t)

patients = open("./phenotips_2020-06-09_18-16_with_external_id.json")
plist = json.load(patients)


def ApplyPatients(term, current_node, patient):
    # print("IN "+ current_node['id']+ "Searching "+term['id'])
    if current_node['hpoid'] == term['id']:
        current_node['patients'].append(patient['report_id'])
        return current_node
    else:
        if not current_node['children']:
            return 0
        for child in current_node['children']:
            r = ApplyPatients(term, child, patient)
            if r != 0:
                current_node['children'].remove(child)
                current_node['children'].append(r)
                return current_node

    return 0


def TrimTree(node):
    if (not node['children']) and (not node['patients']):
        return 0
    else:
        r_list = []
        for child in node['children']:
            r = TrimTree(child)
            if r == 0:
                r_list.append(child)
            else:
                node['value'] = int(node['value']) + int(child['value'])
                for chch in r['patients']:
                    if chch not in node['patients']:
                        node['patients'].append(chch)

        for ro in r_list:
            node['children'].remove(ro)
        node['nP'] = len(node['patients'])
        if (not node['children']) and (not node['patients']):
            return 0
        else:
            return node


for p in plist:
    print(p['report_id'])
    for pheno in p['features']:
        if pheno['observed'] == "yes":
            tree = ApplyPatients(pheno, tree, p)

treeP = TrimTree(tree)

with open("treeWithP.json", "w") as outf:
    json.dump(treeP, outf)


v = open("treeWithP.json")
vt = json.load(v)
