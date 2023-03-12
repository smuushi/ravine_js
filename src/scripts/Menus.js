
import TileMap from "./TileMap";

class BedMenu {

    constructor (tileMap) {

        this.nextDayMenuImg = new Image ();
        this.nextDayMenuImg.src = './src/graphics/menus/nextdaymenu.png'
        this.selectionIndex = 1;
        this.cursor = new Image();
        this.cursor.src = './src/graphics/NinjaAdventure/HUD/NinePathRect/DialogueBubble.png'
        
        this.options = [
            "yes",
            "no"
        ];


        this.tileMap = tileMap;


    }

    draw(ctx) {

        ctx.drawImage(this.nextDayMenuImg, 0, 0)

        if (this.selectionIndex === 0) {
            ctx.drawImage(this.cursor, 120, 97)
        } else if (this.selectionIndex === 1) {
            ctx.drawImage(this.cursor, 265, 97)
        }



    }


    


}

export default BedMenu