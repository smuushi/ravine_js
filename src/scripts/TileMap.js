import Player from './Player'

import HitBox from './utils';

import EnvObject from './EnvObject'

import Consumable from './Consumable';
import Hitbox from './utils';
import Skeleton from './Skeleton'

class TileMap {
    
    constructor(tileSize) {
        this.tileSize = tileSize;


        this.paused = false;
        this.optionsToggle = false;


        this.grass = new Image();
        this.grass.src = "./src/graphics/sprites/tilesets/grass.png"
        this.water = new Image();
        this.water.src = './src/graphics/sprites/tilesets/water2.png'
        this.wro = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()]
        this.wro[0].src = './src/graphics/sprites/objects/rock_in_water_01.png'
        this.wro[1].src = './src/graphics/sprites/objects/rock_in_water_02.png'
        this.wro[2].src = './src/graphics/sprites/objects/rock_in_water_03.png'
        this.wro[3].src = './src/graphics/sprites/objects/rock_in_water_04.png'
        this.wro[4].src = './src/graphics/sprites/objects/rock_in_water_05.png'
        this.wro[5].src = './src/graphics/sprites/objects/rock_in_water_06.png'


        this.map1 = {0 :new Image(), 1: new Image(), 2: new Image(), 3: new Image(), 4: new Image(), 5: new Image()};
        this.map1[0].src = './src/graphics/maps/map1frame1.png'
        this.map1[1].src = './src/graphics/maps/map1frame2.png'
        this.map1[2].src = './src/graphics/maps/map1frame3.png'
        this.map1[3].src = './src/graphics/maps/map1frame4.png'
        this.map1[4].src = './src/graphics/maps/map1frame5.png'
        this.map1[5].src = './src/graphics/maps/map1frame6.png'

        this.room = new Image ();
        this.room.src = './src/graphics/maps/room3.png'

        this.isDoorOpen = false;

        this.doorClosed = new Image();
        this.doorClosed.src = './src/graphics/maps/doorclosed.png'

        this.doorOpen = new Image();
        this.doorOpen.src = './src/graphics/maps/dooropen.png'

        this.doorObj; // a door is assigned to it below in getObjects();
        
        

        this.objectsImage = new Image();
        this.objectsImage.src = './src/graphics/sprites/objects/objects.png'

        // because food should disappear after interacting with the player, 
        // I moved the food rendering to the foodUtils.js page.. and it'll just be another loop
        // that I call during my index rendering... omg so messy. haha
        // this.foodImage = new Image();
        // this.foodImage.src = "./src/graphics/NinjaAdventure/Items/Food/Fish.png"

        this.shakeFactor = 1;
        this.shakeStatus = false;
        this.shakeStatus2 = false;

        this.freeFood = 10;


        this.currentFrame = 0;
        this.framesDrawn = 0;

        this.level = 1;

        this.enemies = []

