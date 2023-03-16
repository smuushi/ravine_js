import PassableHitbox from "./foodUtils";
import Hitbox from './utils';
import Sound from "./musics";

import AttackBox from "./attackbox";
import dist from "webpack-merge";

const hitSound = new Sound('./src/graphics/NinjaAdventure/Sounds/Game/Hit.wav')
hitSound.sound.volume = 0.3


const DIRS = [ // directions made here to refer to. 
    [0, -1],
    [0, 1],
    [1, 0],
    [-1,0]
]

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


class TraversalPoint {
    constructor(x, y, velocity, height, width, xOffset, yOffset, excludedXandY) {
        this.nextPoints = [];
        this.parentPoints = null;
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.velocity = velocity;
        this.height = height;
        this.width = width;
        this.xOffset = xOffset;
        this.yOffset = yOffset;

        if (!excludedXandY) {
            excludedXandY = [[this.x, this.y]]
        } else {
            excludedXandY.push([this.x, this.y])
        }

        // this.hypotheticalHitBox = {x: x, y: y, height: height, width: width, xOffset: xOffset, yOffset: yOffset}
    }

    _hypotheticalCollision (hypotheticalHitBox) {

        // debugger
        for(let i = 0; i < Hitbox.prototype.ALLHITBOXESMADE.length; i++) {
            
                let hitbox1 = Hitbox.prototype.ALLHITBOXESMADE[i];
                let hitbox2 = hypotheticalHitBox

                if (Hitbox._anyCollision(hitbox1, hitbox2)) {
                    return true;
                    debugger
                } else {
                    return false;
                }
            
        }

    }

    generateNextPointsAndSetParent() {
        
        for (let i = 0; i < DIRS.length; i++) {
            let questionedDir = DIRS[i];
            let hypotheticalHitBox = {
                x: Math.floor(this.x + questionedDir[0]* this.velocity),
                y: Math.floor(this.y + questionedDir[1]* this.velocity), 
                height: this.height,
                width: this.width,
                xOffset: this.xOffset,
                yOffset: this.yOffset
            }
            if (this._hypotheticalCollision(hypotheticalHitBox) && !excludedXandY.includes([hypotheticalHitBox.x, hypotheticalHitBox.y])) {
                
                let theNextPoint = new TraversalPoint (this.x + questionedDir[0]*this.velocity, this.y + questionedDir[1]*this.velocity, this.velocity, this.height, this.width, this.xOffset, this.yOffset) 
                this.nextPoints.push(theNextPoint)

                theNextPoint.parent = this;
            }
        }
    }

    findPath(destination){

    }
    


}






class Skeleton {

    constructor(x, y, tileSize, velocity, tileMap) {

        this.x = x;
        this.y = y;
        this.tileSize = tileSize; 
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.vulnerable = true;

        this.aggressionState = "idle";

        this.guardTree = false;

        this.gottaChange = false;

        this.currentFrame = 0;
        this.framesDrawn = 0;

        this.skeleboyImage = new Image();
        this.skeleboyImage.src = ("./src/graphics/sprites/characters/skeleton.png")

        this.currentMovingDirection = null;

        this.lastMovingDirection;

        this.hitbox = new Hitbox(this.x, this.y, this.tileSize - 7, this.tileSize - 2, -2, -3)

        this.passableHitbox = new PassableHitbox(this.x, this.y, this.tileSize, this.tileSize, this, -5.5, -3)

        this.attackBox = new AttackBox(0, 0, this.tileSize + 10, this.tileSize + 10, this, -12, -7)

        this.health = 3;

        this.player = tileMap.player;

        this.oldx
        this.oldy

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


        this.attackBox.x = 0;
        this.attackBox.y = 0;


    }



