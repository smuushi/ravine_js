const DIRS = [ // directions made here to refer to. 
    [0, -1],
    [0, 1],
    [1, 0],
    [-1,0]
]

import Hitbox from "./utils.js";
import PassableHitbox from "./foodUtils.js";

class Player {
    
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x; 
        this.y = y;
        this.tileSize = tileSize; 
        this.velocity = velocity;
        this.tileMap = tileMap;
        
        // const spriteCols = 10;
        // const spriteRows = 6;
        // const totalFrames = 6

        this.currentFrame = 0;
        this.framesDrawn = 0;

        this.playerImage = new Image ();
        this.playerImage.src = "./src/graphics/sprites/characters/player.png" // idk how to use sprite sheets.. so I used the rock... 
        // this.playerImage.src = '../graphics/sprites/objects/rock_in_water_01.png'

        this.dust = new Image();
        this.dust.src = './src/graphics/sprites/particles/dust_particles_01.png'
        
        this.currentMovingDirection = null;

        document.addEventListener('keydown', this._keydown) // 
        document.addEventListener('keyup', this._keyup) // listener to set player current moving direction to null if they let go of a direction.

        // this.currentFrame = 0; // why is there a duplicate here??? idk lmaoo 

        this.lastMovingDirection;

        this.hitbox = new Hitbox(this.x, this.y, this.tileSize -4, this.tileSize, 1.5, -4)

        this.passableHitbox = new PassableHitbox(this.x, this.y, this.tileSize -4, this.tileSize, this, 1.5, -4)

        if (!Player.prototype.keyss){
            Player.prototype.keyss = {}
        }

        // logic is... the player needs to collect 5 food each day
        // if he doesn't, he will die.
        // colliding with a food increases this.food by one and 
        // also destroys the food on the map.. 
        // at the end of the day, the player spend the extra food they pick up
        // to gain an ability to attack, increase speed, increase health.. 
        // gaining extra stats require more food per day. 
        // shaking trees make monsters more aggressive, but also drops more food.

        this.targetFood = 5; 
        this.food = 0;

