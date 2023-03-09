import Player from './Player.js'

import HitBox from './utils.js';

import EnvObject from './EnvObject.js'

class TileMap {
    
    constructor(tileSize) {
        this.tileSize = tileSize;
        this.grass = new Image();
        this.grass.src = "./src/graphics/sprites/tilesets/grass.png"
        this.water = new Image();
        this.water.src = './src/graphics/sprites/tilesets/water2.png'
        this.wro = new Image();
        this.wro.src = './src/graphics/sprites/objects/rock_in_water_01.png'
    }

    
    
    // P = player
    theMap = [
        ['W',  'W',  'W',  'W',  'W', 'W', 'W', 'W',  'W', 'W', 'W', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W', 'M2', 'M1',  'W', 'Wr', 'W', 'W', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W', 'M3', 'M4',  'W',  'W', 'W', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  'W',  'W',  'W',  'W', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  'W',  'W', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  'W', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  'P',  ' ',  ' ', ' ', ' ', ' ', 'Wr', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['W',  'W',  'W',  'W',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ]

    draw(ctx) {
        // debugger
        for (let row = 0; row < this.theMap.length; row++) {
            for (let col = 0; col < this.theMap[row].length; col++) {
                let tile = this.theMap[row][col];
                if (tile === 'P') {
                    // logic to denote what to render given the value in the theMap array.
                    // for now, just trying to render grass.. 
                    // this._drawGrass, but also render the player or something so that I can use a player to manip..
                    this._drawGrass(ctx, col, row, this.tileSize);
                    // this.getPlayer()
                } else if (tile === "W") {
                    this._drawWater(ctx, 25, 20, col, row, this.tileSize);
                } else if (tile === "M1") {
                    this._drawWater(ctx, 80, 0, col, row, this.tileSize); // top right corner!!
                } else if (tile === "M2") {
                    this._drawWater(ctx, 64 ,0, col, row, this.tileSize); //
                
                } else if (tile === "M3") {
                    this._drawWater(ctx, 64, 16, col, row, this.tileSize);
                    
                } else if (tile === "M4") {
                    this._drawWater(ctx, 80, 16, col, row, this.tileSize);
                } else if (tile === "Wr") {    
                    this._drawWro(ctx, col, row, this.tileSize);
                } else {
                    // debugger
                    this._drawGrass(ctx, col, row, this.tileSize);
                }
            }
        }
    }

    _drawWater (ctx, srcX, srcY, col, row, size) {
        ctx.drawImage(this.water, srcX, srcY, size, size, col * this.tileSize, row * this.tileSize, size, size)
    }

    _drawWro (ctx, col, row, size) {
        ctx.drawImage(this.wro, col * this.tileSize, row *this.tileSize, size, size)
    }

    _drawGrass (ctx, col, row, size) {
        ctx.drawImage(this.grass, col * this.tileSize, row *this.tileSize, size, size)
    }

    getPlayer(velocity) {
        for (let row = 0; row < this.theMap.length; row++) {
            for (let col = 0; col < this.theMap[row].length; col++) {
                let tile = this.theMap[row][col];
                if (tile === "P") {
                    return new Player(col *this.tileSize, row * this.tileSize, this.tileSize, velocity, this)
                }
            }
        }

    }

    getObjects() {
        let objectsCollection = [];
        for (let row = 0; row < this.theMap.length; row++) {
            for (let col = 0; col < this.theMap[row].length; col++) {
                let tile = this.theMap[row][col];
                if (tile === "Wr") {
                    let rock = new EnvObject(col * this.tileSize, row * this.tileSize, this.tileSize, 0, this)
                    objectsCollection.push(rock);
                    console.log(objectsCollection)
                }
            }
        }
        return objectsCollection;
    }

    setCanvasSize(canvas) {
        canvas.width = (this.theMap[0].length * this.tileSize);
        canvas.height = (this.theMap.length * this.tileSize);
    }



}



export default TileMap;