# ravine_js

[Live Link](https://smuushi.github.io/ravine_js/)

In this pure javascript app, the user will be able to control a player that can move around in an environment. The goal is to survive as many days as possible on the map. Each day in the game, the player must collect more food and avoid the enemies.

This game aims to implement the principles of object oriented programming by creating an environment for the player to navigate through. The application uses the player position and status to decide what logic to use, resulting in multiple features that make the environment feel alive and interactive!

The gameplay and artstyle is inspired by 2D adventure type games, popular survival and exploration type games like the original Zelda and the board game Ravine. 

![alt text](https://github.com/smuushi/ravine_js/blob/main/md_asset/overview.png?raw=true)

# Engine and Functionality Overview:

Being a pure JS exercise, this meant limited use of external libraries to implement standard game necessities like an engine that will update and animate the objects. 

High-level-wise, the app is simply programmed to run a loop at an interval of 60 times per second. Learning how to navigate and develop a rudimentary engine like this was a valuable experience in that the challenge was to logically section off parts of the code based on the player's input and position. For instance, the player score needs to be drawn every loop, and therefore its rendering callback must be invoked after the tilemap is rendered. 

In this context, inserting and executing code in the correct sequence within the loop was vital for gameplay smoothness and functionality. There are more details below that further explain all the logic that the app calls 60 times a second.

![alt text](https://github.com/smuushi/ravine_js/blob/main/md_asset/Engine.png?raw=true)


## Functionalities:
- A controllable character
- Enemies
- Hitbox detection and collision
- A statistics tracker
- Interactive environment
- Dynamic options menu
- Input and interaction throttling
- Sprite Animations

### Player movement and interactivity
The player is able to use the arrow keys to move around and also interact with objects in the environment. 

![alt text](https://github.com/smuushi/ravine_js/blob/main/md_asset/interactiveenvironment.gif?raw=true)

Interactions include opening the door, attacking enemies, shaking a tree, collecting food, etc. 


### Enemies

- Movement Behavior:

The distance to the player dictates the enemy behavior. They are programmed to move randomly when in an "idle" status, but then chase the player when in an "aggro" status. The status is constantly updated based on the absolute distance to the player. In order to achieve this absolute distance in a 2D environment, the enemies utilize a simple a^2 + b^ = c^2 calculation.

```
_calcDistanceFromPlayer() {
        let dx = this.player.x - (this.x)
        let dy = this.player.y - (this.y)
        let distance = Math.sqrt((dx * dx) + (dy * dy))
        
        return distance
    }

```
This snippet of code is utilized as a callback for the enemy class whenever it moves it's x,y position so that it can change it's direction accordingly. 


### Hitboxes detections and collisions

Hitboxes were their own object class and tied to every entity as needed. Modifying the hitbox by the pixel was important for debugging, so implementing a way to visualize the hitboxes was done early in development. 


![alt text](https://github.com/smuushi/ravine_js/blob/main/md_asset/hitbox.gif?raw=true)



### Statistics tracker
    Navigating to the More Info section of the options menu also displays a section to keep track of player progress. It utilizes a function that goes into the browser's local storage to continuously grabe and update the value. 

![alt text](https://github.com/smuushi/ravine_js/blob/main/md_asset/stats.png?raw=true)  









- A controllable character that has collision detection and ways to interact with the environment -- Moving around a determined set environment with collision on the borders and certain environemntal objects like rocks and trees. 
- A random generation of useable environmental objects that the player can acquire like food that will keep the player alive.
- An interactive user interface to keep track of certain statistics like health and days survived. 
- An enemy entity that will try to seek out the player as the days progress.


## Regarding the controllable character: 
- Functionality should include moving around and a way to implement an attack with hitbox detection as well as srpite animations. 
- Additionally, there should be ways of interacting with environment objects like a chest or basket that will allow the player to acquire new items. ie. pressing the spacebar while in front of a chest will add items to the player's inventory. 

## Regarding enemies and progression:
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