        this.health = 3;


    }

    

    animate(ctx) {
        //288 x 480
        // requestAnimationFrame(animate)

        // currentFrame = this.currentFrame % totalFrames;

        let srcX = this.currentFrame * 48 % 288;
        let srcY;

        // switch(srcY) {
        if (this.currentMovingDirection === DIRS[2]){ // right
            srcY = 208;
        } else if (this.currentMovingDirection === DIRS[0]){ // up
            srcY = 255;
        } else if (this.currentMovingDirection === DIRS[1]){ // down
            srcY = 158;
        } else if (this.currentMovingDirection === DIRS[3]){ // left
            srcY = 208;  
            srcX = (this.currentFrame * 48 % 288) * 1
        } else {
            if (this.lastMovingDirection === DIRS[2]){        // right idle
                srcY = 64;
            } else if (this.lastMovingDirection === DIRS[0]){ // up idle
                srcY = 110;
            } else if (this.lastMovingDirection === DIRS[3]){ // left idle... same as right idle lmao
                srcY = 64;
            } else {                                          // down idle
                srcY = 16;
            }
        }

        // really ugly code to mirror the right animation run.. :T
        if (this.currentMovingDirection === DIRS[3]) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, Math.floor(-this.x + 1), Math.floor(this.y -15), -32, 32)
            ctx.restore();
        } else if (this.currentMovingDirection === null && this.lastMovingDirection === DIRS[3]) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, Math.floor(-this.x), Math.floor(this.y -15), -32, 32)
            ctx.restore();
        } else { 
            // ctx.save()
            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, Math.floor(this.x -17), Math.floor(this.y -15), 32, 32)
            // ctx.restore()
        }    
        
        
        this.framesDrawn++;
        if (this.framesDrawn >= 12){
            this.currentFrame++;
            this.framesDrawn = 0;
        }

        
 
    }



    _keydown = (event) => {
        // debugger 
        // console.log(event)
        if (!Player.prototype.keyss[event.code]) {
            Player.prototype.keyss[event.code] = event.code;
            console.log(Player.prototype.keyss[event.code])
        }

        if (event.key === 'ArrowUp'){
            this.currentMovingDirection = DIRS[0];
        } else if (event.key === 'ArrowDown'){
            this.currentMovingDirection = DIRS[1];
        } else if (event.key === 'ArrowLeft'){
            this.currentMovingDirection = DIRS[3];
        } else if (event.key === 'ArrowRight'){
            this.currentMovingDirection = DIRS[2];
        }
        // console.log('down')

        // while (!!this.currentMovingDirection) {

        // debugger
        if (event.key === ' ' && (this.x > 347 && this.x < 390 && this.y < 70 && this.y > 50)){
            this.tileMap.shakeStatus = true;
            setTimeout(() => this.tileMap.shakeStatus = false, 300)
        } else if (event.key === ' ' && (this.x > 110 && this.x < 125 && this.y < 110 && this.y > 55)){
            

            if (this.tileMap.isDoorOpen === false){
                this.tileMap.isDoorOpen = true;
            } 

            // if (this.tileMap.isDoorOpen === true) {
            //     this.tileMap.isDoorOpen = false;
                
            //     this.tileMap._updateDoorHitbox()
            //     // let papaya = this.tileMap._updateDoorHitbox.bind(this.tileMap)
            //     // setTimeout(papaya, 50000)

            //     Hitbox.updateCollisionStateToTrueIfColliding();
            //     // debugger
            //     if (this.hitbox.collisionState === true){
            
            //         this.tileMap.isDoorOpen = true;
            //     } 



            // } else {
            //     this.tileMap.isDoorOpen = true;
            // }
            
        }
        
    }

    _keyup = (event) => {
        Player.prototype.keyss[event.code] = null;
        // debugger
        if (event.code === 'Space') {
            if (this.tileMap.shakeStatus === true) {
                this.tileMap.shakeStatus = false;
            }
        } else {

            console.log('key was let go')
            // console.log('up')
            // this.lastLastMovingDirectionLmao = this.lastMovingDirection; // this doesn't work lol
            // note here.. attempting to make movement more fluid.. 

            // if (!!this.currentMovingDirection){
                this.lastMovingDirection = this.currentMovingDirection;
            // }
            
            
                this.currentMovingDirection = null;
            

            if (Object.values(Player.prototype.keyss).some((val) => !!val)){
                
                let stillHeldKey;
                Object.values(Player.prototype.keyss).forEach((value) => {
                    if (!!value) {
                        stillHeldKey = value
                    }
                })
                // console.log(stillHeldKey)

                if (stillHeldKey === 'ArrowUp'){
                    this.currentMovingDirection = DIRS[0];
                } else if ((stillHeldKey) === 'ArrowDown'){
                    this.currentMovingDirection = DIRS[1];
                } else if ((stillHeldKey)=== 'ArrowLeft'){
                    this.currentMovingDirection = DIRS[3];
                } else if ((stillHeldKey) === 'ArrowRight'){
                    // debugger
                    this.currentMovingDirection = DIRS[2];
                }

                // console.log(this.currentMovingDirection)
            }
        }

    }

    

    _drawDust(ctx) {
        // ctx.drawImage(this)
        console.log(ctx)

        ctx.drawImage(this.dust, this.x + 1, this.y -15)
        // wanted to implement a dust particle effect while moving... but too much work for nothing..
        // need to focus more on functionality at this beginning state.. Can come back later maybe. 

    }



    move(ctx) { // move takes in a context to call movement specific additional drawings like dust particles. 

        if (this.passableHitbox.detectionState === true) {
            // debugger
            this._isCollidingWithFood();
        }
        

        if (Object.values(Player.prototype.keyss).some((val) => !!val) ){

            if (!!this.currentMovingDirection){

                
                // let oldX = this.x;
                // let oldY = this.y;
                
                this.y = this.currentMovingDirection[1]* this.velocity + this.y; 
                this.x = this.currentMovingDirection[0]* this.velocity + this.x;
                this.hitbox.x = this.x;
                this.hitbox.y = this.y;
                this.passableHitbox.x = this.x;
                this.passableHitbox.y = this.y;
                Hitbox.updateCollisionStateToTrueIfColliding()
                
                while (this.hitbox.collisionState === true) {
                    // debugger
                    this.y = this.currentMovingDirection[1]*(-1)* this.velocity + this.y; 
                    this.x = this.currentMovingDirection[0]*(-1)* this.velocity + this.x;
                    this.hitbox.x = this.x;
                    this.hitbox.y = this.y;
                    this.passableHitbox.x = this.x;
                    this.passableHitbox.y = this.y;
                    Hitbox.updateCollisionStateToTrueIfColliding();

                    // debugger
                    return
                }

                // this._drawDust(ctx); // see note in _drawDust.

                // if (this.hitbox.collisionState === true) {
                //     // debugger
                //     this.y = this.currentMovingDirection[1]*(-1)* this.velocity + this.y; 
                //     this.x = this.currentMovingDirection[0]*(-1)* this.velocity + this.x;
                //     this.hitbox.x = this.x;
                //     this.hitbox.y = this.y;
                //     // debugger
                // }


            }

            if (!(this.x > 90 && this.x < 129 && this.y < 110 && this.y > 55)){
                this.tileMap.isDoorOpen = false;
            }


            console.log([this.x, this.y])
            // console.log(this.x)
            // console.log(this.y)
            // console.log(this.currentMovingDirection)
        }
    }

    _isCollidingWithFood() {
        if (this.passableHitbox.detectionState === true) {
            let detections = this.passableHitbox._detectingWhat();

            for(let i = 0; i < detections.length; i++) {
                let questionedItem = detections[i];
                // debugger
                if (questionedItem.tiedObj.constructor.name === "Consumable") {
                    console.log('food/consumable detected by player');
                    this.food++;
                    // questionedItem.tiedObj.hitbox = null;
                    // questionedItem.tiedObj.passableHitbox = null;
                    questionedItem.tiedObj.hitboxes.x = 0;
                    questionedItem.tiedObj.hitboxes.y = 0;
                    questionedItem.tiedObj.x = 0;
                    questionedItem.tiedObj.y = 0;
                    questionedItem.x = 0;
                    questionedItem.y = 0;
                    // debugger;
                    // questionedItem.tiedObj = null;
                    // questionedItem.x = null;
                    // questionedItem.y = null;
                    console.log(PassableHitbox.prototype.PASSABLEHITBOXES);
                    this.passableHitbox.detectionState = false;
                    // debugger
                }
            }

        }
    }

}


export default Player