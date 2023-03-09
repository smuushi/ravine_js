import Hitbox from "./utils.js";

class EnvObject {

    //let rock = new EnvObject(col * this.tileSize, col * this.tileSize, this.tileSize, this.tileMap)
     
    constructor(x, y, tileSize, velocity, tileMap, hitboxXOffset = 0, hitboxYOffset = 0) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.hitboxes = new Hitbox(this.x, this.y, this.tileSize, this.tileSize, hitboxXOffset, hitboxYOffset);
    }

    drawHitboxes(ctx) { // for debugging to see a semitransparent hitbox on all env objects like a rock.
        // this.hitboxes.forEach((hitbox) => hitbox._debugDraw(ctx))
        this.hitboxes._debugDraw(ctx);
    }


}

export default EnvObject