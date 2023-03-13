class OptionsMenu {
    constructor(tileMap){

        this.tileMap = tileMap;

        this.selectionIndex = 0;

        this.optionsMenu = new Image ();
        this.optionsMenu.src = './src/graphics/menus/optionsMenu.png'

        this.aliveStatusImage = new Image();
        this.aliveStatusImage.src = './src/graphics/menus/aliveStatus.png'

        this.deadStatusImage = new Image();
        this.deadStatusImage.src = './src/graphics/menus/deadStatus.png'

        this.cursor = new Image();
        this.cursor.src = './src/graphics/NinjaAdventure/HUD/NinePathRect/DialogueBubble.png'

        this.options = [
            "volume",
            "new game"
        ]

    }


    drawOptions(ctx) {
        ctx.drawImage(this.optionsMenu, 0, 0);
    }

    drawAliveStatus(ctx) {
        ctx.drawImage(this.aliveStatusImage,0,0);
    }

    drawDeadStatus(ctx) {
        ctx.drawImage(this.deadStatusImage,0,0);
    }
}

export default OptionsMenu;