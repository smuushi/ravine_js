import Player from './Player'

import HitBox from './utils';

import EnvObject from './EnvObject'

class TileMap {
    
    constructor(tileSize) {
        this.tileSize = tileSize;


        this.grass = new Image();
        this.grass.src = "./src/graphics/sprites/tilesets/grass.png"
        this.water = new Image();
        this.water.src = './src/graphics/sprites/tilesets/water2.png'
        this.wro = new Image();
        this.wro.src = './src/graphics/sprites/objects/rock_in_water_01.png'

        this.map1 = new Image();
        this.map1.src = './src/graphics/maps/map1frame1.png'

        this.objectsImage = new Image();
        this.objectsImage.src = './src/graphics/sprites/objects/objects.png'

        this.shakeFactor = 1;
        this.shakeStatus = false;

        this.currentFrame = 0;
        
    }

    
    
    // P = player
    theMap1 = [
        [' ',  ' ',  ' ',  ' ',  ' ','  ','BN','BN', 'BN','BN','BN','BN','  ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','Ta', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', '  ', 'Wr',  ' ', 'BN','BN', ' ', ' ',  ' ', ' ', ' ', ' ','BN', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','  ','BN','  ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', '  ', '  ',  ' ', 'BN', ' ', ' ', ' ',  ' ', ' ', ' ', ' ','BN', ' ','  ','BN','  ', ' ','  ','BN','BN','BN','  ','BN','BN','  ', ' ', ' ', ' ', ' '],
        [' ',  ' ',  ' ',  ' ', 'BN', ' ', ' ', ' ',  ' ', ' ', ' ', ' ','BN','BN','BN', ' ','BN','BN','BN', ' ', ' ', ' ', ' ','  ', ' ','BN','BN', ' ', ' ', ' '],
        [' ',  ' ',  ' ',  ' ', 'BN', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','  ', ' ','BN','  ', ' ', ' '],
        [' ',  ' ',  ' ', 'BN',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','  ','BN', ' ', ' '],
        [' ',  ' ', 'BN',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ','  ', ' ', ' ', ' ', ' ', ' ','BC','BC','BC','BC','BC', ' ', ' ', ' ','  ','BN', ' ', ' '],
        [' ',  ' ', 'BN',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BN', ' ', ' ', ' ','BN', ' ', ' ', ' ', ' ','BN', ' ', ' '],
        [' ',  ' ', 'BN',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BN', ' ', ' ', ' ','BN', ' ', ' ', ' ', ' ','BN', ' ', ' '],
        [' ',  ' ', 'BC',  'P',  ' ', ' ', ' ', ' ', 'R1','R2', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BN', ' ', ' ', ' ','BN', ' ', ' ', ' ','BC','BN', ' ', ' '],
        [' ', 'BN',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BC','BC','BC','BC','BC', ' ', ' ', ' ','BN', ' ', ' ', ' '],
        [' ', 'BN',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BN', ' ', ' ', ' '],
        [' ', 'BN',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BN', ' ', ' ', ' '],
        [' ', 'BN',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ','BN', ' ', ' '],
        [' ', 'BN',  ' ',  ' ',  ' ', ' ', ' ','BC', 'BC','BC', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','  ', ' ', ' ','BN', ' ', ' '],
        [' ', 'BN',  ' ',  ' ',  ' ', ' ', ' ','BN', '  ','BN', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BN', ' ', ' '],
        [' ', 'BN', 'BC',  ' ',  ' ', ' ', ' ','BC', 'BC','BC', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BN','BN','  '],
        [' ',  ' ', 'BN', 'BC', '  ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ','BC','BC','BC','BC','BC', ' ', ' ', ' ','BC','BC','BC','BC','BC', ' ', ' ', ' ','BN'],
        [' ',  ' ',  ' ',  ' ', 'BN','BN','BN','BN', 'BN','BN','BN','BN','BN','BN', ' ', ' ', ' ','BN','BN','BN','BN','BN', ' ', ' ', ' ','BN','BN','BN','BN','BN'],
        [' ',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ]

    draw(ctx) {
        // debugger

        this._drawBaseMap(ctx);

        for (let row = 0; row < this.theMap1.length; row++) {
            for (let col = 0; col < this.theMap1[row].length; col++) {
                let tile = this.theMap1[row][col];
                if (tile === 'P') {
                    // logic to denote what to render given the value in the theMap1 array.
                    // for now, just trying to render grass.. 
                    // this._drawGrass, but also render the player or something so that I can use a player to manip..
                    this._drawGrass(ctx, col, row, this.tileSize);
                    // this.getPlayer()
                } else if(tile === 'BN'){

                    // RENDER BOUNDARY HITBOX HERE
                    // depreciated code logic... hitboxes will be in .getObjects() below.
                  
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
                } else if (tile === "R2") {
                    this._drawObject(ctx, 16, 16, 16, 16, row, col);
                } else if (tile === "R1") {
                    this._drawObject(ctx, 0, 16, 16, 16, row, col)
                } else if (tile === "Ta") {
                    this._drawObject(ctx, 50, 146, 47, 64, row, col, tile)  
                } else {
                    // debugger
                    // this._drawGrass(ctx, col, row, this.tileSize);
                }
            }
        }
    }

    _drawBaseMap (ctx) {
        ctx.drawImage(this.map1, 0, 0)
    }

    _drawObject (ctx, srcX, srcY, cropSizeWidth, cropSizeHeight, row, col, tileType) {
        if (tileType === "Ta" && this.shakeStatus === true && (this.currentFrame % 3 === 0 || this.currentFrame % 10 === 0 || this.currentFrame % 11 === 0 || this.currentFrame % 12 === 0 || this.currentFrame % 13 === 0 || this.currentFrame % 14 === 0 || this.currentFrame % 13 === 0 || this.currentFrame % 15 === 0)){
            ctx.drawImage(this.objectsImage, srcX, srcY, cropSizeWidth - 1, cropSizeHeight, col*this.tileSize + (3-Math.floor(Math.random() * 10)/3), row*this.tileSize + Math.random(), cropSizeWidth, cropSizeHeight)
        } else {
            ctx.drawImage(this.objectsImage, srcX, srcY, cropSizeWidth, cropSizeHeight, col*this.tileSize, row*this.tileSize, cropSizeWidth, cropSizeHeight)
        }
        this.currentFrame++;
    } // drawing a specific object needs to have a hardcoded srcX and srcY, and also a hard coded cropsize. 
      // specific drawing animations done here.... could maybe move this to the object instance,
      // but this would require an extra reorganization.. 

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
        for (let row = 0; row < this.theMap1.length; row++) {
            for (let col = 0; col < this.theMap1[row].length; col++) {
                let tile = this.theMap1[row][col];
                if (tile === "P") {
                    return new Player(col *this.tileSize, row * this.tileSize, this.tileSize, velocity, this)
                }
            }
        }

    }

    getObjects() {
        let objectsCollection = [];
        for (let row = 0; row < this.theMap1.length; row++) {
            for (let col = 0; col < this.theMap1[row].length; col++) {
                let tile = this.theMap1[row][col];
                if (tile === "Wr") {
                    let rock = new EnvObject(col * this.tileSize, row * this.tileSize, this.tileSize, 0, this, 0, -3)
                    objectsCollection.push(rock);
                    // console.log(objectsCollection)
                } else if (tile === 'BN'){
                    // render border hitbox here
                    let invisBoundary = new EnvObject(col * this.tileSize, row * this.tileSize, this.tileSize - 6, 0, this, 3);
                    objectsCollection.push(invisBoundary);
                    // console.log(objectsCollection)
                } else if (tile === 'BC'){
                    let invisBoundary = new EnvObject(col * this.tileSize, row * this.tileSize - 6, this.tileSize - 10, 0, this, 5, 5);
                    objectsCollection.push(invisBoundary);
                } else if (tile === "R2" || tile === "R1"){
                    let rock = new EnvObject(col * this.tileSize, row * this.tileSize, this.tileSize, 0, this, 0, -3)
                    objectsCollection.push(rock);

                } else if (tile === "Ta") {
                    let tree = new EnvObject(col * this.tileSize, row * this.tileSize, this.tileSize + 23, 0, this, 3, 8)
                    objectsCollection.push(tree);
                }

                
            }
        }
        return objectsCollection;
    }

    setCanvasSize(canvas) {
        canvas.width = (this.theMap1[0].length * this.tileSize);
        canvas.height = (this.theMap1.length * this.tileSize);
    }



}



export default TileMap;