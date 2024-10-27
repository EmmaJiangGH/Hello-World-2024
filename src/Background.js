//draws background in
//animation
//getAnimationFrame
//write gameLoop function

export default class Background {
  constructor(ctx, width, height, speed, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.scaleRatio = scaleRatio;

    this.x = 0;
    this.y = 0;

    this.bgImage = new Image();
    this.bgImage.src = '/images/backgroundImage.jpg';
  }

  draw() {
    this.ctx.drawImage(this.bgImage, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.bgImage, this.x + this.width, this.y, this.width, this.height);

    if(this.x < -this.width) {
      this.x = 0;
    }
  }

  update(frameTimeDelta) {
    this.x -= this.speed * frameTimeDelta * this.scaleRatio;
  }
}
