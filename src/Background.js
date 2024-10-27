//draws background in
//animation
//getAnimationFrame
//write gameLoop function

export default class Background {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.speed = speed;

    this.x = 0;
    this.y = 0;

    this.bgImage = new Image();
    this.bgImage.src = "Hello-World-2024/backgroundImage";
  }
}
