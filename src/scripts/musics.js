class Sound {

    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        this.play = function() {
            this.sound.play();
        }
        

        this.stop = function() {
            this.sound.pause();
        }

        if (!Sound.prototype.ALLSOUNDS) {
            Sound.prototype.ALLSOUNDS = [];
        }

        Sound.prototype.ALLSOUNDS.push(this);
    }

}

export default Sound;