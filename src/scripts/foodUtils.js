import Hitbox from "./utils"

class PassableHitbox {

    constructor(x, y, width, height, tiedObj, xOffset = 0, yOffset = 0){

        // debugger
        this.x = x;
        this.y = y;

        this.tiedObj = tiedObj;
        // ^ a pointer back to what thing we're tied to.. 
        
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        
        this.width = width;
        this.height = height;
        
        this.detectionState = false;
        
        this.debugImageee = new Image();
        this.debugImageee.src = './src/graphics/debug.png';
        

        if (!PassableHitbox.prototype.PASSABLEHITBOXES){
            PassableHitbox.prototype.PASSABLEHITBOXES = []
        }

        PassableHitbox.prototype.PASSABLEHITBOXES.push(this);

        console.log(PassableHitbox.prototype.PASSABLEHITBOXES)
    }


    static updateDetectionStateToTrueIfDetecting() { 
        // if any hitboxes overlap, update their collision state to true,
        // else do nothing... need to use separate functions because
        // a collision may be detected early in this loop. 
        // Therefore, we need a one way switch. 

        // Let's first set everything that needs to be false to false.. 
        for(let i = 0; i < PassableHitbox.prototype.PASSABLEHITBOXES.length; i++) {
            PassableHitbox.prototype.PASSABLEHITBOXES[i].detectionState = false;
        };   
        

        for(let i = 0; i < PassableHitbox.prototype.PASSABLEHITBOXES.length; i++) {
            for(let j = i + 1; j < PassableHitbox.prototype.PASSABLEHITBOXES.length; j++) {
                // console.log([i, j])
                let hitbox1 = PassableHitbox.prototype.PASSABLEHITBOXES[i];
                let hitbox2 = PassableHitbox.prototype.PASSABLEHITBOXES[j];

                if (PassableHitbox._anyDetection(hitbox1, hitbox2)) {
                    hitbox1.detectionState = true;
                    hitbox2.detectionState = true;
                    // debugger
                }
            }
        }


    }

    _detectingWhat() { 
        // copypasta'd the detections function above 
        // so that it would return an array of detections that I can iterate through later to implement logic. 
        
        let referencingPassableHitbox = this; 

        let listOfDetected = [];
        

        // for(let i = 0; i < PassableHitbox.prototype.PASSABLEHITBOXES.length; i++) {
            for(let j = 0; j < PassableHitbox.prototype.PASSABLEHITBOXES.length; j++) {
                // console.log([i, j])
                // let hitbox1 = PassableHitbox.prototype.PASSABLEHITBOXES[i];

                let hitbox2 = PassableHitbox.prototype.PASSABLEHITBOXES[j];

                if ((PassableHitbox._anyDetection(referencingPassableHitbox, hitbox2)) && !(referencingPassableHitbox === hitbox2)) {
                    // hitbox1.detectionState = true;
                    hitbox2.detectionState = true;
                    listOfDetected.push(hitbox2);
                    // debugger
                }
            }
        // }
        return listOfDetected;
        
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

    
    


    _debugDraww(ctx) {

        // debugger
        if (this.detectionState === false){
            ctx.filter = 'none'
            // debugger
            // ctx.drawImage(this.debugImage, 0, 0, 16, 16, this.x + this.xOffset, this.y + this.yOffset, this.width, this.height)
            // ctx.drawImage(this.debugImage, 16, 16, this.x + this.xOffset, this.y + this.yOffset)
            ctx.drawImage(this.debugImageee, 0, 0, 16, 16, this.x + this.xOffset, this.y + this.yOffset, this.width, this.height)
            
        } else if (this.detectionState === true) {
            // debugger
            ctx.filter = 'invert(1)'
            // debugger
            ctx.drawImage(this.debugImageee, 0, 0, 16, 16, this.x + this.xOffset, this.y + this.yOffset, this.width, this.height)
            ctx.filter = 'none'
        }

    }


}

export default PassableHitbox