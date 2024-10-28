//draws sprite onto webpage
export default class SpriteImage {
    WALK_ANIMATION_TIMER = 200;
    walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    spriteRunImages = [];
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

        const spriteRunImage1 = new Image();
        spriteRunImage1.src = "images/sprint_run1.png";

        const sprintRunImage2 = new Image();
        sprintRunImage2.src = "images/sprint_run2.png";

        this.spriteRunImages.push(spriteRunImage1);
        this.spriteRunImages.push(spriteRunImage2);
    }

    update (gameSpeed, frameTimeDelta){
        this.run(gameSpeed, frameTimeDelta);
    }

    run(gameSpeed, frameTimeDelta){
        if(this.walkAnimationTimer <= 0){
            if(this.image = this.spriteRunImages[0]){
                this.image = this.spriteRunImages[1]
            }else{
            this.image = this.spriteRunImages[0];
        }
            this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    }
    this.walkAnimationTimer -= frameTimeDelta * gameSpeed;

    }
    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
//func loop thru animation