    animateAttack(ctx) {

        let srcX = 64 * this.currentFrame % 320 + 12;
        let srcY;

        console.log(srcX)

        // switch(srcY) {
        if (this.currentMovingDirection === DIRS[2]){ // right
            srcY = 155;
        } else if (this.currentMovingDirection === DIRS[0]){ // up
            srcY = 155;
        } else if (this.currentMovingDirection === DIRS[1]){ // down
            srcY = 155;
        } else if (this.currentMovingDirection === DIRS[3]){ // left
            srcY = 155;  
            // srcX = (this.currentFrame * 48 % 288) * 1
        } else {
            if (this.lastMovingDirection === DIRS[2]){        // right idle
                srcY = 155;
            } else if (this.lastMovingDirection === DIRS[0]){ // up idle
                srcY = 155;
            } else if (this.lastMovingDirection === DIRS[3]){ // left idle... same as right idle lmao
                srcY = 155;
            } else {                                          // down idle
                // debugger
                srcY = 155;
            }
        }

        if (this.currentMovingDirection === DIRS[3]) {
            // let srcX = 64 * this.currentFrame % 384 + 12;
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.skeleboyImage, srcX, srcY, 50, 32, Math.floor(-this.x + 26), Math.floor(this.y -15), -50, 32)
            ctx.restore();
        } else if (this.currentMovingDirection === null && this.lastMovingDirection === DIRS[3]) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.skeleboyImage, srcX, srcY, 50, 32, Math.floor(-this.x + 26), Math.floor(this.y -15), -50, 32)
            ctx.restore();
        } else { 
            // ctx.save()
            // console.log('trying to draw basic')
            ctx.drawImage(this.skeleboyImage, srcX, srcY, 50, 32, Math.floor(this.x -17), Math.floor(this.y - 15), 50, 32)
            // ctx.restore()
        }    
        
        // console.log(this.currentMovingDirection)

        // console.log('trying to draw skeleboy')
        
        // if(srcX === 204){
        //     this.attackBox.x = 0;
        //     this.attackBox.y = 0;
        // } 

        if (srcX === 204) {
            this.attackBox.x = this.x;
            this.attackBox.y = this.y;
        } else {
            this.attackBox.x = 0;
            this.attackBox.y = 0;
        }

        this.framesDrawn++;
        if (this.framesDrawn >= 12){
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
        // } else if (this.currentMovingDirection === null && this.lastMovingDirection === DIRS[3]) {
        //     ctx.save();
        //     ctx.scale(-1, 1);
        //     ctx.drawImage(this.skeleboyImage, srcX, srcY, 32, 32, Math.floor(-this.x + 6), Math.floor(this.y -15), -32, 32)
        //     ctx.restore();
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

        this.attackBox.x = 0;
        this.attackBox.y = 0;
        
 
    }

    _setIdleMovement() {
        // function randomIntFromInterval(min, max) { // min and max included 
        //     return Math.floor(Math.random() * (max - min + 1) + min)
        //   }
          const rndInt = randomIntFromInterval(1, 4)
          const changeDirChance = randomIntFromInterval(1, 5)
        if (changeDirChance <= 2 && this.currentFrame % 4 === 0){
            this.lastMovingDirection = this.currentMovingDirection;
            // let randomDirNum = Math.floor(Math.random() * 10 / 4)
            this.currentMovingDirection = DIRS[rndInt - 1]
        }
    }

    move() {

        let distance = this._calcDistanceFromPlayer();
        if (distance < 45) {
            this.aggressionState = "aggro"
        } else {
            this.aggressionState = "idle"
        }
        
        let ran = randomIntFromInterval(1, 2)
        if (this.aggressionState === "idle" && ran === 2) {
            this._setIdleMovement();
        }

        if (this.aggressionState === "aggro") {
            this._pathToTreeNonPathfinder([this.tileMap.player.x, this.tileMap.player.y])
        }

        // if (this.guardTree === true) {
        //     // debugger;
        //     // validDirs = this._pathToShakingTree(this.x, this.y, this.currentMovingDirection, [367, 67], this.velocity)
        //     // this.currentMovingDirection = validDirs[0]
        //     this._pathToTreeNonPathfinder([370, 66])
        // }
        /// BROKEN CODE ATM. 




        if (this.passableHitbox.detectionState === true) {
            // debugger
            this._isCollidingWithAttack();
        }
        
        if (!!this.currentMovingDirection){

                
            // let oldX = this.x;
            // let oldY = this.y;
            
            this.oldx = this.x;
            this.oldy = this.y;
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
                // return
            }

        }
        



    }

    _pathToTreeNonPathfinder(destination) {
        // debugger;
        for(let i = 0; i < DIRS.length; i++) {
            let questionedDir = DIRS[i];
            let nextX = this.x + questionedDir[0]
            let nextY = this.y + questionedDir[1]

            let dx = Math.abs(destination[0] - this.x);
            let dy = Math.abs(destination[1] - this.y);

            let nextdx = Math.abs(destination[0] - nextX);
            let nextdy = Math.abs(destination[1] - nextY);
            
            // debugger;
            
            if(nextdx <= dx && nextdy <= dy && !(dx === nextdx && dy === nextdy)) {
                this.lastMovingDirection = this.currentMovingDirection
                this.currentMovingDirection = questionedDir;
            };

        }
    }


    _pathToShakingTree(posX, posY, movingDirection, destination, velocity, excludedXandY) {
        ///broken atm 
        // debugger
        if (!excludedXandY) {
            // debugger
            excludedXandY = [[Math.floor(posX), Math.floor(posY)]];
        } else {
            excludedXandY.push([posX, posY]);
        }


        let newPosX = Math.floor(movingDirection[0] + posX);
        let newPosY = Math.floor(movingDirection[1] + posY); 

        if(newPosX === destination[0] && newPosY === destination[1]) {
            return true;
        }

        let newXandY = [newPosX,newPosY];

        // debugger
        if (excludedXandY.includes(newXandY)){
            debugger
            return null;
        }

        let hypotheticalHitBox = {
            x: newPosX, 
            y: newPosY,
            width: 16 - 7,
            height: 16 - 2,
            xOffset: -2,
            yOffset: -3
        }

        // debugger
        if (this._hypotheticalCollision(hypotheticalHitBox)){
            // debugger
            return null;
        } 
        
        
        
        let validDIRS = []

        let possibleDIRS = DIRS.filter((dir) => {
            if ((dir) !== movingDirection){
                return dir;
            }
        })
        // debugger
        //367, 67
        
        for (let i = 0; i < possibleDIRS.length; i++) {
            let questionedDir = possibleDIRS[i]
            
            if (this._pathToShakingTree(newPosX, newPosY, questionedDir, destination, velocity, excludedXandY)) {
                // debugger
                validDIRS.push(questionedDir);
            } 
        

        }

        return validDIRS;

    }

    _hypotheticalCollision (hypotheticalHitBox) {

        // debugger
        for(let i = 0; i < Hitbox.prototype.ALLHITBOXESMADE.length; i++) {
            
                let hitbox1 = Hitbox.prototype.ALLHITBOXESMADE[i];
                let hitbox2 = hypotheticalHitBox

                if (this._anyCollision(hitbox1, hitbox2)) {
                    // debugger

                    console.log(Hitbox._anyCollision)

                    return true;
                } else {
                    return false;
                }
            
        }

    }

    _anyCollision(box1, box2) {
        if ((box1.x + box1.xOffset) > (box2.x + box2.xOffset) + box2.width ||
            (box1.y + box1.yOffset) > (box2.y + box2.yOffset) + box2.height ||
            (box2.x + box2.xOffset) > (box1.x + box1.xOffset) + box1.width ||
            (box2.y + box2.yOffset) > (box1.y + box1.yOffset) + box1.height
        ) {
            return false;
        } else {
            return true;
        }
    }



    _calcDistanceFromPlayer() {
        let dx = this.player.x - (this.x)
        let dy = this.player.y - (this.y)
        let distance = Math.sqrt((dx * dx) + (dy * dy))
        
        return distance
    }

    _isCollidingWithAttack() {
        // console.log('DETECT DAMAGE COLLISIONS')

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
                        this.velocity = 0.3
                        hitSound.play();
                        if (this.health === 0) {
                            this.tileMap.totalEnemiesKilled++;
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
            this.velocity = 0.7;
        }
    }

}

export default Skeleton;