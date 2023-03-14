import PassableHitbox from "./foodUtils";
import Hitbox from './utils';
import Sound from "./musics";

const hitSound = new Sound('./src/graphics/NinjaAdventure/Sounds/Game/Hit.wav')
hitSound.sound.volume = 0.3


const DIRS = [ // directions made here to refer to. 
    [0, -1],
    [0, 1],
    [1, 0],
    [-1,0]
]

class Skeleton {

    constructor(x, y, tileSize, velocity, tileMap) {

        this.x = x;
        this.y = y;
        this.tileSize = tileSize; 
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.vulnerable = true;

        this.currentFrame = 0;
        this.framesDrawn = 0;

        this.skeleboyImage = new Image();
        this.skeleboyImage.src = ("./src/graphics/sprites/characters/skeleton.png")

        this.currentMovingDirection = null;

        this.lastMovingDirection;

        this.hitbox = new Hitbox(this.x, this.y, this.tileSize - 7, this.tileSize - 2, -2, -3)

        this.passableHitbox = new PassableHitbox(this.x, this.y, this.tileSize, this.tileSize, this, -5.5, -3)

        this.health = 3;

    }

    animateDeath(ctx) {
        // let srcX = this.currentFrame * 1 % 384;
        let srcX = 64 * this.currentFrame + 12;
        // console.log(srcX)
        if (srcX > 268){
            srcX = 268;
        }
        let srcY = 282;

        // switch(srcY) {
        if (this.currentMovingDirection === DIRS[2]){ // right
            // srcY = 300;
        } else if (this.currentMovingDirection === DIRS[0]){ // up
            // srcY = 300;
        } else if (this.currentMovingDirection === DIRS[1]){ // down
            // srcY = 300;
        } else if (this.currentMovingDirection === DIRS[3]){ // left
            // srcY = 300;  
            // srcX = (this.currentFrame * 48 % 288) * 1
        } else {
            if (this.lastMovingDirection === DIRS[2]){        // right idle
                // srcY = 300;
            } else if (this.lastMovingDirection === DIRS[0]){ // up idle
                // srcY = 290;
            } else if (this.lastMovingDirection === DIRS[3]){ // left idle... same as right idle lmao
                // srcY = 290;
            } else {                                          // down idle
                // debugger
                // srcY = 290;
            }
        }

        if (this.currentMovingDirection === DIRS[3]) {
            // let srcX = 64 * this.currentFrame % 384 + 12;
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.skeleboyImage, srcX, srcY, 32, 32, Math.floor(-this.x + 7), Math.floor(this.y -15), -32, 32)
            ctx.restore();
        } else if (this.currentMovingDirection === null && this.lastMovingDirection === DIRS[3]) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.skeleboyImage, srcX, srcY, 32, 32, Math.floor(-this.x + 6), Math.floor(this.y -15), -32, 32)
            ctx.restore();
        } else { 
            // ctx.save()
            // console.log('trying to draw basic')
            ctx.drawImage(this.skeleboyImage, srcX, srcY, 33, 32, Math.floor(this.x -17), Math.floor(this.y - 15), 33, 32)
            // ctx.restore()
        }    

        // console.log(this.currentMovingDirection)

        // console.log('trying to draw skeleboy')

        this.framesDrawn++;
        if (this.framesDrawn >= 9){
            this.currentFrame++;
            this.framesDrawn = 0;
        }




        }

    


    animate(ctx) {


        // let srcX = this.currentFrame * 1 % 384;
        let srcX = 64 * this.currentFrame % 384 + 12;
        let srcY;

        // switch(srcY) {
        if (this.currentMovingDirection === DIRS[2]){ // right
            srcY = 91;
        } else if (this.currentMovingDirection === DIRS[0]){ // up
            srcY = 91;
        } else if (this.currentMovingDirection === DIRS[1]){ // down
            srcY = 91;
        } else if (this.currentMovingDirection === DIRS[3]){ // left
            srcY = 91;  
            // srcX = (this.currentFrame * 48 % 288) * 1
        } else {
            if (this.lastMovingDirection === DIRS[2]){        // right idle
                srcY = 26;
            } else if (this.lastMovingDirection === DIRS[0]){ // up idle
                srcY = 26;
            } else if (this.lastMovingDirection === DIRS[3]){ // left idle... same as right idle lmao
                srcY = 26;
            } else {                                          // down idle
                // debugger
                srcY = 26;
            }
        }

        if (this.currentMovingDirection === DIRS[3]) {
            // let srcX = 64 * this.currentFrame % 384 + 12;
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.skeleboyImage, srcX, srcY, 32, 32, Math.floor(-this.x + 7), Math.floor(this.y -15), -32, 32)
            ctx.restore();
        } else if (this.currentMovingDirection === null && this.lastMovingDirection === DIRS[3]) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.skeleboyImage, srcX, srcY, 32, 32, Math.floor(-this.x + 6), Math.floor(this.y -15), -32, 32)
            ctx.restore();
        } else { 
            // ctx.save()
            // console.log('trying to draw basic')
            ctx.drawImage(this.skeleboyImage, srcX, srcY, 33, 32, Math.floor(this.x -17), Math.floor(this.y - 15), 33, 32)
            // ctx.restore()
        }    
        
        // console.log(this.currentMovingDirection)

        // console.log('trying to draw skeleboy')
        
        this.framesDrawn++;
        if (this.framesDrawn >= 9){
            this.currentFrame++;
            this.framesDrawn = 0;
        }


        
 
    }

    move() {
        if (this.passableHitbox.detectionState === true) {
            // debugger
            this._isCollidingWithAttack();
        }
        
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

        }

    }

    _isCollidingWithAttack() {
        console.log('DETECT DAMAGE COLLISIONS')

        if (this.vulnerable === false) {
            return
        }

        if (this.passableHitbox.detectionState === true) {
            let detections = this.passableHitbox._detectingWhat();
            // debugger;

            for(let i = 0; i < detections.length; i++) {
                let questionedDetection = detections[i];

                // debugger;
                if(questionedDetection.tiedObj.constructor.name === "Player" 
                    && questionedDetection.constructor.name === "AttackBox"){
                        
                        console.log('Attacked by player');
                        this.health--; 
                        hitSound.play();
                        if (this.health === 0) {

                            this.currentFrame = 0;
                            this.hitbox.x = 0;
                            this.hitbox.y = 0;
                        }
                        this.vulnerable = false;
                        let binded_resetVuln = this._resetVuln.bind(this);

                        setTimeout(binded_resetVuln, 1000)

                        // play hurt sound here. 

                }

            }
            



        }

    }

    _resetVuln() {
        if (this.vulnerable === false) {
            this.vulnerable = true;
        }
    }

}

export default Skeleton;