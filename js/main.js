// var image = new Image();
// image.src = '../img/amsterReflection.jpg';

var img = document.getElementById('working');
var width = img.clientWidth;
var height = img.clientHeight;

function cutImageUp() {
    var imagePieces = [];
    for(var x = 0; x < 2; ++x) {
        for(var y = 0; y < 2; ++y) {
            var canvas = document.createElement('canvas');
            canvas.width = width/2;
            canvas.height = height/2;
            var context = canvas.getContext('2d');
            context.drawImage(img, x * width/2, y * height/2, width/2, height/2, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }

    // imagePieces now contains data urls of all the pieces of the image

    // load one piece onto the page
    var size = imagePieces.size;
    console.log(size);
    var anImageElement1 = document.getElementById('piece1');
    anImageElement1.src = imagePieces[0];
    var anImageElement2 = document.getElementById('piece2');
    anImageElement2.src = imagePieces[1];
    var anImageElement3 = document.getElementById('piece3');
    anImageElement3.src = imagePieces[2];
    var anImageElement4 = document.getElementById('piece4');
    anImageElement4.src = imagePieces[3];
    var anImageElement5 = document.getElementById('piece5');
    anImageElement5.src = imagePieces[4];
    var anImageElement6 = document.getElementById('piece6');
    anImageElement6.src = imagePieces[5];
    var anImageElement7 = document.getElementById('piece7');
    anImageElement7.src = imagePieces[6];
    var anImageElement8 = document.getElementById('piece8');
    anImageElement8.src = imagePieces[7];
    var anImageElement9 = document.getElementById('piece9');
    anImageElement9.src = imagePieces[8];
}

setTimeout(function(){ alert(width); }, 3000);
setTimeout(cutImageUp, 5000);
