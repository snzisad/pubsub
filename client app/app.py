from flask import Flask, request, render_template, redirect


import json
from flask.helpers import url_for
import numpy as np
import encoder
import decoder
app = Flask(__name__)



host = "http://127.0.0.1:5000"

@app.route('/')
def index():
    # making list of pokemons
    lines =[]
    with open("./templates/ids.txt") as f:
        raw_data = f.readlines()

    for line in raw_data:
        lines.append(line)

    return render_template('index.html', total_ids = len(lines), lines = lines)

@app.route('/get', methods=['GET'])
def getData():
    idList = request.args.get('data')
    
    response = decoder.retrieve_data(host + "/sub", idList)

    if response == "No message found":
        return "No message found"

    if response == "Invalid ID":
        return "Invalid ID"
    
    print("Printing Response...")
    # print(response)
    print("----------------------")

    response_list = json.loads(response)
    print(response_list)

    try:
        id_refined = decoder.refine_id(json.loads(idList))
        # print(id_refined)
        org_msg = decoder.get_original_msg(response_list, id_refined)
        # print("Original Message..")
        print(org_msg)
        return org_msg
        
    except:
        return "No Corresponding ID found"

@app.route('/post', methods=['POST'])
def postData():

    data = request.form['data']
    print("Sending Data ...")
    response, id = encoder.send(host + '/pub', data)
    
    if len(id)>0:
            # Open a file with access mode 'a'
        with open("./templates/ids.txt", "a") as file_object:
            file_object.write(str(id) + '\n')


    return str(id)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
