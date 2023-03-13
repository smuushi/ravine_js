import PassableHitbox from "./foodUtils";

class AttackBox extends PassableHitbox {

    constructor(x, y, width, height, tiedObj, xOffset = 0, yOffset = 0) {
        super(x, y, width, height, tiedObj, xOffset, yOffset);


    }
 


}

export default AttackBox;