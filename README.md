# ravine_js

[Live Link](https://smuushi.github.io/ravine_js/)

In this pure javascript app, the user will be able to control a player that can move around in an environment. The goal is to survive as many days as possible on the map. Each day in the wildnerness, the map will spawn more enemies and resources that you have to collect in order to survive each day. 

Functionalities of the app include:
- A controllable character that has collision detection and ways to interact with the environment -- Moving around a determined set environment with collision on the borders and certain environemntal objects like rocks and trees. 
- A random generation of useable environmental objects that the player can acquire like food that will keep the player alive.
- An interactive user interface to keep track of certain statistics like health and days survived. 
- An enemy entity that will try to seek out the player as the days progress.


Regarding the controllable character: 
- Functionality should include moving around and a way to implement an attack with hitbox detection as well as srpite animations. 
- Additionally, there should be ways of interacting with environment objects like a chest or basket that will allow the player to acquire new items. ie. pressing the spacebar while in front of a chest will add items to the player's inventory. 

Regarding enemies and progression:
- As the days progress, more enemies with more health and more aggressive patterns will seek out the player, requiring more input from the player to avoid and handle them. At earlier stages, avoiding one enemy will be feasible, but as more enemies cover more spaces, the player will have to implement attacks in order to survive and gather food. 



###########

Implementation Timeline

Friday Afternoon and Weekend 
- establish player movement and collision detection.. ie. Player cannot move out of bounds and cannot move into a rock object.. 
- This will necessitate map rendering logic as well as creating the class skeletons for a moveable player and stationary objects. 

Monday 
- Implementing food aquisition and keep track of health. Creating a food object that the player can interact with and increase their hunger/health attribute. 

Tuesday 
- Implementing random generation of resources to pick up as well as a functionality to cycle days. 

Wednesday 
- Implementing enemy obstacles that will seek out the player. 

############

Basic Wireframe


![alt text](https://github.com/smuushi/ravine_js/blob/main/md_asset/wireframe.png?raw=true)



############

Class Structure 

- In order to keep track of all entities and functionality, this project will attempt to approach the design through an 'object oriented programming' philosophy. By keeping track of the various instances and how they interact and are related to each other, this should allow for a smoother development. 

- Players will interact with environmental objects like rocks as well as other entities like enemies. Player, EnvObjects, Enemy. 
- All three of these classes will be constructed, rendered, and interact in environemnt of the tilemap. 
- When needed, these classes will pull common functionality like movement and hitbox collision from the utilities section that is outside of the tilemap. 


Basic Class Structure Wireframe

![alt text](https://github.com/smuushi/ravine_js/blob/main/md_asset/classwireframe.png?raw=true)







