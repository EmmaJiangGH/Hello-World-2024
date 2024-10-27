

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 200;
const SPRITE_WIDTH = 88 / 1.5;
const SPRITE_HEIGHT = 94 / 1.5;
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const bgWidth = 600;
const bgHeight = 234;
const bgSpeed = 0.3;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let sprite = null;
let scaleRatio = null;

function createSprites(){
    const spriteWidthInGame = SPRITE_WIDTH * scaleRatio;
    const spriteHeightInGame = SPRITE_HEIGHT * scaleRatio;
    
    sprite = new SpriteImage(ctx, spriteWidthInGame, spriteHeightInGame, scaleRatio);
}

sprite.draw();

function setScreen(){
    scaleRatio = getScaleRatio();
    createSprites();
}

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
