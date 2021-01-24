const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";
const COORDS = "coords";

const weather = document.getElementById("weather");

function getWeather(latitude, longtitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${API_KEY}&units=metrics`).then(
        response => {
            return response.json();
        }).then(json => {
            weather.innerText = `${json.main.temp} @ ${json.name}`;
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