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
        // this.playerImage.src = "../graphics/sprites/characters/player.png" // idk how to use sprite sheets.. so I used the rock... 
        this.playerImage.src = 'graphics/sprites/objects/rock_in_water_01.png'

        this.currentMovingDirection = null;

        document.addEventListener('keydown', this._keydown) // 
        document.addEventListener('keyup', this._keyup) // listener to set player current moving direction to null if they let go of a direction.

    }


    animate(ctx) {
        //288 x 480
        // requestAnimationFrame(animate)

        // currentFrame = this.currentFrame % totalFrames;

        // let srcX = this.currentFrame * this.tileSize / 6;
        // let srcY = 20;


        ctx.drawImage(this.playerImage, this.x, this.y, this.tileSize, this.tileSize)

        
        
        // this.framesDrawn++;
        // if (this.framesDrawn >= 10){
        //     this.currentFrame++;
        //     this.framesDrawn = 0;
        // }
 
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

        this.move();
    }

    // _keyup =(event) => {
    //     // console.log('up')
    //     this.currentMovingDirection = null;
    // }

    

    draw(ctx) {
        // ctx.drawImage(this)
    }

    move() {
        this.y = this.currentMovingDirection[1]*10 + this.y;
        this.x = this.currentMovingDirection[0]*10 + this.x;
        // console.log(this.x)
        // console.log(this.y)
        // console.log(this.currentMovingDirection)
        
    }

}


export default Player