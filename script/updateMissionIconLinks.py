import requests
import json

def update():
    title = "# Links der Einsatzgrafiken"
    start_count = 1
    final_content = ""
    resp = requests.get("https://rettungssimulator.online/api/missions")
    if resp.status_code != 200:
        exit(1)
    json = parse_json(resp)
    icon_link_list = filter_json(json)
    final_content += title + "\n \n"
    for i in icon_link_list:
        final_content += str(start_count) + ". \n"
        final_content += f'- name: {i}\n'
        if icon_link_list.index(i) == len(icon_link_list) - 1:
            final_content += f'- icon: {build_link(i)}'
        else:
            final_content += f'- icon: {build_link(i)}\n\n'
        start_count += 1
    writefile(final_content)

def writefile(content):
    target_file = open("../information/missionIconLinks.md", "w")
    target_file.write(content)
    target_file.close()


def build_link(icon_name):
    icon_link_start = "https://rettungssimulator.online/images/marker/missions/"
    icon_link_end = "_0.png"
    return icon_link_start + icon_name + icon_link_end

def parse_json(json_data):
    json_resp = json_data.json()
    json_resp = json.dumps(json_resp, sort_keys=True, indent=4)
    json_resp = json.loads(json_resp)
    return json_resp

def filter_json(json_data):
    icon_link_list = []
    for i in json_data:
        icon_link = json_data[i]["icon"]
        if icon_link in icon_link_list:
            continue
        else:
            icon_link_list.append(icon_link)
    return icon_link_list

update()