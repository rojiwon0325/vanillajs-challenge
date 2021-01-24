const body = document.querySelector("body");

const NUM_IMG = 3;
let number = 0;
const img = new Image();
img.onload = function () {
    body.style.backgroundImage = `url(${img.src})`;
}

function paintRandomImage() {
    const temp = Math.floor(Math.random() * (NUM_IMG - 1));
    if (number === temp) {
        number += 1;
    } else {
        number = temp;
    }
    img.src = `https://raw.githubusercontent.com/nomadcoders/js-basics/d8ad31037afdf700b7a02360ff8a05c243fbfdcc/images/${number + 1}.jpg`;
}

function init() {
    img.src = `https://raw.githubusercontent.com/nomadcoders/js-basics/d8ad31037afdf700b7a02360ff8a05c243fbfdcc/images/${number + 1}.jpg`;
    setInterval(paintRandomImage, 5000);
}

init();