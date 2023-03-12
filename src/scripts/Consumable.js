import EnvObject from "./EnvObject";
import PassableHitbox from "./foodUtils";

class Consumable extends EnvObject {

    constructor(x, y, tileSize, velocity, tileMap, hitboxXOffset = 0, hitboxYOffset = 0, passHitboxXOffset = 0, passHitboxYOffset = 0, rng) {
        super(x, y, tileSize - 13, velocity, tileMap, hitboxXOffset, hitboxYOffset)

        this.consImages = [
            new Image(), 
            new Image(),
            new Image(), 
            new Image(), 
            new Image(), 
            new Image(), 
            new Image(), 
            new Image(), 
            new Image()
        ]
        this.consImages[0].src = './src/graphics/NinjaAdventure/Items/Food/Fish.png'
        this.consImages[1].src = './src/graphics/NinjaAdventure/Items/Food/Onigiri.png'
        this.consImages[2].src = './src/graphics/NinjaAdventure/Items/Food/Octopus.png'
        this.consImages[3].src = './src/graphics/NinjaAdventure/Items/Food/Shrimp.png'
        this.consImages[4].src = './src/graphics/NinjaAdventure/Items/Food/Sushi.png'
        this.consImages[5].src = './src/graphics/NinjaAdventure/Items/Food/Sushi2.png'
        this.consImages[6].src = './src/graphics/NinjaAdventure/Items/Food/Yakitori.png'
        this.consImages[7].src = './src/graphics/NinjaAdventure/Items/Food/SeedLarge.png'
        this.consImages[8].src = './src/graphics/NinjaAdventure/Items/Food/Noodle.png'
        
        this.rng = rng;
        
        this.foodHitbox = new PassableHitbox(x, y, tileSize - 3, tileSize - 3, this, passHitboxXOffset + 1.5, passHitboxYOffset + 2)
        
        
        console.log(this)

        if (!EnvObject.prototype.INTERACTIVEITEMS) {
            EnvObject.prototype.INTERACTIVEITEMS = []
        }

        EnvObject.prototype.INTERACTIVEITEMS.push(this)

    }

    _drawFood(ctx) {
        // debugger
        let foodSelector = (this.rng % 8)
        ctx.drawImage(this.consImages[foodSelector], this.x, this.y, this.tileSize + 13, this.tileSize + 13)

    }



}

export default Consumable;