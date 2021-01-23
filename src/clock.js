
const time = document.getElementById("time"),
    time_h = document.getElementById("time_h"),
    time_m = document.getElementById("time_m"),
    time_s = document.getElementById("time_s");


function getTime() {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    time_h.innerText = `${hour < 10 ? `0${hour}` : `${hour}`}`;
    time_m.innerText = `:${min < 10 ? `0${min}` : `${min}`}:`;
    time_s.innerText = `${sec < 10 ? `0${sec}` : `${sec}`}`;


}

function init() {
    getTime();
    setInterval(getTime, 100);
}

init();