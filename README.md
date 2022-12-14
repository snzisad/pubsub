# Pubsub System
Mini project of Network Programming and Distributed Applications course developed by:
* Sharif Noor Zisad
* Muiz Olalekan Raheem
* Md Sakibul Islam
* Md Asif M Siddique

## Introduction
In this project, the goal was to design and implement a distributed networking system with a special kind of Pub-Sub functionality. From the scenario given, the project implements a scalable system that accommodates many clients to anonymously communicate over the network.

## System Components
The proposed system has:
* A Client - Sender and Receiver
* Anonymous Server
* Message
* Auto-Associative Table

![image](https://user-images.githubusercontent.com/20601466/197797631-0ebcc899-324c-49ba-89bc-a4228f485e59.png)

## System Architecture
The proposed system architecture is as shown in the figure below.
![image](https://user-images.githubusercontent.com/20601466/197798208-204b100d-b131-4e32-a7c2-479665687107.png)

## Server Architecture
The anonymous server acts as a central broker server between the client sender and client receiver.
![image](https://user-images.githubusercontent.com/20601466/197798837-86b94cdb-9294-4182-9c04-1c58c1624796.png)

## Client Sender
![image](https://user-images.githubusercontent.com/20601466/197799239-29c6a7b4-618f-4a21-8618-63971929a45c.png)

## Client Receiver
![image](https://user-images.githubusercontent.com/20601466/197799465-6faecf0f-b34b-45ed-8164-f1f48719805b.png)

## Encryption & Decryption Format

![image](https://user-images.githubusercontent.com/20601466/197799771-391e323d-657e-4b60-8057-450844eeb336.png)



## Screenshots
![Screenshot from 2022-10-23 08-31-24](https://user-images.githubusercontent.com/20601466/197793297-e5338d9a-c22c-429e-baa6-3aeb9fab3445.png)
Homepage

![Screenshot from 2022-10-23 08-31-35](https://user-images.githubusercontent.com/20601466/197801397-1f6ad277-2339-4bf7-bf4b-6a588fb78e09.png)
List of encrypted messages on the system

![Screenshot from 2022-10-23 08-32-22](https://user-images.githubusercontent.com/20601466/197801716-cbcc3b2b-957c-4d2f-9063-795c0e10bc0b.png)
![Screenshot from 2022-10-23 08-32-44_modified](https://user-images.githubusercontent.com/20601466/197802108-770d2643-9f52-40b5-9b54-ecd4659c2c79.png)
Writing messages to the client receiver

