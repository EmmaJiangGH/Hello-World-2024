const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const backgroundImg = new Image();
backgroundImg.src = "../images/bg.jpg";

let backgroundX = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(backgroundImg, backgroundX, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, backgroundX + canvas.width, 0, canvas.width, canvas.height);

    backgroundX -= 2;

    if (backgroundX <= -canvas.width) {
        backgroundX = 0;
    }

    requestAnimationFrame(draw);
}

backgroundImg.onload = () => {
    draw();
};
