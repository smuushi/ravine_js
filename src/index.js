import TileMap from "./scripts/TileMap";
import Player from './scripts/Player';
import UserInterface from "./scripts/UserInterface";
import Hitbox from './scripts/utils';


import PassableHitbox from "./scripts/foodUtils";
import Consumable from "./scripts/Consumable";
import EnvObject from "./scripts/EnvObject";

import BedMenu from "./scripts/Menus";
import OptionsMenu from "./scripts/Options";
import Sound from "./scripts/musics";

document.addEventListener("DOMContentLoaded", () => { // waiting for stuff to load first. lmao

    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".btn-open");
    const closeModalBtn = document.querySelector(".btn-close");
    

    const openModal = function () {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    };

    const closeModal = function () {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        this.gameStateFocused = true;

    };

    openModalBtn.addEventListener("click", openModal);
    const tileSize = 16;
    const theTileMapInstance = new TileMap(tileSize);
    closeModalBtn.addEventListener("click", closeModal.bind(theTileMapInstance));


    console.log('hello world')
    console.log('hellos from index')

// game info so far... 
// map size will be 30 x 20 squares. 
// tile size 16 x 16 pixels also. 

const canvas = document.getElementById('game-canvas'); // gathered my html elements that I will be working in. 
const ctx = canvas.getContext('2d'); // all rendering takes place on the ctx. 


const player = theTileMapInstance.getPlayer(1.13);
const nextDayMenu = new BedMenu(theTileMapInstance);
const theOptionsMenu = new OptionsMenu(theTileMapInstance);
theTileMapInstance.bedMenu = nextDayMenu; // THIS IS AN IMPORTANT LINE OF CODE.. ughhh lmaoooo haha
theTileMapInstance.optionsMenu = theOptionsMenu; // by convention now.. all menus will be made this way lmaoo
                                                 // it's important to tie the menus to the tileMap so that the player inputs can reference it when making their selections.. 
theTileMapInstance.player = player; // this is also vital for skeleton pathing.. lmao

const userInter = new UserInterface(theTileMapInstance, player);

const envObjects = theTileMapInstance.getObjects();
// console.log(player);
// debugger


// if (!EnvObject.prototype.INTERACTIVEITEMS){
const foodItems = EnvObject.prototype.INTERACTIVEITEMS;
// }
            

const hitboxes = Hitbox.prototype.ALLHITBOXESMADE;
const passableHitboxes = PassableHitbox.prototype.PASSABLEHITBOXES;

const gameOverMusic = new Sound('./src/graphics/NinjaAdventure/Musics/14 - Curse.ogg') 

function gameRender() { // layer draw calls to create layers
    
    
    if (theTileMapInstance.paused === false) {

        theTileMapInstance.draw(ctx)
    
        foodItems.forEach((food) => food._drawFood(ctx));
        // debugger
        // player.animate(ctx)
        // console.log("hello")
        // player.move(ctx);
        // player.animate(ctx)
        let aliveEnemies = theTileMapInstance.enemies.filter((enemy) => enemy.health > 0)
        let deadEnemies = theTileMapInstance.enemies.filter((enemy) => enemy.health <= 0)
        // console.log(aliveEnemies);
        
        deadEnemies.forEach((enemy) => {
            enemy.animateDeath(ctx)
            enemy.hitbox.x = 0;
            enemy.hitbox.y = 0;
        })
        
        aliveEnemies.forEach((enemy) => {

            if(enemy.vulnerable === true) {
                
                if (enemy.aggressionState === "idle"){
                    enemy.animate(ctx);
                } else if (enemy.aggressionState === "aggro") {
                    enemy.animateAttack(ctx);
                }
                
            } else if (enemy.vulnerable === false) {
                
                enemy.framesDrawn++
                if (enemy.framesDrawn % 3 === 0) {
                    if (enemy.aggressionState === "idle"){
                        enemy.animate(ctx);
                    } else if (enemy.aggressionState === "aggro") {
                        enemy.animateAttack(ctx);
                    }
                }
            } 
            
            if (enemy.health > 0){
                enemy.move();
            }
            
        })

        // aliveEnemies.forEach((enemy) => enemy.move())



        if (player.vulnerable === true) {
            // console.log('player IS VULNERABLE')
        } else if (player.vulnerable === false) {
            // console.log('player is invulnerable')
        }

        // console.log(theTileMapInstance.enemies)
        // console.log(player)
        
        if (player.health === 0) {

            // player.currentFrame = 0;
            player.animateDeath(ctx);

            gameOverMusic.play();

            // aliveEnemies.forEach((enemy) => enemy.move())

        } else {
            player.move(ctx);

            if (player.vulnerable === false){ 
                // debugger
                player.framesDrawn++
                if (player.framesDrawn % 2 === 0) {
                    // player.currentFrame++
                    if (player.state === "idle"){
                        // debugger
                        player.animate(ctx);
                    } else if (player.state === "attacking"){
                        console.log('animating attacks')
                        player.animateAttack(ctx);
                    }
                } 
            } else if (player.vulnerable === true) {
                if (player.state === "idle"){
                    player.animate(ctx);
                } else if (player.state === "attacking"){
                    console.log('animating attacks')
                    player.animateAttack(ctx);
                }
            }


        }
        
        theTileMapInstance.draw2(ctx);
    
    } else {
        console.log("paused!")
        if (theTileMapInstance.optionsToggle === false) {
            nextDayMenu.draw(ctx);
            // render pause next day menu here!
        } else if (theTileMapInstance.optionsToggle === true) {
            theOptionsMenu.drawOptions(ctx);
            // console.log(player.health)
            // debugger
            if (player.health === 0) {
                // debugger
                theOptionsMenu.drawDeadStatus(ctx);

            } else if (player.health > 0) {
                theOptionsMenu.drawAliveStatus(ctx);
            }
        }
    }

    userInter.drawControls(ctx);
    userInter.drawDays(ctx);
    userInter.drawFoodAmt(ctx);
    userInter.drawHealthAmt(ctx);






    // envObjects.forEach((obj) => obj.drawHitboxes(ctx));
    
    //below lines will draw hitboxes.. comment them out to disable hitbox rendering
        // player.hitbox._debugDraw(ctx)
        // hitboxes.forEach((box) => box._debugDraw(ctx));
        // passableHitboxes.forEach((box) => box._debugDraww(ctx));

    // console.log(hitboxes);
    Hitbox.updateCollisionStateToTrueIfColliding();
    PassableHitbox.updateDetectionStateToTrueIfDetecting();
    
    
    


}

theTileMapInstance.setCanvasSize(canvas);

setInterval(gameRender, 1000/75);

// order logic =>

// TileMap.js handles rendering logic. 
// hitboxes handles collision detection only!
// each class will have their own move() function which will handle collision logic and what to do.
// separate player class. with a hitbox instance tied on an attribute. 
// separate envionmental objects class. with a hitbox also tied. 
// 

// to do list: 
// write out hitbox collision detection logic and refactor player.move() code to account. 
// current problem is that in order to update collision, I need to iterate through all combinations of 
// hitboxes... so I need to find a way of collecting them as they're created... 
// look up a way of exporting an updatable class constant that I can use in the gameRender callback.

// above done by the end of Friday!


// next to do list.. 
// create a food item that will render and place itself based on the tilemap.. 
// after creating the note below, I will also extend this food item from the env objects class. 
// we'll call it 'consumable'
//
// create a new day functionality.. 
// ^ will necessitate a rendering and processing of an object that will allow the player to sleep. 
// ^ will not sure if this will be a custom environmental object.. maybe I can do that by extending the class. 

// food was done!... and picking up the food is tracking well... 
// I just need to add the new day functionality now. 
// I added a space to better contextualize where things will go.. So I added a room. 
// Going to add a bed that will result in a menu prompt that will go to the next day and let the player spend their
// collected surplus food on upgrades to speed, health, luck, and attacking. 

})

