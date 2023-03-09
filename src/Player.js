const DIRS = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1,0]
]

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
        this.playerImage.src = "../graphics/sprites/characters/player.png" // idk how to use sprite sheets.. so I used the rock... 
        // this.playerImage.src = 'graphics/sprites/objects/rock_in_water_01.png'

        this.currentMovingDirection = null;

        document.addEventListener('keydown', this._keydown) // 
        document.addEventListener('keyup', this._keyup) // listener to set player current moving direction to null if they let go of a direction.

        this.currentFrame = 0;

        this.lastMovingDirection;

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
            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, -this.x - 16, this.y, -32, 32)
            ctx.restore();
        } else if (this.currentMovingDirection === null && this.lastMovingDirection === DIRS[3]) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, -this.x - 16, this.y, -32, 32)
            ctx.restore();
        } else { 
            // ctx.save()
            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, this.x, this.y, 32, 32)
            // ctx.restore()
        }    
        
        
        this.framesDrawn++;
        if (this.framesDrawn >= 10){
            this.currentFrame++;
            this.framesDrawn = 0;
        }
 
    }


    _keydown =(event) => {
        // debugger 
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
            
            
        
    }

    _keyup =(event) => {
        // console.log('up')
        this.lastMovingDirection = this.currentMovingDirection;
        this.currentMovingDirection = null;
    }

    

    draw(ctx) {
        // ctx.drawImage(this)
    }

    move() {

        if (!!this.currentMovingDirection){
            this.y = this.currentMovingDirection[1]* this.velocity + this.y;
            this.x = this.currentMovingDirection[0]* this.velocity + this.x;
        }
        console.log([this.x, this.y])
        // console.log(this.x)
        // console.log(this.y)
        // console.log(this.currentMovingDirection)
        
    }

}


export default Player