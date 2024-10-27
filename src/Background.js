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
    this.image = new Image();
    this.image.src = './images/bg.jpg';

    this.x = 0;
    this.y = 0;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);

    if(this.x < -this.width) {
      this.x = 0;
    }
  }

  update(frameTimeDelta) {
    this.x -= this.speed * frameTimeDelta * this.scaleRatio;
  }

}
