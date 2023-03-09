class Hitbox { // hitbox logic... 
               // track x, y positions in the game world. 
               // track height and width of the hitbox. 
               // MUST loop through all combinations of hitboxes to detect collisions. 
               // isColliding(target, checkingWith) => `target.collisionState = true` && return true if target and checking with colliding.
               // 
               // Currently thinking of adding an x and y offset so I can attach accurate hitboxes to all the game assets.
               // whenever a new object is made, hitboxes are tied to it through a callback. 
    constructor(x, y, width, height, xOffset = 0, yOffset = 0){

        this.x = x;
        this.y = y;

        this.xOffset = xOffset;
        this.yOffset = yOffset;

        this.width = width;
        this.height = height;

        this.collisionState = false;

        this.debugImage = new Image();
        this.debugImage.src = '../graphics/debug.png';

    }

    _debugDraw(ctx) {
        // debugger
        ctx.drawImage(this.debugImage, 0, 0, 16, 16, this.x + this.xOffset, this.y + this.yOffset, this.width, this.height)
    }

}

export default Hitbox