import EnvObject from "./EnvObject";
import PassableHitbox from "./foodUtils";

class Consumable extends EnvObject {

    constructor(x, y, tileSize, velocity, tileMap, hitboxXOffset = 0, hitboxYOffset = 0, passHitboxXOffset = 0, passHitboxYOffset = 0) {
        super(x, y, tileSize - 13, velocity, tileMap, hitboxXOffset, hitboxYOffset)

        this.consImage = new Image ();
        this.consImage.src = './src/graphics/NinjaAdventure/Items/Food/Fish.png'


        
        this.foodHitbox = new PassableHitbox(x, y, tileSize - 3, tileSize - 3, this, passHitboxXOffset + 1.5, passHitboxYOffset + 2)
        
        
        console.log(this)

        if (!EnvObject.prototype.INTERACTIVEITEMS) {
            EnvObject.prototype.INTERACTIVEITEMS = []
        }

        EnvObject.prototype.INTERACTIVEITEMS.push(this)

    }

    _drawFood(ctx) {
        // debugger
        ctx.drawImage(this.consImage, this.x, this.y, this.tileSize + 13, this.tileSize + 13)

    }



}

export default Consumable;