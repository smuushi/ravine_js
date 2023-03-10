import TileMap from "./scripts/TileMap";
import Player from './scripts/Player';
import Hitbox from './scripts/utils';
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


const player = theTileMapInstance.getPlayer(1);

const envObjects = theTileMapInstance.getObjects();
console.log(player);
// debugger

const hitboxes = Hitbox.prototype.ALLHITBOXESMADE;

function gameRender() { // layer draw calls to create layers
    theTileMapInstance.draw(ctx)
    // debugger
    player.animate(ctx)
    // console.log("hello")
    player.move();

    
    //below lines will draw hitboxes.. comment them out to disable hitbox rendering
        player.hitbox._debugDraw(ctx)
        envObjects.forEach((obj) => obj.drawHitboxes(ctx));
    // console.log(hitboxes);
    Hitbox.updateCollisionStateToTrueIfColliding();
    
    


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

})