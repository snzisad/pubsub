from turtle import position
import requests
from requests.structures import CaseInsensitiveDict
import numpy
import random
import json


#generate an ID for message
def id_geneartor():
    id_list = []
    id_list_ascii = []

    for i in range(994):
        n = random.randint(0, 1)
        id_list_ascii.append(n)
        if n == 1:
            id_list.append(n)
        else:
            id_list.append(-1)

    wholeset = ''.join([str(x) for x in id_list_ascii])
    id_ascii_letters = []

    for i in range(0,994,7):
        id_ascii_letters.append(int(wholeset[i:i+7], 2))

    return (id_list + [1,1,1,1,1,1], id_ascii_letters)


#divide msg into chunks
def refine_msg(msg, id):
    chunk_list = []
    result_list = []

    size = len(msg)
    chunk_num = int(size/142)
    pointer = 0
    print("Number of Chunks:", chunk_num + 1)

    for _ in range(chunk_num):
        chunk = msg[pointer:(pointer+142)]
        chunk = convert_to_bipolar(chunk) + [1 for _ in range(6)]
        chunk_list.append(chunk)
        pointer = pointer + 142

    remainder = convert_to_bipolar(msg[pointer:]) + [1 for _ in range(6)]
    fill_size = 1000 - len(remainder) - 6
    remainder = remainder + [1,1,1,1,1,1] + [-1 for _ in range(fill_size)]

    chunk_list.append(remainder)

    for item in chunk_list:
        result_list.append(encrypt_msg(item, id))

    return result_list


#converting data chunk to bipolar
def convert_to_bipolar(chunk):

    #converting to binary string
    chuck = list(chunk)
    # print(chunk)
    
    textVector = list(''.join(['{0:07b}'.format(ord(x)) for x in chunk]))
    #textVector = list(''.join(format(ord(x.encode('utf-8')), 'b') for x in chunk))
    
    #converting to int from binary
    textVectorBinary = [int(x) for x in textVector]
    
    #replacing 0s with -1
    textVectorBinary = [-1 if x == 0 else x for x in textVectorBinary]
    
    return textVectorBinary


#decrypting the data chunk
def encrypt_msg(chunk, id):
   
    prod_multip = numpy.multiply(chunk, id)
    prod_addition = prod_multip + id

    return list(prod_addition)


#Converting the ID to bipolar format
def refine_id(retrieved_id):
    id_string = ''.join(['{0:07b}'.format(x) for x in retrieved_id])
    # print(len(id_string))
    
    #converting to int from binary
    idVectorBinary = [int(x) for x in id_string]
    
    #replacing 0s with -1
    idVectorBinary = [-1 if x == 0 else x for x in idVectorBinary] + [1,1,1,1,1,1]
    # print(len(idVectorBinary))
    
    return idVectorBinary


# Sending the data to the server
def send(url, data):

    headers = CaseInsensitiveDict()
    headers["Content-Type"] = "application/x-www-form-urlencoded"


    get_url = "http://127.0.0.1:5001/get"
    
    first_chunk = data[:142]
    with open("./templates/ids.txt") as f:
        raw_data = f.readlines()
    
    # id_text = [15, 86, 4, 38, 64, 10, 112, 44, 72, 95, 107, 70, 2, 1, 16, 23, 110, 33, 97, 81, 100, 13, 81, 90, 32, 40, 117, 112, 15, 59, 99, 29, 108, 102, 107, 89, 19, 37, 46, 31, 51, 64, 58, 2, 23, 103, 123, 36, 72, 38, 33, 80, 118, 4, 122, 107, 62, 26, 0, 107, 4, 20, 116, 113, 23, 16, 8, 100, 36, 90, 43, 35, 29, 108, 69, 5, 44, 10, 107, 49, 111, 87, 67, 4, 93, 10, 104, 79, 127, 63, 31, 115, 97, 21, 3, 119, 47, 73, 25, 8, 55, 23, 10, 98, 51, 2, 51, 39, 94, 41, 6, 6, 90, 81, 72, 57, 28, 27, 64, 116, 40, 15, 52, 89, 13, 119, 87, 31, 35, 47, 49, 3, 26, 114, 43, 120, 55, 40, 70, 116, 94, 22]
    # id = refine_id(id_text)
    
    for position, line in enumerate(raw_data):
        x = requests.get(get_url, params = {"data": line}, headers=headers)
        x_text = x.text
        if first_chunk == x_text[:142]:
            id = refine_id(json.loads(line))
            msg = refine_msg(x_text+" "+data[142:], id)
            msg = str(msg)

            resp = requests.post(url, headers=headers, data="data=" + msg)

            return resp.content, ""
    
    # position = 11
    # id_text = [15, 86, 4, 38, 64, 10, 112, 44, 72, 95, 107, 70, 2, 1, 16, 23, 110, 33, 97, 81, 100, 13, 81, 90, 32, 40, 117, 112, 15, 59, 99, 29, 108, 102, 107, 89, 19, 37, 46, 31, 51, 64, 58, 2, 23, 103, 123, 36, 72, 38, 33, 80, 118, 4, 122, 107, 62, 26, 0, 107, 4, 20, 116, 113, 23, 16, 8, 100, 36, 90, 43, 35, 29, 108, 69, 5, 44, 10, 107, 49, 111, 87, 67, 4, 93, 10, 104, 79, 127, 63, 31, 115, 97, 21, 3, 119, 47, 73, 25, 8, 55, 23, 10, 98, 51, 2, 51, 39, 94, 41, 6, 6, 90, 81, 72, 57, 28, 27, 64, 116, 40, 15, 52, 89, 13, 119, 87, 31, 35, 47, 49, 3, 26, 114, 43, 120, 55, 40, 70, 116, 94, 22]
    # id = refine_id(id_text)
    # # msg = refine_msg(data, id)
    # msg = str(msg)

    id, id_text = id_geneartor()
    msg = refine_msg(data, id)
    msg = str(msg)
    resp = requests.post(url, headers=headers, data="data=" + msg)

    return resp.content, id_text
