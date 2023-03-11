import Hitbox from "./utils"

class PassableHitbox {

    constructor(x, y, width, height, xOffset = 0, yOffset = 0){

        // debugger
        this.x = x;
        this.y = y;
        
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        
        this.width = width;
        this.height = height;
        
        this.detectionState = false;
        
        this.debugImage = new Image();
        this.debugImage.src = './src/graphics/debug.png';
        

        if (!Hitbox.prototype.PASSABLEHITBOXES){
            Hitbox.prototype.PASSABLEHITBOXES = []
        }

        Hitbox.prototype.PASSABLEHITBOXES.push(this);

        console.log(Hitbox.prototype.PASSABLEHITBOXES)
    }


    static updateDetectionStateToTrueIfDetecting() { 
        // if any hitboxes overlap, update their collision state to true,
        // else do nothing... need to use separate functions because
        // a collision may be detected early in this loop. 
        // Therefore, we need a one way switch. 

        // Let's first set everything that needs to be false to false.. 
        for(let i = 0; i < Hitbox.prototype.ALLHITBOXESMADE.length; i++) {
            Hitbox.prototype.ALLHITBOXESMADE[i].collisionState = false;
        };   
        

        for(let i = 0; i < Hitbox.prototype.ALLHITBOXESMADE.length; i++) {
            for(let j = i + 1; j < Hitbox.prototype.ALLHITBOXESMADE.length; j++) {
                // console.log([i, j])
                let hitbox1 = Hitbox.prototype.ALLHITBOXESMADE[i];
                let hitbox2 = Hitbox.prototype.ALLHITBOXESMADE[j];

                if (Hitbox._anyCollision(hitbox1, hitbox2)) {
                    hitbox1.collisionState = true;
                    hitbox2.collisionState = true;
                    // debugger
                }
            }
        }

    }

    static _anyDetection(box1, box2) {
        // check to see if the positional coordinate is greater than the (other positional coordinate + that thing's dimesions..)
        // return false if ^ is true... 
        // else return true! hehe
        // it's so simple, but actually so difficult to think of on my own.. 
        // credits to this tutorial 
        // https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
        //

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
    


    _debugDraw(ctx) {
        // debugger
        if (this.detectionState === false){
            ctx.filter = 'none'
            ctx.drawImage(this.debugImage, 0, 0, 16, 16, this.x + this.xOffset, this.y + this.yOffset, this.width, this.height)
        } else if (this.detectionState === true) {
            // debugger
            ctx.filter = 'invert(1)'
            // debugger
            ctx.drawImage(this.debugImage, 0, 0, 16, 16, this.x + this.xOffset, this.y + this.yOffset, this.width, this.height)
            ctx.filter = 'none'
        }

    }


}

export default PassableHitbox