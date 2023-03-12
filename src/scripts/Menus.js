
import TileMap from "./TileMap";

class BedMenu {

    constructor (tileMap) {

        this.nextDayMenuImg = new Image ();
        this.nextDayMenuImg.src = './src/graphics/menus/nextdaymenu.png'
        this.selection_index = 0;
        
        this.options = [
            "yes",
            "no"
        ];


        this.tileMap = tileMap;


    }

    draw(ctx) {

        ctx.drawImage(this.nextDayMenuImg, 0, 0)

    }


    


}

export default BedMenu