        //this.bedMenu is assigned in index because of poor file management... :(

    }

    
    
    // P = player
    theMap1 = [
        [' ',  ' ',  ' ',  ' ',  ' ','  ','BN','BN', 'BN','BN','BN','BN','  ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','Ta', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', '  ', 'Wr',  ' ', 'BN','BN','BN','BN', 'BN','BN','BN','BN','BN', ' ', ' ', ' ','  ', ' ', ' ', ' ', ' ','  ','BN','  ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', '  ', '  ',  ' ', 'BN','BN', ' ', 'P', 'Gc', ' ', ' ','BN','BN', 'Wr','  ','BN','  ','  ','  ','BN','BN','BN','  ','BN','BN','  ', ' ', ' ', ' ', ' '],
        [' ',  ' ',  ' ',  ' ', 'BN','Bd', ' ', ' ',  ' ', ' ', ' ','BN','BN','BN','BN', ' ','BN','BN','BN', ' ', ' ', ' ', ' ','  ', ' ','BN','BN', ' ', ' ', ' '],
        [' ',  ' ',  ' ',  ' ', 'BN', ' ', ' ', ' ',  ' ', ' ','BN','BN', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','Co', ' ', ' ','  ', ' ','BN','  ', ' ', ' '],
        [' ', 'Wr',  ' ', 'BN', 'BN','BN','BN','Dc', 'BN','BN','BN','BN', 'Co', ' ',' ','Co','Co', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ','  ','BN', ' ', ' '],
        [' ',  ' ', 'BN',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ','  ', ' ', ' ', ' ', ' ', ' ','BC','BC','BC','BC','BC', ' ', ' ','Co','  ','BN', ' ', ' '],
        [' ',  ' ', 'BN',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', 'Sk', ' ', ' ', ' ', ' ', ' ','BN', ' ','Wr', ' ','BN', ' ', ' ', ' ', ' ','BN', ' ', ' '],
        [' ',  ' ', 'BN',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BN', ' ', ' ', ' ','BN', ' ', ' ', ' ', ' ','BN', ' ', ' '],
        [' ',  ' ', 'BC',  ' ',  ' ', 'R1', 'R1', 'R1', 'R1','R2', ' ', ' ', ' ', 'Sk', ' ','Co', ' ', ' ','BN', ' ', ' ', ' ','BN', ' ','Co', ' ','BC','BN', ' ', ' '],
        [' ', 'BN',  ' ',  ' ',  ' ', ' ', 'Bu', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BC','BC','BC','BC','BC', ' ', ' ', ' ','BN', ' ', ' ', ' '],
        [' ', 'BN',  ' ', 'Co',  ' ', ' ', '', ' ',  ' ', ' ', ' ', ' ','Co', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BN', ' ', ' ', ' '],
        [' ', 'BN',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','Sk', ' ','BN', ' ','Wr', ' '],
        [' ', 'BN',  ' ', '  ', 'Co', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BN', ' ', ' '],
        [' ', 'BN', 'Co',  ' ',  ' ', ' ', ' ','BC', 'BC','BC', ' ', ' ', ' ', ' ','Co', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'Co','  ', ' ','  ','BN','  ', ' '],
        [' ', 'BN',  ' ',  ' ', ' ', ' ', ' ','BN', '  ','BN', ' ', ' ', ' ', ' ', ' ', ' ', ' ','Co', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'Co', ' ','BN', ' ', ' '],
        [' ', 'BN', 'BC',  ' ', ' ', ' ', ' ','BC', 'BC','BC', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','BN','BN','  '],
        [' ',  ' ', 'BN', 'BC', '  ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ','BC','BC','BC','BC','BC', ' ','Co', ' ','BC','BC','BC','BC','BC', 'Co', ' ','Sk','BN'],
        [' ',  ' ',  ' ',  ' ', 'BN','BN','BN','BN', 'BN','BN','BN','BN','BN','BN', ' ', ' ', ' ','BN','BN','BN','BN','BN', ' ', ' ', ' ','BN','BN','BN','BN','BN'],
        [' ',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','Wr', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ]

    draw(ctx) {
        // debugger
        // adding some more if then logic to render background map animations so that it
        // doesn't feel like we're on a floating landmass lmao.

                            this.framesDrawn = this.framesDrawn + Math.floor(Math.random()*10);
                            if (this.framesDrawn >= 45){
                                this.currentFrame++;
                                this.framesDrawn = 0;
                            }



        this._drawBaseMap(ctx); 
        this._drawRoom(ctx);

        for (let row = 0; row < this.theMap1.length; row++) {
            for (let col = 0; col < this.theMap1[row].length; col++) {
                let tile = this.theMap1[row][col];
                if (tile === 'P') {
                    // logic to denote what to render given the value in the theMap1 array.
                    // for now, just trying to render grass.. 
                    // this._drawGrass, but also render the player or something so that I can use a player to manip..
                    // this._drawGrass(ctx, col, row, this.tileSize);
                    // this.getPlayer()
                    // depreciated section.. player drawing handled in player file.
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
                
                } else if (tile === "Co") {   
                    // this._drawFood(ctx, col, row, this.tileSize)
                    // see notes above.
                }else if (tile === "Bd") {
                    this._drawObject(ctx, 176, 32, 16, 32, row*.94, col*.95, "Bd")
                
                } else if (tile === "Bu"){
                    this._drawObject(ctx, 49, 75, 46, 70, row*.85, col, "Bu")    
                } else {
                    // debugger
                    // this._drawGrass(ctx, col, row, this.tileSize);
                }
            }
        }
    }

    draw2(ctx) { // draw things here that need to be drawn after the player renders. 

        for (let row = 0; row < this.theMap1.length; row++) {
            for (let col = 0; col < this.theMap1[row].length; col++) {
                let tile = this.theMap1[row][col];

                if (tile === "Dc") {
                    this._drawDoor(ctx);
                }

            }
        }

    }

    _drawDoor (ctx) {
        if (this.isDoorOpen === false) {
            ctx.drawImage(this.doorClosed, 0 , 0);
            this._updateDoorHitbox();
            // console.log(this.doorObj)
        } else {
            ctx.drawImage(this.doorOpen, 0, 0);
            this._updateDoorHitbox();
        }

    }

    _updateDoorHitbox() {
        
        if (this.isDoorOpen === true) {
            this.doorObj.hitboxes.x = 0;
            this.doorObj.hitboxes.y = 0;
            
        } else {
            this.doorObj.hitboxes.x = 112;
            this.doorObj.hitboxes.y = 80;
        }
    }

    _drawRoom (ctx) {
        ctx.drawImage(this.room, 0,0)
    }

    _drawBaseMap (ctx) {
        
        let frameNum = this.currentFrame % 6

        ctx.drawImage(this.map1[frameNum], 0, 0)
    }

    _drawFood(ctx, col, row, size) {

        // ctx.drawImage(this.foodImage, col * this.tileSize, row *this.tileSize, size, size)
        // depreciated.. see note in constructor. 

    }

    _drawObject (ctx, srcX, srcY, cropSizeWidth, cropSizeHeight, row, col, tileType) {
        if (tileType === "Ta" && this.shakeStatus === true && (this.currentFrame % 3 === 0 || this.currentFrame % 10 === 0 || this.currentFrame % 11 === 0 || this.currentFrame % 12 === 0 || this.currentFrame % 13 === 0 || this.currentFrame % 14 === 0 || this.currentFrame % 13 === 0 || this.currentFrame % 15 === 0)){
            ctx.drawImage(this.objectsImage, srcX, srcY, cropSizeWidth - 1, cropSizeHeight, col*this.tileSize + (3-Math.floor(Math.random() * 10)/3), row*this.tileSize + Math.random(), cropSizeWidth, cropSizeHeight)
        } else if (tileType === "Bu" && this.shakeStatus2 === true) {
            ctx.drawImage(this.objectsImage, srcX, srcY, cropSizeWidth - 1, cropSizeHeight, col*this.tileSize + (3-Math.floor(Math.random() * 10)/3), row*this.tileSize + Math.random(), cropSizeWidth, cropSizeHeight)
        } else {
            ctx.drawImage(this.objectsImage, srcX, srcY, cropSizeWidth, cropSizeHeight, col*this.tileSize, row*this.tileSize, cropSizeWidth, cropSizeHeight)
        }
        // this.currentFrame;
    } // drawing a specific object needs to have a hardcoded srcX and srcY, and also a hard coded cropsize. 
      // specific drawing animations done here.... could maybe move this to the object instance,
      // but this would require an extra reorganization.. 

    _drawWater (ctx, srcX, srcY, col, row, size) {
        ctx.drawImage(this.water, srcX, srcY, size, size, col * this.tileSize, row * this.tileSize, size, size)
    }

    _drawWro (ctx, col, row, size) {
        let frameNum = this.currentFrame % 6;
        ctx.drawImage(this.wro[frameNum], col * this.tileSize, row *this.tileSize, size, size)
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

    getNextDayFoodObjects() {
        for (let row = 0; row < this.theMap1.length; row++) {
            for (let col = 0; col < this.theMap1[row].length; col++) {
                let tile = this.theMap1[row][col];
                if (tile === "Co"){
                    if (this.level > 10) {
                        this.spawn = 10;
                    } else {
                        this.spawn = this.level;
                    }

                    let rng = ((Math.floor(Math.random() * 100 )/ 3 ) + this.spawn)
                        if ((rng) <= (11)) {
                            let food = new Consumable(col * this.tileSize, row * this.tileSize, this.tileSize, 0, this, 6.5, 6.5, 0, 0, Math.floor(Math.random() * 1000))
                        } 
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
                    let rock = new EnvObject(col * this.tileSize, row * this.tileSize, this.tileSize - 3, 0, this, 1, 0)
                    objectsCollection.push(rock);

                } else if (tile === "Ta") {
                    let tree = new EnvObject(col * this.tileSize, row * this.tileSize, this.tileSize + 23, 0, this, 3, 8)
                    objectsCollection.push(tree);

                } else if (tile == "Bu") {
                    let tree = new EnvObject(col * this.tileSize, row * this.tileSize, this.tileSize + 23, 0, this, 3, -9)
                    objectsCollection.push(tree);
                } else if (tile === "Co") {
                    if (this.level > 10) {
                        this.spawn = 10;
                    } else {
                        this.spawn = this.level;
                    }

                    let rng = ((Math.floor(Math.random() * 100 )/ 3 ) + this.spawn)
                        if ((rng) <= (11)) {
                            let food = new Consumable(col * this.tileSize, row * this.tileSize, this.tileSize, 0, this, 6.5, 6.5, 0, 0, Math.floor(Math.random() * 1000))
                        } 

                } else if (tile === "Gc") {
                    let food = new Consumable(col * this.tileSize, row * this.tileSize, this.tileSize, 0, this, 6.5, 6.5, 0, 0, Math.floor(Math.random() * 1000))
            
                } else if (tile === "Dc") {
                    this.doorObj = new EnvObject(col * this.tileSize, row * this.tileSize, this.tileSize + 6, 0, this, -4, -2)
                } else if (tile === "Bd") {
                    let bed = new EnvObject(col * this.tileSize, row * this.tileSize, this.tileSize, 0, this, -4, -3)
                    
                } else if (tile === "Sk") {
                    this.enemies.push(new Skeleton (col *this.tileSize, row * this.tileSize, this.tileSize, 1, this))
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