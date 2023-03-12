import TileMap from "./scripts/TileMap";
import Player from './scripts/Player';
import Hitbox from './scripts/utils';

import PassableHitbox from "./scripts/foodUtils";
import Consumable from "./scripts/Consumable";
import EnvObject from "./scripts/EnvObject";

document.addEventListener("DOMContentLoaded", () => { // waiting for stuff to load first. lmao


    console.log('hello world')
    console.log('hellos from index')

// game info so far... 
// map size will be 30 x 20 squares. 
// tile size 16 x 16 pixels also. 

const canvas = document.getElementById('game-canvas'); // gathered my html elements that I will be working in. 
const ctx = canvas.getContext('2d'); // all rendering takes place on the ctx. 

const tileSize = 16;
const theTileMapInstance = new TileMap(tileSize);


const player = theTileMapInstance.getPlayer(1.13);

const envObjects = theTileMapInstance.getObjects();
console.log(player);
// debugger


// if (!EnvObject.prototype.INTERACTIVEITEMS){
const foodItems = EnvObject.prototype.INTERACTIVEITEMS;
// }
            

const hitboxes = Hitbox.prototype.ALLHITBOXESMADE;
const passableHitboxes = PassableHitbox.prototype.PASSABLEHITBOXES;

function gameRender() { // layer draw calls to create layers
    theTileMapInstance.draw(ctx)

    foodItems.forEach((food) => food._drawFood(ctx));

    // debugger
    player.animate(ctx)
    // console.log("hello")
    player.move(ctx);

    theTileMapInstance.draw2(ctx);




    // envObjects.forEach((obj) => obj.drawHitboxes(ctx));
    
    //below lines will draw hitboxes.. comment them out to disable hitbox rendering
        // player.hitbox._debugDraw(ctx)
        // hitboxes.forEach((box) => box._debugDraw(ctx));
        // passableHitboxes.forEach((box) => box._debugDraww(ctx));

    // console.log(hitboxes);
    Hitbox.updateCollisionStateToTrueIfColliding();
    PassableHitbox.updateDetectionStateToTrueIfDetecting();
    
    
    


}

theTileMapInstance.setCanvasSize(canvas);

setInterval(gameRender, 1000/75);

// order logic =>

// TileMap.js handles rendering logic. 
// hitboxes handles collision detection only!
// each class will have their own move() function which will handle collision logic and what to do.
// separate player class. with a hitbox instance tied on an attribute. 
// separate envionmental objects class. with a hitbox also tied. 
// 

// to do list: 
// write out hitbox collision detection logic and refactor player.move() code to account. 
// current problem is that in order to update collision, I need to iterate through all combinations of 
// hitboxes... so I need to find a way of collecting them as they're created... 
// look up a way of exporting an updatable class constant that I can use in the gameRender callback.

// above done by the end of Friday!


// next to do list.. 
// create a food item that will render and place itself based on the tilemap.. 
// after creating the note below, I will also extend this food item from the env objects class. 
// we'll call it 'consumable'
//
// create a new day functionality.. 
// ^ will necessitate a rendering and processing of an object that will allow the player to sleep. 
// ^ will not sure if this will be a custom environmental object.. maybe I can do that by extending the class. 

// food was done!... and picking up the food is tracking well... 
// I just need to add the new day functionality now. 
// I added a space to better contextualize where things will go.. So I added a room. 
// Going to add a bed that will result in a menu prompt that will go to the next day and let the player spend their
// collected surplus food on upgrades to speed, health, luck, and attacking. 

})

