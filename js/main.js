// var image = new Image();
// image.src = '../img/amsterReflection.jpg';

var img = document.getElementById('working');
img.onload = cutImageUp;
var width = img.clientWidth;
var height = img.clientHeight;

function cutImageUp() {
    var imagePieces = [];
    for(var x = 0; x < 3; ++x) {
        for(var y = 0; y < 3; ++y) {
            var canvas = document.createElement('canvas');
            canvas.width = width/3;
            canvas.height = height/3;
            var context = canvas.getContext('2d');
            context.drawImage(img, x * width/3, y * height/3, width/3, height/3, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }

    // imagePieces now contains data urls of all the pieces of the image

    // load one piece onto the page
    var size = imagePieces.size;
    alert(size);
    var anImageElement = document.getElementById('newImage');
    anImageElement.src = imagePieces[0];
}

setTimeout(function(){ alert(width); }, 3000);
setTimeout(cutImageUp, 5000);
