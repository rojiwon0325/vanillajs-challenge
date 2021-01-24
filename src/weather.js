const API_KEY = "9a4e6274b1a8a9debc0f30c30f7a5e28";
const COORDS = "coords";

const weather = document.getElementById("weather");

function getWeather(latitude, longtitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${API_KEY}&units=metrics`).then(
        response => {
            return response.json();
        }).then(json => {
            const temp = json.main.temp;
            const place = json.name;
            weather.innerText = `${temp} @ ${place}`;
        });
}


function handleGeoSucces(position) {
    const coordsObj = {
        latitude: position.coords.latitude,
        longtitude: position.coords.longtitude
    };
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGelError(position) {
    console.log("fail");
}


function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGelError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longtitude);
    }
}

function init() {
    loadCoords();
}

init();