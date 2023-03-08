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
const player = theTileMapInstance.getPlayer(2)


function gameLoop() { // layer draw calls to create layers
    theTileMapInstance.draw(ctx)
    // debugger
    player.animate(ctx)
    console.log("hello")
    player.move();
}

theTileMapInstance.setCanvasSize(canvas);

setInterval(gameLoop, 1000/75);