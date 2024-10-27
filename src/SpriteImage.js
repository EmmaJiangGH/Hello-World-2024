//draws sprite onto webpage
export default class Player {
    constructor(ctx,width, height, scaleRatio){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.scaleRatio = scaleRatio;

        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio;

        this.standingStillImage = new Image();
        this.standingStillImage.src = "images/standing_still.png";
        this.image = this.standingStillImage;
    }
    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
//func loop thru animation
