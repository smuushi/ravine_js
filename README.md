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

Movement Behavior:

The distance to the player dictates the enemy behavior. They are programmed to move randomly when in an "idle" status, but then chase the player when in an "aggro" status. The status is constantly updated based on the absolute distance to the player. In order to achieve this absolute distance in a 2D environment, the enemies utilize a simple a^2 + b^ = c^2 calculation.

```
_calcDistanceFromPlayer() {
        let dx = this.player.x - (this.x)
        let dy = this.player.y - (this.y)
        let distance = Math.sqrt((dx * dx) + (dy * dy))
        
        return distance
    }

move() {

    let distance = this._calcDistanceFromPlayer();
    if (distance < 45) {
        this.aggressionState = "aggro"
    } else {
        this.aggressionState = "idle"
    }
}

```
This snippet of code is utilized as a callback for the enemy class whenever it moves it's x,y position so that it can change it's direction accordingly. 


### Hitboxes detections and collisions

Hitboxes were their own object class and tied to every entity as needed. Modifying the hitbox by the pixel was important for debugging, so implementing a way to visualize the hitboxes was done early in development. 


![alt text](https://github.com/smuushi/ravine_js/blob/main/md_asset/hitbox.gif?raw=true)

The hitboxes have two main classes. Passable Hitboxes and Impassable Hitboxes. Passable Hitboxes were primarily used to dictate different behaviors and logic such as collecting and attacking. Impassable Hitboxes were mainly used for creating a border/boundary for the entities.  



### Statistics tracker

Navigating to the More Info section of the options menu also displays a section to keep track of player progress. It utilizes a function that goes into the browser's local storage to continuously grabe and update the value. 

![alt text](https://github.com/smuushi/ravine_js/blob/main/md_asset/stats.png?raw=true)  



### Environment

Key aspects of the environment were rendered and created based on a tile map system using a 2d array. 

```
theMap1 = [
        [' ',  ' ',  ' ',  ' ',  ' ','  ', 'BN', 'BN', 'BN','BN','BN','BN','  ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','Ta',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' '],
        [' ', '  ', 'Wr',  ' ', 'BN','BN', 'BN', 'BN', 'BN','BN','BN','BN','BN', ' ', ' ', ' ','  ', ' ', ' ', ' ', ' ','  ','BN',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' '],
        [' ', '  ', '  ',  ' ', 'BN','BN',  ' ',  'P', 'Gc', ' ','Ra','BN','BN','Wr','  ','BN','  ','  ','  ','BN','BN','BN','  ', 'BN', 'BN',  ' ',  ' ', ' ', ' ', ' '],
        [' ',  ' ',  ' ',  ' ', 'BN','Bd',  ' ',  ' ',  ' ', ' ', ' ','BN','BN','BN','BN', ' ','BN','BN','BN', ' ', ' ', ' ', ' ',  ' ',  ' ', 'BN', 'BN', ' ', ' ', ' '],
        [' ',  ' ',  ' ',  ' ', 'BN', ' ',  ' ',  ' ',  ' ', ' ', ' ','BN', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','Co', ' ',  ' ',  ' ',  ' ', 'BN','  ', ' ', ' '],
        [' ', 'Wr',  ' ', 'BN', 'BN','BN', 'BN', 'Dc', 'BN','BN','BN','BN','Co', ' ', ' ','Co','Co', ' ', ' ', ' ', ' ', ' ', ' ','Skt','Skt','Skt',  ' ','BN', ' ', ' '],
        [' ',  ' ', 'BN',  ' ',  ' ', ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ','  ', ' ', ' ', ' ', ' ', ' ','BC','BC','BC','BC','BC',  ' ',  ' ', 'Co',  ' ','BN', ' ', ' '],
        [' ',  ' ', 'BN',  ' ',  ' ', ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ','Sk', ' ', ' ', ' ', ' ', ' ','BN', ' ','Wr', ' ','BN',  ' ',  ' ',  ' ',  ' ','BN', ' ', ' '],
        [' ',  ' ', 'BN',  ' ',  ' ','Sk',  ' ',  ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BN', ' ', ' ', ' ','BN',  ' ',  ' ',  ' ',  ' ','BN', ' ', ' '],
        [' ',  ' ', 'BC',  ' ',  ' ','R1', 'R1', 'R1', 'R1','R2', ' ', ' ', ' ','Sk', ' ','Co', ' ', ' ','BN', ' ', ' ', ' ','BN',  ' ', 'Co',  ' ', 'BC','BN', ' ', ' '],
        [' ', 'BN',  ' ',  ' ',  ' ', ' ', 'Bu',  ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BC','BC','BC','BC','BC',  ' ',  ' ',  ' ', 'BN', ' ', ' ', ' '],
        [' ', 'BN',  ' ', 'Co',  ' ', ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ','Co', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',  ' ',  ' ',  ' ', 'BN', ' ', ' ', ' '],
        [' ', 'BN',  ' ',  ' ',  ' ', ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',  ' ', 'Sk',  ' ', 'BN', ' ','Wr', ' '],
        [' ', 'BN',  ' ', '  ', 'Co', ' ','Skt','Skt','Skt', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',  ' ',  ' ',  ' ',  ' ','BN', ' ', ' '],
        [' ', 'BN', 'Co',  ' ',  ' ', ' ',  ' ', 'BC', 'BC','BC', ' ', ' ', ' ', ' ','Co', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'Co',  ' ',  ' ',  ' ','BN','  ', ' '],
        [' ', 'BN',  ' ',  ' ', 'Sk', ' ',  ' ', 'BN', '  ','BN', ' ', ' ', ' ', ' ', ' ', ' ', ' ','Co', ' ', ' ', ' ', ' ', ' ',  ' ',  ' ', 'Co',  ' ','BN', ' ', ' '],
        [' ', 'BN', 'BC',  ' ',  ' ', ' ',  ' ', 'BC', 'BC','BC', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','Sk', ' ', ' ',  ' ',  ' ',  ' ',  ' ','BN','BN','  '],
        [' ',  ' ', 'BN', 'BC',  ' ', ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ', ' ','BC','BC','BC','BC','BC', ' ','Co', ' ','BC','BC', 'BC', 'BC', 'BC','SkG', ' ','Co','BN'],
        [' ',  ' ',  ' ',  ' ', 'BN','BN', 'BN', 'BN', 'BN','BN','BN','BN','BN','BN', ' ', ' ', ' ','BN','BN','BN','BN','BN', ' ',  ' ',  ' ', 'BN', 'BN','BN','BN','BN'],
        [' ',  ' ',  ' ',  ' ',  ' ', ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','Wr', ' ', ' ',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ']
    ]
```

The engine will iterate through each position only once in order to gather and create the necessary objects. This process is only done once per day cycle. Once the objects are created, then the engine will loop through the gathered objects instead of looping through the tile map array. 

### Menus

The approach to menu implementation used logic to determine what images to draw based on whether or not the game was paused by the player, as well as a modal with the HTML/CSS implementation to display futher less interactive information. 

For instance, muting the game or restarting the game is a dynamic feature and thus drawn inside the game logic. In contrast, the statistics section will always update whether or not the player asks and is therefore placed in the modal section of the menu. 

![alt text](https://github.com/smuushi/ravine_js/blob/main/md_asset/menus.gif?raw=true)  

### Throttling

In order to throttle player input and object interactivity, a quick flag was set to the objects when an interaction occurred. Utilizing JS's asynchronous capabilities here was important so that a time a could be set to reset the flag back to default. A simple setTimeout function worked well here. 

```
if (this.vulnerable === false) {
    return
} 

// Do an early return if invulnerable
// otherwise, execute below

    console.log('Skeleton Attacked by player');

    this.health--; 
    this.vulnerable = false;

    let binded_resetVuln = this._resetVuln.bind(this);
    setTimeout(binded_resetVuln, 1000)

// skeleton reset vulnerability called after 1 second. 
```

### Sprite Animations

Sprite animations were done by tracking keeping track of the object's current frame, and then using that number as an index to tell canvas where to start cropping from. It is possible to use a built in method called #request animation frame, but there was more control over each object's animation this way. 

```
this.framesDrawn++
        if (this.framesDrawn > 45) {
            this.currentFrame++
            this.framesDrawn = 0;
        }
```


## Implementation Timeline

Friday and weekend:
- Focus on creating the engine that most of the logic will interact with. This included a moving player class as well as the boundaries that the player will operate in. This necessitated producing a functional game loop and a collision detection system. 
- The food object class was also created during this time. 

Monday: 
- A way to progress to the next day and more environment details like a building for the player to spawn and rest in. 

Tuesday:
- Enemy programming. Skeletons that would spawn as well as inflict damage onto the player. 

Wednesday:
- Menu, UI creation and CSS polishing.

Thursday:
- README and deployment. 

(Sprite animations were done at each step along the way)


## Future features

There is a lot of room for future developments. One aspect is programming a smarter enemy AI that can pathfind to the player. There were attempts to implement various searching algorithms that were out of the scope of a 1 week pure JS project. Additional possible features also include a more robust acheivement/player progression tracking to track more than just # of enemies killed and days progressed. 















