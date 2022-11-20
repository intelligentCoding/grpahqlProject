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

# Simple application that keep tracks of customer fruits preferences for surprise bucket of the month. 

## How to run it
- In the root of the project enter **docker-compose up --build** (This is assuming, you already have docker setup on your system)
- Make sure no other container is running on port **3000** or **4000**. If so please stop them. Run **docker ps -a** to view all the running containers. Copy their ids and stop them one by one by running **docker stop container-id**. You can also run the followings commands to stop all the containers.
  - **docker stop $(docker ps -a -q)** //stop all containers
  - **docker rm $(docker ps -a -q)** //remove all containers
### Note:
It is notices that sometimes running **docker-compose up --build** gives an error. But if you run it again, it works fine (Still working on it to fix the problem)

## First Time Running the app
When you run the app first time, you will not see any data on the main page, You will have to register users and make donation to see data on the screen. (Work in progress to populated docker postgress with dummy data)

## Accounts
There are few accoutns created for you to use. 
UserName: acerta1 acerta2 acertaAdmin
password: acerta

## Validation:
- Admin can add new fruits but not the fruits already added.
- When adding preference for each fruit, it can not be less the lower limit or more the upper limit.
- When adding preference the fruit drop down only shows the fruits that has not been added that particular user
- Similary, when editing the **upper** and **lower** limit for users, it will give an error if total preferred limit is esceeded. 
For example, if user **A** has:
Min 2  and Maximum 5 apples, you can not edit the lower limit to 1. 






