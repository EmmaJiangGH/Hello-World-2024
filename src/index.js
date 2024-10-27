import Background from "./Background.js";
import SpriteImage from "./SpriteImage.js";

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 200;
const SPRITE_WIDTH = 88 / 1.5;
const SPRITE_HEIGHT = 94 / 1.5;
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const BG_WIDTH = 600;
const BG_HEIGHT = 234;
const BG_SPEED = 0.3;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let sprite = null;
let scaleRatio = null;
let previousTime = null;

function createSprites(){
    const spriteWidthInGame = SPRITE_WIDTH * scaleRatio;
    const spriteHeightInGame = SPRITE_HEIGHT * scaleRatio;
    
    sprite = new SpriteImage(ctx, spriteWidthInGame, spriteHeightInGame, scaleRatio);

    const bgWidthInGame = BG_WIDTH * scaleRatio;
    const bgHeightInGame = BG_HEIGHT * scaleRatio;

    bg = new Background(ctx, bgWidthInGame, bgHeightInGame, BG_SPEED, scaleRatio);
}

//Draw objects
sprite.draw();
bg.draw();

function setScreen(){
    scaleRatio = getScaleRatio();
    createSprites();
}

function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

function getScaleRatio(){
    const screenHeight = Math.min(
        window.innerHeight, 
        document.documentElement.clientHeight
    );
    const screenWidth = Math.min(
        window.innerWidth, 
        document.documentElement.clientWidth
    )
}

function gameLoop(currentTime) {
    if(previousTime === null) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    clearScreen();

    //update game objects
    bg.update();

    
    requestAnimationFrame(gameLoop);
}
    
