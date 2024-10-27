const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 200;
const SPRITE_WIDTH = 88 / 1.5;
const SPRITE_HEIGHT = 94 / 1.5;
let player = null;
let scaleRatio = null;

function createSprites(){
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
    
    player = new Player(ctx, playerWidthInGame, playerHeightInGame, scaleRatio);
}

player.draw();

function setScreen(){
    scaleRatio = getScaleRatio();
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
