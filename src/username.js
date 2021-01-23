const form_username = document.getElementById("username-input"),
    input_username = form_username.querySelector("input"),
    text_username = document.getElementById("username-text");

const LS_USERNAME = "username";

function handleSubmit(event) {
    event.preventDefault();
    const username = input_username.value;
    localStorage.setItem(LS_USERNAME, username);
    setName(username);
    console.log(username);
    input_username.setAttribute("hidden", true);
    text_username.removeAttribute("hidden");
}

function setName(text) {
    text_username.innerText = `안녕하세요! ${text}님 좋은하루 보내세요!`;
}

function init() {
    const loadedname = localStorage.getItem(LS_USERNAME);
    form_username.addEventListener("submit", handleSubmit);
    if (loadedname === null) {
        input_username.removeAttribute("hidden");
        text_username.setAttribute("hidden", true);
    } //사용자 이름이 없는 경우
    else {
        text_username.removeAttribute("hidden");
        setName(loadedname);
        input_username.setAttribute("hidden", true);
    } //사용자 이름이 있는 경우
}

init();