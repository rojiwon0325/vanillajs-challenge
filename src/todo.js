const form_todo = document.getElementById("todo-input"),
    input_todo = form_todo.querySelector("input");

const pendinglist = document.getElementById("pendinglist"),
    finishedlist = document.getElementById("finishedlist");

const LS_PendingTask = "PendingTask",
    LS_FinishedTask = "FinishedTask";

let PTlist = [], FTlist = [], globalId = 1;

function saveTask() {
    localStorage.setItem(LS_PendingTask, JSON.stringify(PTlist));
    localStorage.setItem(LS_FinishedTask, JSON.stringify(FTlist));
}

function deleteTask(event) {
    const btn = event.target,
        li = btn.parentNode,
        ul = li.parentNode;

    if (ul.id === "pendinglist") {
        PTlist = PTlist.filter(task => {
            return parseInt(li.id) !== task.id;
        });
        pendinglist.removeChild(li);
    } else if (ul.id === "finishedlist") {
        FTlist = FTlist.filter(task => {
            return parseInt(li.id) !== task.id;
        });
        finishedlist.removeChild(li);
    }
    saveTask();
}

function addTask(text, bool) {
    const li = document.createElement("li"),
        btn_del = document.createElement("button"),
        btn_ok = document.createElement("button"),
        span = document.createElement("span");
    const id = globalId;
    const task = {
        text,
        id
    };
    globalId = globalId + 1;
    btn_del.innerText = "❌";
    btn_del.addEventListener("click", deleteTask);
    span.innerText = text;

    li.appendChild(span);
    li.appendChild(btn_del);
    btn_ok.addEventListener("click", moveTask);
    if (bool === true) {
        btn_ok.innerText = "✅";
        PTlist.push(task);
        li.id = task.id;
        li.appendChild(btn_ok);
        pendinglist.appendChild(li);
    } else {
        btn_ok.innerText = "⬅️";
        FTlist.push(task);
        li.id = task.id;
        li.appendChild(btn_ok);
        finishedlist.appendChild(li);
    }
    console.log(text);
}

function moveTask(event) {
    const btn = event.target,
        li = btn.parentNode,
        ul = li.parentNode;
    const span = li.querySelector("span");

    if (ul.id === "pendinglist") {
        addTask(span.innerText, false);
    } else {
        addTask(span.innerText, true);
    }
    deleteTask(event);
}

function handleSubmit(event) {
    console.log("start");
    event.preventDefault();
    const currentValue = input_todo.value;
    addTask(currentValue, true);
    input_todo.value = "";
    saveTask();
    console.log("end");
}

function loadTask() {
    const loadedPT = localStorage.getItem(LS_PendingTask),
        loadedFT = localStorage.getItem(LS_FinishedTask);

    if (loadedPT !== null) {
        const parsedPT = JSON.parse(loadedPT);
        parsedPT.forEach(task => {
            addTask(task.text, true);
        });
    }
    if (loadedFT !== null) {
        const parsedFT = JSON.parse(loadedFT);
        parsedFT.forEach(task => {
            addTask(task.text, false);
        });
    }
}

function init() {
    loadTask();
    form_todo.addEventListener("submit", handleSubmit);
}

init();