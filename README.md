# Full Stack Application

### Front End
- React
- next.js
- Typscript
- urql/Typeorm/Graphql
- GraphQL Code Generator
- chakra-ui
### Back End
- Node
- Redis
- Express/Express Session
- graphQL/Apollo Express server
- postgres
- tsc (to compile TS, this speeds up the app)

# Simple Donation application which lets you register/login and make donations. 

## How to run it
- In the root of the project enter **docker-compose up --build** (This is assuming, you already have docker setup on your system)
- Make sure no other container is running on port **3000** or **4000**. If so please stop them. Run **docker ps -a** to view all the running containers. Copy their ids and stop them one by one by running **docker stop container-id**. You can also run the followings commands to stop all the containers.
  - **docker stop $(docker ps -a -q)** //stop all containers
  - **docker rm $(docker ps -a -q)** //remove all containers
### Note:
It is notices that sometimes running **docker-compose up --build** gives an error. But if you run it again, it works fine (Still working on it to fix the problem)

## First Time Running the app
When you run the app first time, you will not see any data on the main page, You will have to register users and make donation to see data on the screen. (Work in progress to populated docker postgress with dummy data)
## Register
![image](https://user-images.githubusercontent.com/31515792/169682851-a599ef57-b44d-47df-ba17-2809ed6b11dc.png)
## Login
![image](https://user-images.githubusercontent.com/31515792/169682890-c491fc12-a57b-41e2-8893-401b2d970dc3.png)
## Make Donation
After registering/login click on *Donate Now* button on navbar
![image](https://user-images.githubusercontent.com/31515792/169682948-8cd13dd7-74fb-4be9-9d5d-423ebcd75969.png)
And make a donation
![image](https://user-images.githubusercontent.com/31515792/169682962-4b60c9e3-2230-4576-abfc-6012c717d0a2.png)
## View Donations
click on *View Donations* button to view all the donations. 
**If you are logged in, you will see your donations in purple color and will also be able to edit or delete your own donations**. Donations made by other users will be in **blue** color. 
![image](https://user-images.githubusercontent.com/31515792/169683098-81d40234-4ae8-4217-96e8-925a188c537f.png)
## Update Donation
By clicking on edit button, you can update the donation you made
![image](https://user-images.githubusercontent.com/31515792/169683381-4a5d5f83-6b69-496a-a888-c122db1c228d.png)
## Donatioin Detail
Click on Details button to see the details about the donation.
![image](https://user-images.githubusercontent.com/31515792/169683745-55f6f5be-9dee-4adb-8ef6-dcdda1a9cbd5.png)




