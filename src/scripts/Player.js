const DIRS = [ // directions made here to refer to. 
    [0, -1],
    [0, 1],
    [1, 0],
    [-1,0]
]

import Hitbox from "./utils.js";
import PassableHitbox from "./foodUtils.js";
import AttackBox from "./attackbox.js";

import Sound from "./musics.js"

const foodSound = new Sound ("./src/graphics/NinjaAdventure/Sounds/Game/Success1.wav")
const treeSound = new Sound ("./src/graphics/NinjaAdventure/Sounds/Game/MiniImpact.wav")
const ouchieSound = new Sound ("./src/graphics/NinjaAdventure/Sounds/Game/Hit4.wav")
const healingSound = new Sound ("./src/graphics/NinjaAdventure/Sounds/Game/PowerUp1.wav")
const normalNextDaySound = new Sound("./src/graphics/NinjaAdventure/Sounds/Game/Success3.wav")
const swordSound = new Sound("./src/graphics/NinjaAdventure/Sounds/Game/Sword.wav")
const menuSelectSound = new Sound("./src/graphics/NinjaAdventure/Sounds/Menu/Menu2.wav")
const badLuckSound = new Sound("./src/graphics/NinjaAdventure/Sounds/Game/GameOver.wav")

const optionsOpenSound = new Sound('./src/graphics/NinjaAdventure/Sounds/Menu/Menu10.wav')
// optionsOpenSound.sound.volume = 0.5
const optionsCloseSound = new Sound('./src/graphics/NinjaAdventure/Sounds/Menu/Menu11.wav')
// optionsCloseSound.sound.volume = 0.5
const toggleMuteOnSound = new Sound('./src/graphics/NinjaAdventure/Sounds/Menu/Accept2.wav')
const toggleMuteOffSound = new Sound('./src/graphics/NinjaAdventure/Sounds/Menu/Accept.wav')
const doorSound = new Sound('./src/graphics/NinjaAdventure/Sounds/Game/Voice3.wav')

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class Player {
    
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x; 
        this.y = y;
        this.tileSize = tileSize; 
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.state = "idle"
        this.muted = false;

        this.vulnerable = true;

        
        
        
        // const spriteCols = 10;
        // const spriteRows = 6;
        // const totalFrames = 6

        this.currentFrame = 0;
        this.framesDrawn = 0;

        this.playerImage = new Image ();
        this.playerImage.src = "./src/graphics/sprites/characters/player.png" // idk how to use sprite sheets.. so I used the rock... 
        // this.playerImage.src = '../graphics/sprites/objects/rock_in_water_01.png'

        this.dust = new Image();
        this.dust.src = './src/graphics/sprites/particles/dust_particles_01.png'
        
        this.currentMovingDirection = null;

        document.addEventListener('keydown', this._keydown) // 
        document.addEventListener('keyup', this._keyup) // listener to set player current moving direction to null if they let go of a direction.

        // this.currentFrame = 0; // why is there a duplicate here??? idk lmaoo 

        this.lastMovingDirection;

        this.hitbox = new Hitbox(this.x, this.y, this.tileSize -5, this.tileSize, 1.5, -4)

        this.passableHitbox = new PassableHitbox(this.x, this.y, this.tileSize -4, this.tileSize, this, 1.5, -4)
        this.attackBox = new AttackBox(this.x, this.y, this.tileSize + 13, this.tileSize + 13, this, 1.5, -4)
        /// attackbox will be located out of bounds.... when the player attacks, it will temporarily move the attack box to the player x, y pos. 


        if (!Player.prototype.keyss){
            Player.prototype.keyss = {}
        }

        // logic is... the player needs to collect 5 food each day
        // if he doesn't, he will die.
        // colliding with a food increases this.food by one and 
        // also destroys the food on the map.. 
        // at the end of the day, the player spend the extra food they pick up
        // to gain an ability to attack, increase speed, increase health.. 
        // gaining extra stats require more food per day. 
        // shaking trees make monsters more aggressive, but also drops more food.

        this.targetFood = 5; 
        this.food = 3;

        this.health = 3;


    }

    
    animateDeath(ctx) {

        // this.currentFrame = 0

        // debugger
        let srcX = this.currentFrame * 48;
        if (srcX > 96) {
            srcX = 96;
        }
        let srcY = 447
// debugger

        if (this.currentMovingDirection === DIRS[3]){
            ctx.save()
            ctx.scale(-1,1)
            
            
            ctx.drawImage(this.playerImage, srcX, srcY, 39, 39, Math.floor(-this.x -32), Math.floor(this.y -15), 39, 39)
            ctx.restore()
        } else if (this.currentMovingDirection === null && this.lastMovingDirection === DIRS[3]) {

            ctx.save()
            ctx.scale(-1,1)
            ctx.drawImage(this.playerImage, srcX, srcY, 39, 39, Math.floor(-this.x -32), Math.floor(this.y -15), 39, 39)
            ctx.restore()

        } else {
            if (Object.keys(Player.prototype.keyss).some((key) => !!Player.prototype.keyss[key])){
                ctx.drawImage(this.playerImage, srcX, srcY, 39, 39, Math.floor(this.x -17 + (Math.random() * 2)), Math.floor(this.y -15 + (Math.random() * 2)), 39, 39)

            } else {
                ctx.drawImage(this.playerImage, srcX, srcY, 39, 39, Math.floor(this.x -17), Math.floor(this.y -15), 39, 39)
                // ctx.drawImage(this.playerImage, 32, 0, 32, 32, Math.floor(-this.x), Math.floor(this.y -15), -32, 32)
            }
        }
        this.framesDrawn++
        if (this.framesDrawn > 45) {
            this.currentFrame++
            this.framesDrawn = 0;
        }
        this.attackBox.x = 0;
        this.attackBox.y = 0;

    }   

    animateAttack(ctx) {
        // console.log("reached line 124")
        
        let srcY;
        
        let srcX = this.currentFrame * 48 ;

        
        // debugger
        if (srcX > 145) {
            srcX = 144;
            
        }
        // console.log(srcX)

        if (this.currentMovingDirection === DIRS[2]){ // right attack
            srcY = 352;
        } else if (this.currentMovingDirection === DIRS[0]){ // up attack
            srcY = 399;
        } else if (this.currentMovingDirection === DIRS[1]){ // down
            srcY = 304;
        } else if (this.currentMovingDirection === DIRS[3]){ // left
            srcY = 352;  
            srcX = (this.currentFrame * 48 % 288) * 1
        } else {
            if (this.lastMovingDirection === DIRS[2]){        // right idle attack
                srcY = 352;
            } else if (this.lastMovingDirection === DIRS[0]){ // up idle attack
                srcY = 399;
            } else if (this.lastMovingDirection === DIRS[3]){ // left idle... same as right idle lmao
                srcY = 352;
            } else {                                          // down idle
                srcY = 304;
            }
        }


        if (this.currentMovingDirection === DIRS[3]) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.playerImage, srcX, srcY, 42, 32, Math.floor(-this.x + 1 + 11), Math.floor(this.y -15), -42, 32)
            ctx.restore();
        } else if (this.currentMovingDirection === null && this.lastMovingDirection === DIRS[3]) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.playerImage, srcX, srcY, 42, 32, Math.floor(-this.x + 11), Math.floor(this.y -15), -42, 32)
            ctx.restore();
        } else { 
            // ctx.save()
            ctx.drawImage(this.playerImage, srcX, srcY, 42, 32, Math.floor(this.x -17), Math.floor(this.y -15), 42, 32)
            // if (srcX === 144) {
            //     this.state = "idle";
            // }
            // ctx.restore()
        } 

        if (srcX === 144) {
            this.state = "idle";
            
        }

        if (srcX === 96) {
            this.attackBox.x = 0;
            this.attackBox.y = 0;
        }

        console.log(srcX)

        this.framesDrawn++;
        if (this.framesDrawn >= 11){
            this.currentFrame++;
            this.framesDrawn = 0;
        }

    }


    animate(ctx) {
        //288 x 480
        // requestAnimationFrame(animate)

        // currentFrame = this.currentFrame % totalFrames;
        // if (this.health === 0) {
        //     /// DEATH ANIMATION LMAO
        //     /// moved section up to be a separate function that is called when health === 0
        //     console.log('dead')
        //     this.currentFrame = 0
        //     // return
        // } /// currentFrame set to 0 at the moment of playerinput/action..
                /// no need to check for it during the animation call. 

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
            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, Math.floor(-this.x + 1), Math.floor(this.y -15), -32, 32)
            ctx.restore();
        } else if (this.currentMovingDirection === null && this.lastMovingDirection === DIRS[3]) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, Math.floor(-this.x), Math.floor(this.y -15), -32, 32)
            ctx.restore();
        } else { 
            // ctx.save()
            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, Math.floor(this.x -17), Math.floor(this.y -15), 32, 32)
            // ctx.restore()
        }    
        
        
        this.framesDrawn++;
        if (this.framesDrawn >= 11){
            this.currentFrame++;
            this.framesDrawn = 0;
        }

        // if (this.health === 0) {
        //     /// DEATH ANIMATION LMAO
        //     /// moved section up to be a separate function that is called when health === 0
        //     console.log('dead')
        //     this.currentFrame = 0
            

        // }

        // this.attackBox.x = 0;
        // this.attackBox.y = 0;
 
    }



    _keydown = (event) => {
        // pay attention to notes for which sections are doing what... 
        // debugger 
        // console.log(event)
        if (!Player.prototype.keyss[event.code]) {
            Player.prototype.keyss[event.code] = event.code;
            console.log(Player.prototype.keyss[event.code])
        }

        if (this.tileMap.gameStateFocused === false){
            if (event.key === 'Escape') {
                
                if (this.tileMap.gameStateFocused === false){
                    document.getElementById('modal-button-close').click();
                }
            }
            return
            // if not focused on the game because extra info Modal is loaded, 
            // then don't take any inputs. 
        }


        if (event.key === 'ArrowUp' || event.key === 'w'){
            this.currentMovingDirection = DIRS[0];
        } else if (event.key === 'ArrowDown' || event.key === "s"){
            this.currentMovingDirection = DIRS[1];
        } else if (event.key === 'ArrowLeft' || event.key === "a"){
            if (this.health > 0) {
                this.currentMovingDirection = DIRS[3];
            }
            if (this.tileMap.bedMenu.selectionIndex === 1 && this.tileMap.paused === true){
                this.tileMap.bedMenu.selectionIndex--
                menuSelectSound.play();
            }
            if (this.tileMap.optionsMenu.selectionIndex > 0 && this.tileMap.paused === true){
                this.tileMap.optionsMenu.selectionIndex--
                menuSelectSound.play();

            }
        } else if (event.key === 'ArrowRight' || event.key === "d"){
            if (this.health > 0) {
                this.currentMovingDirection = DIRS[2];
            }
            if (this.tileMap.bedMenu.selectionIndex === 0 && this.tileMap.paused === true){
                this.tileMap.bedMenu.selectionIndex++
                menuSelectSound.play();

            }
            if (this.tileMap.optionsMenu.selectionIndex < 2 && this.tileMap.paused === true){
                this.tileMap.optionsMenu.selectionIndex++
                menuSelectSound.play();

            }
        }
        // console.log('down')

        // while (!!this.currentMovingDirection) {
        // if (this.tileMap.paused === true) {

        // }    

        

        // debugger
        if (event.key === ' ' && (this.x > 347 && this.x < 390 && this.y < 70 && this.y > 50)){
                //// TREE SHAKING OPERATIONS
            let randomChance = Math.random() * 80
            console.log(randomChance)
            treeSound.play()

            this.tileMap.shakeStatus = true;
            setTimeout(() => this.tileMap.shakeStatus = false, 300);
            if (randomChance < this.tileMap.freeFood / 2 && (this.tileMap.freeFood > 0)) {
                if (!this.counter) {
                    this.counter = 0;
                }
                this.tileMap.freeFood--;
                this.food++;
                foodSound.play()

                this.counter++;
                console.log(this.counter);
                // this.tileMap.freeFood = randomChance;
            } else if (randomChance < 0.35 && this.tileMap.freeFood === 0) {
                this.food++;
                foodSound.play()

            }
            let rando = randomIntFromInterval (1, 100)
                if (rando === 1) {
                    this.tileMap.getNextDayEnemies();
                    this.tileMap.getBadLuckEnemies();

                    badLuckSound.play();
                }
                    

        } else if (event.key === ' ' && (this.x > 88 && this.x < 145 && this.y < 210 && this.y > 190)){
            //// TREE SHAKING OPERATIONS
            treeSound.play();
            if (!this.counter) {
                this.counter = 0;
            }

            let randomChance = Math.random() * 80
            console.log(randomChance);
            this.tileMap.shakeStatus2 = true;
            setTimeout(() => this.tileMap.shakeStatus2 = false, 300);
            // setTimeout(() => {
                if (randomChance < this.tileMap.freeFood / 2 && (this.tileMap.freeFood > 0)) {
                    this.tileMap.freeFood--;
                    this.food++;
                    foodSound.play()
                    this.counter++;
                    console.log(this.counter);
                    // this.tileMap.freeFood = randomChance;
                } else if (randomChance < 0.35 && this.tileMap.freeFood === 0) {
                    this.food++;
                    foodSound.play()

                }
                let rando = randomIntFromInterval (1, 100)
                if (rando === 1) {
                    this.tileMap.getNextDayEnemies();
                    this.tileMap.getBadLuckEnemies();
                    badLuckSound.play();
                }
                    
                
            // }, 10000)
            //// BUSH SHAKING OPERATIONS

        } else if (event.key === ' ' && (this.x > 145 && this.x < 167 && this.y < 44 && this.y > 30) && this.tileMap.paused === false){
            // raccoon operations
            // debugger;
            if (this.tileMap.racStatus === false) {
                this.tileMap.racStatus = true;
                let bindedRac = this._resetRacStatus.bind(this.tileMap);

                setTimeout(bindedRac, 2000);
            }

           
        } else if (event.key === ' ' && this.tileMap.paused === false && (this.x > 110 && this.x < 129 && this.y < 110 && this.y > 55)){
                        // debugger
                /// DOOR OPERATIONS HERE
            if (this.tileMap.isDoorOpen === false){
                this.tileMap.isDoorOpen = true;
                doorSound.play();
            }
            //     if (this.tileMap.bedMenu.selectionIndex === 0){
            //         //FUNCTION TO GO TO NEXT DAY
            //         console.log('chose to go to next day near bed')
            //     } else if (this.tileMap.bedMenu.selectionIndex === 1) {
            //         this.tileMap.isDoorOpen = false;
            //         console.log('chose to remain in the same day near bed')
            //     }
            // }

            // if (this.tileMap.isDoorOpen === true) {
            //     this.tileMap.isDoorOpen = false;
                
            //     this.tileMap._updateDoorHitbox()
            //     // let papaya = this.tileMap._updateDoorHitbox.bind(this.tileMap)
            //     // setTimeout(papaya, 50000)

            //     Hitbox.updateCollisionStateToTrueIfColliding();
            //     // debugger
            //     if (this.hitbox.collisionState === true){
            
            //         this.tileMap.isDoorOpen = true;
            //     } 



            // } else {
            //     this.tileMap.isDoorOpen = true;
            // }
            
        } else if (event.key === ' ' && this.tileMap.paused === true && this.tileMap.optionsToggle === true) {
            // OPTIONS MENU FUNCTIONS
            console.log('tried to select something in the esc menu')  
            
            if (this.tileMap.optionsMenu.selectionIndex === 0){
                
               if (this.muted === false) {
                    // toggleMuteOnSound.play()
                    Sound.prototype.ALLSOUNDS.forEach( sound => sound.sound.volume = 0 )
                    toggleMuteOnSound.sound.volume = 1;
                    toggleMuteOnSound.play()

                    this.muted = true;
               } else if (this.muted === true) {
                   Sound.prototype.ALLSOUNDS.forEach( sound => sound.sound.volume = 1 );
                   toggleMuteOffSound.play();
                    this.muted = false;
               }
                

            } else if (this.tileMap.optionsMenu.selectionIndex === 1) {
                window.location.reload(false)
            } else if (this.tileMap.optionsMenu.selectionIndex === 2) {
                // LOAD MODAL EXTRA MENU WITH GITHUB AND TIPS 
                document.getElementById('modal-button').click();
                //
                //
                //
                this.tileMap.gameStateFocused = false;
            }
            /// escape menu functionality 
        } else if ((this.health > 0) && event.key === ' ' && (this.x > 90 && this.x < 100 && this.y < 60 && this.y > 46)) {
                //// BED MENU OPERATIONS
            // if (this.tileMap.paused === true){
                // if (this.tileMap.bedMenu.selectionIndex === 0){
                //     //FUNCTION TO GO TO NEXT DAY
                //     console.log('chose to go to next day near bed')
                // } else if (this.tileMap.bedMenu.selectionIndex === 1) {
                //     this.tileMap.paused = false;
                //     console.log('chose to remain in the same day near bed')
                // }
            // }
            
            if (this.tileMap.paused === false){
                this.tileMap.paused = true;
            } else {
                if (this.tileMap.bedMenu.selectionIndex === 0){
                    //FUNCTION TO GO TO NEXT DAY
                    this.tileMap.getNextDayFoodObjects();
                    this.tileMap.getNextDayEnemies();
                    this.tileMap.level ++
                    console.log('chose to go to next day near bed')
                    this.tileMap.paused = false;

                    this.food = this.food - this.targetFood - Math.floor(this.tileMap.level *.25)
                    if (this.food < 0) {
                        if (this.health > 0){
                            this.health--

                            ouchieSound.play();
                            this.vulnerable = false;
                            // console.log(this.vulnerable)
                            const binded_resetVuln = this._resetVuln.bind(this);
                            setTimeout(binded_resetVuln, 3000)
                        }

                        this.food = 0;
                        if (this.health === 0) {

                            

                            ///// update local storage here!

                            this.currentFrame = 0;
                        }
                    
                    } else {
                        if (this.health < 3 && this.food > 1) {
                            this.food--;
                            this.health++;
                            healingSound.play();
                        } else if (this.health === 3 && this.food > 1){
                            normalNextDaySound.play();
                        }

                    }
                    this.tileMap.freeFood = 10;
                    

                } else if (this.tileMap.bedMenu.selectionIndex === 1) {
                    this.tileMap.paused = false;
                    console.log('chose to remain in the same day near bed')
                }
            }

        } else if (event.key === ' ' && this.state === "idle") {
            console.log('attacking')
            swordSound.play();
            this.state = "attacking";
            this.currentFrame = 0;
            this._moveAttackBox();
            /// make an attacking animation.. attacking logic can go in here..
            /// attacking animation occurs in the gameloop engine by checking this.state. 
            // ATTACK FUNCTION HERE; not written yet because I have no enemies to test on.. 
            // will come back later.  
        } else if (event.key === 'Escape') {
            
            if (this.tileMap.paused === false) {
                this.tileMap.paused = true;
                this.tileMap.optionsToggle = true;
                optionsOpenSound.play();
            } else {
                this.tileMap.paused = false;
                this.tileMap.optionsToggle = false;
                optionsCloseSound.play();
            }
            console.log('opened options menu')
        }
        
    }

    _moveAttackBox(){
        if (this.currentMovingDirection === DIRS[2]){ // right
            this.attackBox.x = this.x + 7;
            this.attackBox.y = this.y - 4;
        } else if (this.currentMovingDirection === DIRS[0]){ // up
            this.attackBox.x = this.x - 8;
            this.attackBox.y = this.y - 15;
        } else if (this.currentMovingDirection === DIRS[1]){ // down
            this.attackBox.x = this.x - 5.5;
            this.attackBox.y = this.y + 5;
        } else if (this.currentMovingDirection === DIRS[3]){ // left
            this.attackBox.x = this.x - 18;
            this.attackBox.y = this.y - 4;
        } else {
            if (this.lastMovingDirection === DIRS[2]){        // right idle
                this.attackBox.x = this.x + 7;
                this.attackBox.y = this.y - 4;
            } else if (this.lastMovingDirection === DIRS[0]){ // up idle
                this.attackBox.x = this.x - 8;
                this.attackBox.y = this.y - 15;
            } else if (this.lastMovingDirection === DIRS[3]){ // left idle... same as right idle lmao
                this.attackBox.x = this.x - 18;
                this.attackBox.y = this.y - 4;
            } else {                                          // down idle
                this.attackBox.x = this.x - 5.5;
                this.attackBox.y = this.y + 5;
            }
        }


        // binded_resetAttackBoxPos = this._resetAttackBoxPos.bind(this);

        // setTimeout(binded_resetAttackBoxPos, 3000)

        // this.attackBox.x = 0;
        // this.attackBox.y = 0;



    }

    // _resetAttackBoxPos () {
    //     debugger
    //     this.attackBox.x = 0;
    //     this.attackBox.y = 0;
    // }

    _resetRacStatus(){
        // debugger;
        if (this.racStatus === true){
            this.racStatus = false;
        }
    }

    _resetVuln() {
        if (this.vulnerable === false) {
            // debugger
            this.vulnerable = true;
        }
    }

    _keyup = (event) => {
        Player.prototype.keyss[event.code] = null;
        
        // debugger
        if (event.code === 'Space') {
            if (this.tileMap.shakeStatus === true) {
                this.tileMap.shakeStatus = false;
            }
        } else {

            console.log('key was let go')
            // console.log('up')
            // this.lastLastMovingDirectionLmao = this.lastMovingDirection; // this doesn't work lol
            // note here.. attempting to make movement more fluid.. 

            // if (!!this.currentMovingDirection){
                this.lastMovingDirection = this.currentMovingDirection;
            // }
            
            
                this.currentMovingDirection = null;
            

            if (Object.values(Player.prototype.keyss).some((val) => !!val)){
                
                let stillHeldKey;
                Object.values(Player.prototype.keyss).forEach((value) => {
                    if (!!value) {
                        stillHeldKey = value
                    }
                })
                // console.log(stillHeldKey)
                if (this.health > 0) {
                    if (stillHeldKey === 'ArrowUp' || stillHeldKey === "w"){
                        this.currentMovingDirection = DIRS[0];
                    } else if ((stillHeldKey) === 'ArrowDown' || stillHeldKey === "s"){
                        this.currentMovingDirection = DIRS[1];
                    } else if ((stillHeldKey) === 'ArrowLeft' || stillHeldKey === "a"){
                        this.currentMovingDirection = DIRS[3];
                    } else if ((stillHeldKey) === 'ArrowRight' || stillHeldKey === "d"){
                        // debugger
                        this.currentMovingDirection = DIRS[2];
                    }

                }

                // console.log(this.currentMovingDirection)
            }
        }

    }

    

    _drawDust(ctx) {
        // ctx.drawImage(this)
        console.log(ctx)

        ctx.drawImage(this.dust, this.x + 1, this.y -15)
        // wanted to implement a dust particle effect while moving... but too much work for nothing..
        // need to focus more on functionality at this beginning state.. Can come back later maybe. 

    }



    move(ctx) { // move takes in a context to call movement specific additional drawings like dust particles. 

        // console.log([this.x, this.y])
        
        if (this.passableHitbox.detectionState === true) {
            // debugger
            this._isCollidingWithFood();
            this._isCollidingWithAttack();
        }
        

        if (Object.values(Player.prototype.keyss).some((val) => !!val) ){

            if (!!this.currentMovingDirection){

                
                // let oldX = this.x;
                // let oldY = this.y;
                
                this.y = this.currentMovingDirection[1]* this.velocity + this.y; 
                this.x = this.currentMovingDirection[0]* this.velocity + this.x;
                this.hitbox.x = this.x;
                this.hitbox.y = this.y;
                this.passableHitbox.x = this.x;
                this.passableHitbox.y = this.y;
                // this.attackBox.x = this.x;
                // this.attackBox.y = this.y;
                Hitbox.updateCollisionStateToTrueIfColliding()
                
                while (this.hitbox.collisionState === true) {
                    // debugger
                    this.y = this.currentMovingDirection[1]*(-1)* this.velocity + this.y; 
                    this.x = this.currentMovingDirection[0]*(-1)* this.velocity + this.x;
                    this.hitbox.x = this.x;
                    this.hitbox.y = this.y;
                    this.passableHitbox.x = this.x;
                    this.passableHitbox.y = this.y;
                    // this.attackBox.x = this.x;
                    // this.attackBox.y = this.y;
                    Hitbox.updateCollisionStateToTrueIfColliding();


                    // debugger
                    return
                }

                // this._drawDust(ctx); // see note in _drawDust.

                // if (this.hitbox.collisionState === true) {
                //     // debugger
                //     this.y = this.currentMovingDirection[1]*(-1)* this.velocity + this.y; 
                //     this.x = this.currentMovingDirection[0]*(-1)* this.velocity + this.x;
                //     this.hitbox.x = this.x;
                //     this.hitbox.y = this.y;
                //     // debugger
                // }


            }

            if (!(this.x > 90 && this.x < 129 && this.y < 110 && this.y > 55)){
                this.tileMap.isDoorOpen = false;
                // doorSound.play();
            } // autocloses door if out of the coordinates. 

            
            // console.log([this.x, this.y])
            // console.log(this.x)
            // console.log(this.y)
            // console.log(this.currentMovingDirection)
        }
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
                if(questionedDetection.tiedObj.constructor.name === "Skeleton" 
                    && questionedDetection.constructor.name === "AttackBox"){
                        
                        console.log('Attacked by skeleton');
                        this.health--;
                        if (this.health < 0) {
                            this.health = 0;f
                        }
                        ouchieSound.play();
                        if (this.health === 0) {


                            //// update local storage here


                            this.currentFrame = 0;
                            this.hitbox.x = 0;
                            this.hitbox.y = 0;
                        }
                        this.vulnerable = false;
                        let binded_resetVuln = this._resetVuln.bind(this);

                        setTimeout(binded_resetVuln, 3000)

                        // play hurt sound here. 

                }

            }
            



        }

    }

    _isCollidingWithFood() {
        if (this.passableHitbox.detectionState === true) {
            let detections = this.passableHitbox._detectingWhat();

            for(let i = 0; i < detections.length; i++) {
                let questionedItem = detections[i];
                // debugger
                if (questionedItem.tiedObj.constructor.name === "Consumable") {
                    console.log('food/consumable detected by player');
                    this.food++;
                    foodSound.play();
                    if (this.food > 99) {
                        this.food = 99;
                    }
                    // questionedItem.tiedObj.hitbox = null;
                    // questionedItem.tiedObj.passableHitbox = null;
                    questionedItem.tiedObj.hitboxes.x = 0;
                    questionedItem.tiedObj.hitboxes.y = 0;
                    questionedItem.tiedObj.x = 0;
                    questionedItem.tiedObj.y = 0;
                    questionedItem.x = 0;
                    questionedItem.y = 0;
                    // debugger;
                    // questionedItem.tiedObj = null;
                    // questionedItem.x = null;
                    // questionedItem.y = null;
                    console.log(PassableHitbox.prototype.PASSABLEHITBOXES);
                    // this.passableHitbox.detectionState = false;
                    // debugger
                }
            }

        }
    }

}


export default Player