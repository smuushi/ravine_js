class UserInterface {

    // the point of this class file is to constantly display the controls of
    // space to interact, escape to reach options, 
    // as well as constantly display/draw the player health and player collected food amount. 

    // player is linked as an attribute to keep track of those updates. 
    // not too sure why I need to link the tileMap... I just forgot why, but Im sure i'll run into it lmaooo

    constructor(tileMap, player) {
        this.tileMap = tileMap;
        this.player = player;

        this.controls = new Image();
        this.controls.src = './src/graphics/userinterface/basicControlsDraft2.png'

        this.dayOnesNums = [
            new Image(),
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
        this.dayOnesNums[0].src = './src/graphics/userinterface/days/dayones0.png'
        this.dayOnesNums[1].src = './src/graphics/userinterface/days/dayones1.png'
        this.dayOnesNums[2].src = './src/graphics/userinterface/days/dayones2.png'
        this.dayOnesNums[3].src = './src/graphics/userinterface/days/dayones3.png'
        this.dayOnesNums[4].src = './src/graphics/userinterface/days/dayones4.png'
        this.dayOnesNums[5].src = './src/graphics/userinterface/days/dayones5.png'
        this.dayOnesNums[6].src = './src/graphics/userinterface/days/dayones6.png'
        this.dayOnesNums[7].src = './src/graphics/userinterface/days/dayones7.png'
        this.dayOnesNums[8].src = './src/graphics/userinterface/days/dayones8.png'
        this.dayOnesNums[9].src = './src/graphics/userinterface/days/dayones9.png'


        this.dayTensNums = [
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
        ]
        this.dayTensNums[0].src = './src/graphics/userinterface/days/daytens0.png'
        this.dayTensNums[1].src = './src/graphics/userinterface/days/daytens1.png'
        this.dayTensNums[2].src = './src/graphics/userinterface/days/daytens2.png'
        this.dayTensNums[3].src = './src/graphics/userinterface/days/daytens3.png'
        this.dayTensNums[4].src = './src/graphics/userinterface/days/daytens4.png'
        this.dayTensNums[5].src = './src/graphics/userinterface/days/daytens5.png'
        this.dayTensNums[6].src = './src/graphics/userinterface/days/daytens6.png'
        this.dayTensNums[7].src = './src/graphics/userinterface/days/daytens7.png'
        this.dayTensNums[8].src = './src/graphics/userinterface/days/daytens8.png'
        this.dayTensNums[9].src = './src/graphics/userinterface/days/daytens9.png'
        

        this.foodOnesNums = [
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
        ]
        this.foodTensNums = [
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
        ]
        

        

    }

    drawControls (ctx) {
        ctx.drawImage(this.controls, 0, 0)
    }

    drawDays(ctx) {
        let onesNum = this.tileMap.level % 10;
        let tensNum = (this.tileMap.level - onesNum) / 10;
        ctx.drawImage(this.dayOnesNums[onesNum], 0, 0)
        ctx.drawImage(this.dayTensNums[tensNum], 0, 0)
    }





}

export default UserInterface;