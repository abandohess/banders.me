const PUZZLEDIFFICULTY = 4;
const PUZZLEHOVERTINT = '#009900';

var canvas;
var stage;

var img;
var pieces;
var puzzleWidth;
var puzzleHeight;
var pieceWidth;
var pieceHeight;
var currentPiece;
var currentDropPiece;

var realPuzzleWidth;
var realPuzzleHeight;
var realPieceWidth;
var realPieceHeight;

var mouse;

function init(){
    img = new Image();
    img.addEventListener('load',onImage,false);
    img.src = "img/amsterReflection.jpg";
}

function onImage(e){
    pieceWidth = Math.floor(img.width / PUZZLEDIFFICULTY);
    pieceHeight = Math.floor(img.height / PUZZLEDIFFICULTY);
    puzzleWidth = pieceWidth * PUZZLEDIFFICULTY;
    puzzleHeight = pieceHeight * PUZZLEDIFFICULTY;
    setCanvas();
    initPuzzle();
}

function setCanvas(){
    canvas = document.getElementById('canvas');
    stage = canvas.getContext('2d');
    canvas.width = puzzleWidth;
    canvas.height = puzzleHeight;
    canvas.style.border = "8px solid #1abc9c";
    canvas.style.borderRadius = "8px";
}

function initPuzzle(){
    pieces = [];
    mouse = {x:0,y:0};
    currentPiece = null;
    currentDropPiece = null;

    realPieceWidth = Math.floor(canvas.clientWidth / PUZZLEDIFFICULTY);
    realPieceHeight = Math.floor(canvas.clientHeight / PUZZLEDIFFICULTY);
    realPuzzleWidth = pieceWidth * PUZZLEDIFFICULTY;
    realPuzzleHeight = pieceHeight * PUZZLEDIFFICULTY;

    stage.drawImage(img, 0, 0, puzzleWidth, puzzleHeight, 0, 0, puzzleWidth, puzzleHeight);

    // console.log("puzzleWidth: " + canvas.clientWidth);
    // console.log("puzzleHeight: " + canvas.clientHeight);
    // console.log("pieceWidth: " + pieceWidth);
    // console.log("pieceHeight: " + pieceHeight);

    //createTitle("Click to Start Puzzle");
    buildPieces();
}

function buildPieces(){
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    var realXPos = 0;
    var realYPos = 0;
    for(i = 0;i < (PUZZLEDIFFICULTY * PUZZLEDIFFICULTY);i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        piece.realSx = realXPos;
        piece.realSy = realYPos;

        console.log("(x, y): (" + piece.sx + ", " + piece.sy + ")");
        pieces.push(piece);
        xPos += pieceWidth;
        realXPos += realPieceWidth
        if(xPos >= puzzleWidth){
            xPos = 0;
            yPos += pieceHeight;
            realXPos = 0;
            realYPos += realPieceHeight;
        }
    }
    document.getElementById("shuffle").onmousedown = shufflePuzzle;
}

function shufflePuzzle(){
    pieces = shuffleArray(pieces);
    stage.clearRect(0,0,puzzleWidth,puzzleHeight);
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    var realXPos = 0;
    var realYPos = 0;
    stage.lineWidth=10;
    stage.strokeStyle="#1abc9c"
    for(i = 0;i < pieces.length-1;i++){
        piece = pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        piece.realXPos = realXPos;
        piece.realYPos = realYPos;
        stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, xPos, yPos, pieceWidth, pieceHeight);
        stage.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
        xPos += pieceWidth;
        realXPos += realPieceWidth;
        if(xPos >= puzzleWidth){
            xPos = 0;
            yPos += pieceHeight;
            realXPos = 0;
            realYPos += realPieceHeight;
        }
    }
    //document.getElementById("canvas").addEventListener("mousedown", onPuzzleClick);
    document.getElementById("canvas").onmousedown = onPuzzleClick;
}

function shuffleArray(o){
    for(var j, x, i = o.length-1; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function onPuzzleClick(e){
    mouse.x = e.layerX;
    mouse.y = e.layerY;
    console.log("mouse: (" + e.layerX + ", " + e.layerY + ")");
    currentPiece = checkPieceClicked();
    if(currentPiece != null){
        stage.clearRect(currentPiece.xPos, currentPiece.yPos, pieceWidth, pieceHeight);
        stage.save();
        stage.globalAlpha = .9;
        stage.drawImage(img,  currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
        stage.restore();
        document.onmousemove = updatePuzzle;
        document.onmouseup = pieceDropped;
    }
}

function checkPieceClicked(){
    var i;
    var piece;
    for(i = 0;i < pieces.length;i++){
        piece = pieces[i];
        if(mouse.x < piece.realXPos || mouse.x > (piece.realXPos + realPieceWidth) || mouse.y < piece.realYPos || mouse.y > (piece.realYPos + realPieceHeight)){
            //PIECE NOT HIT
        }
        else{
            return piece;
        }
    }
    return null;
}

function updatePuzzle(e){
    currentDropPiece = null;
    if(e.layerX || e.layerX == 0){
        mouse.x = e.layerX - canvas.offsetLeft;
        mouse.y = e.layerY - canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        mouse.x = e.offsetX - canvas.offsetLeft;
        mouse.y = e.offsetY - canvas.offsetTop;
    }
    stage.clearRect(0,0,puzzleWidth,puzzleHeight);
    var i;
    var piece;
    for(i = 0;i < pieces.length;i++){
        piece = pieces[i];
        if(piece == currentPiece){
            continue;
        }
        stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        stage.strokeRect(piece.xPos, piece.yPos, pieceWidth,pieceHeight);
        if(currentDropPiece == null){
            if(mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) || mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight)){
                //NOT OVER
            }
            else{
                currentDropPiece = piece;
                stage.save();
                stage.globalAlpha = .4;
                stage.fillStyle = PUZZLEHOVERTINT;
                stage.fillRect(currentDropPiece.xPos,currentDropPiece.yPos,pieceWidth, pieceHeight);
                stage.restore();
            }
        }
    }
    stage.save();
    stage.globalAlpha = .6;
    stage.drawImage(img, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
    stage.restore();
    stage.strokeRect( mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth,pieceHeight);
}

function pieceDropped(e){
    document.onmousemove = null;
    document.onmouseup = null;
    if(currentDropPiece != null){
        var tmp = {xPos:currentPiece.xPos,yPos:currentPiece.yPos};
        currentPiece.xPos = currentDropPiece.xPos;
        currentPiece.yPos = currentDropPiece.yPos;
        currentDropPiece.xPos = tmp.xPos;
        currentDropPiece.yPos = tmp.yPos;
    }
    resetPuzzleAndCheckWin();
}

function resetPuzzleAndCheckWin(){
    stage.clearRect(0,0,puzzleWidth,puzzleHeight);
    var gameWin = true;
    var i;
    var piece;
    for(i = 0;i < pieces.length;i++){
        piece = pieces[i];
        stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        stage.strokeRect(piece.xPos, piece.yPos, pieceWidth,pieceHeight);
        if(piece.xPos != piece.sx || piece.yPos != piece.sy){
            gameWin = false;
        }
    }
    if(gameWin){
        setTimeout(gameOver,500);
    }
}

function gameOver(){
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
    initPuzzle();
}
