console.log('hellos from index')
import TileMap from "./TileMap.js"
import Player from './Player.js'

// game info so far... 
// map size will be 30 x 20 squares. 
// tile size 16 x 16 pixels also. 

const canvas = document.getElementById('game-canvas'); // gathered my html elements that I will be working in. 
const ctx = canvas.getContext('2d'); // all rendering takes place on the ctx. 

const tileSize = 16;
const theTileMapInstance = new TileMap(tileSize);


const player = theTileMapInstance.getPlayer(1);

const envObjects = theTileMapInstance.getObjects();
console.log(envObjects);
// debugger


function gameRender() { // layer draw calls to create layers
    theTileMapInstance.draw(ctx)
    // debugger
    player.animate(ctx)
    // console.log("hello")
    player.move();
    envObjects.forEach((obj) => obj.drawHitboxes(ctx));
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