import EnvObject from "./EnvObject";
import PassableHitbox from "./foodUtils";

class Consumable extends EnvObject {

    constructor(x, y, tileSize, velocity, tileMap, hitboxXOffset = 0, hitboxYOffset = 0) {
        super(x, y, tileSize - 13, velocity, tileMap, hitboxXOffset = 0, hitboxYOffset = 0)

        this.consImage = new Image ();
        this.consImage.src = './src/graphics/NinjaAdventure/Items/Food/Shrimp.png'


        
        this.foodHitbox = new PassableHitbox(x, y, tileSize, tileSize, tileMap, 0, 0)
        
        console.log(this)

    }



}

export default Consumable;