const DIRS = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1,0]
]

import Hitbox from "./utils.js";

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

        this.currentMovingDirection = null;

        document.addEventListener('keydown', this._keydown) // 
        document.addEventListener('keyup', this._keyup) // listener to set player current moving direction to null if they let go of a direction.

        this.currentFrame = 0;

        this.lastMovingDirection;

        this.hitbox = new Hitbox(this.x, this.y, this.tileSize -4, this.tileSize -3.5, 1.5, -4)

        if (!Player.prototype.keyss){
            Player.prototype.keyss = {}
        }

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
            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, -this.x + 1, this.y -15, -32, 32)
            ctx.restore();
        } else if (this.currentMovingDirection === null && this.lastMovingDirection === DIRS[3]) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, -this.x, this.y -15, -32, 32)
            ctx.restore();
        } else { 
            // ctx.save()
            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, this.x -17, this.y -15, 32, 32)
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

    

    draw(ctx) {
        // ctx.drawImage(this)
    }

    move() {

        if (Object.values(Player.prototype.keyss).some((val) => !!val) ){

            if (!!this.currentMovingDirection){

                
                // let oldX = this.x;
                // let oldY = this.y;
                
                this.y = this.currentMovingDirection[1]* this.velocity + this.y; 
                this.x = this.currentMovingDirection[0]* this.velocity + this.x;
                this.hitbox.x = this.x;
                this.hitbox.y = this.y;
                Hitbox.updateCollisionStateToTrueIfColliding()
                
                while (this.hitbox.collisionState === true) {
                    // debugger
                    this.y = this.currentMovingDirection[1]*(-1)* this.velocity + this.y; 
                    this.x = this.currentMovingDirection[0]*(-1)* this.velocity + this.x;
                    this.hitbox.x = this.x;
                    this.hitbox.y = this.y;
                    Hitbox.updateCollisionStateToTrueIfColliding();

                    // debugger
                }
                // if (this.hitbox.collisionState === true) {
                //     // debugger
                //     this.y = this.currentMovingDirection[1]*(-1)* this.velocity + this.y; 
                //     this.x = this.currentMovingDirection[0]*(-1)* this.velocity + this.x;
                //     this.hitbox.x = this.x;
                //     this.hitbox.y = this.y;
                //     // debugger
                // }


            }


            console.log([this.x, this.y])
            // console.log(this.x)
            // console.log(this.y)
            // console.log(this.currentMovingDirection)
        }
    }

}


export default Player