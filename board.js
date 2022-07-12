// Arrays and functions for rendering todos of the four tables

function includeHTML() {

}

// Menu functions 

function showMenuButton1() {
    document.getElementById('menu-point').classList.remove('d-none');
}

function removeMenuButton1() {
    document.getElementById('menu-point').classList.add('d-none');
}

function showMenuButton2() {
    document.getElementById('menu-point2').classList.remove('d-none');
}

function removeMenuButton2() {
    document.getElementById('menu-point2').classList.add('d-none');
}

function showMenuButton3() {
    document.getElementById('menu-point3').classList.remove('d-none');
}

function removeMenuButton3() {
    document.getElementById('menu-point3').classList.add('d-none');
}

function showMenuButton4() {
    document.getElementById('menu-point4').classList.remove('d-none')
}

function removeMenuButton4() {
    document.getElementById('menu-point4').classList.add('d-none')
}

// drag, pull, drop functions for todo's

function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function dragEnter(event) {
    if (event.target.className == "droptarget") {
        document.getElementById("demo").innerHTML = "Entered the dropzone";
        event.target.style.border = "3px dotted red";
    }
}

function dragLeave(event) {
    if (event.target.className == "droptarget") {
        document.getElementById("demo").innerHTML = "Left the dropzone";
        event.target.style.border = "";
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("Text/plain");
    event.target.appendChild(document.getElementById('new-task'));
}

// delete already done tasks

function markAsDone1() {
    let currentTask = document.getElementById('new-task');
    currentTask.remove();
}

// render Tasks from server

async function boardInit() {
    loadedTasks = [];
    await loadServerData();
    loadTodos();
    loadInProgress();
    loadTesting();
    loadDone();
}

function loadTodos() {
    let tasks = loadedTasks.filter(t => t['state'] == 'to-do');
    clearBoard('BlockToDo');
    tasks.forEach(function(task) {
        document.getElementById('BlockToDo').innerHTML += generateBoardTask(task);
        hideMoveBtn(task);
    });
}


function loadInProgress() {
    let tasks = loadedTasks.filter(t => t['state'] == 'inProgress');
    clearBoard('BlockInProgress');
    tasks.forEach(function(task) {
        document.getElementById('BlockInProgress').innerHTML += generateBoardTask(task);
        hideMoveBtn(task);
    });
}

function loadTesting() {
    let tasks = loadedTasks.filter(t => t['state'] == 'testing');
    clearBoard('BlockTesting');
    tasks.forEach(function(task) {
        document.getElementById('BlockTesting').innerHTML += generateBoardTask(task);
        hideMoveBtn(task);
    });
}

function loadDone() {
    let tasks = loadedTasks.filter(t => t['state'] == 'done');
    clearBoard('BlockDone');
    tasks.forEach(function(task) {
        document.getElementById('BlockDone').innerHTML += generateBoardTask(task);
        hideMoveBtn(task);
    });
}

async function loadServerData() {
    helper = new Helper;
    setURL('http://gruppe-142.developerakademie.net/smallest_backend_ever');
    await helper.getDataFromServer();
    helper.allTasks.forEach(task => {
        loadedTasks.push(task);
    });
}