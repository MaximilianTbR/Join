'use strict';

setURL('https://gruppe-271.developerakademie.net/smallest_backend_ever/database.json');

async function renderToDos() {
    includeHTML();
    await downloadFromServer();
    await loadFromBackend();
    showBoard();
}

function showBoard() {
    let tasksBoard = document.getElementById('todo-table');
    tasksBoard.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        tasksBoard.innerHTML += templateBoard(i);
    }
}

function templateBoard(i) {
    return `
 <div class="backlogTasks ${tasks[i]['inputCategory']}" id="backlogTasks-${i}" onclick="openTask(${i}, 'backlog')">
    <div class="backlogAssigned">//bearbeiten und vergleichen mit Add Task
        <span class="p">ASSIGNED TO:</span>
        <div class="avatarPerson">
            <img class="img" src="../img/${tasks[i]['avatarPicker']}.jfif" alt="">
            <div class="avatarPersonName">
                <span>${tasks[i]['avatarPicker']}</span>
                <span style="color: #6f8bf3f7">${tasks[i]['avatarPicker']}@join.com</span>
            </div>
        </div>
    </div>
    <div class="backlogCategory">
        <span class="p">CATEGORY:</span>
        <span>${tasks[i]['inputCategory']}</span>
    </div>
    <div class="backlogDescription">
        <span class="p">DESCRIPTION:</span>
        <span>${tasks[i]['inputDescription']}</span>
    </div>
 </div>
 <div class="new-task" draggable="true" id="new-task-"${i}">
                        <div class="new-task-inner-elements-left">
                            <div class="new-task-urgency-color" id="new-task-urgency-color-${tasks[i][urgency - color]}"></div>
                            <div class="draggable-part" id="draggable-part-${i}">
                                <img src="img/draggable Kopie 3.png">
                            </div>
                            <div class="todo-text">
                                <div class="todo-title" id="todo-title-${i}">
                                    Beispiel
                                </div>
                                <div class="todo-deadline" id="todo-deadline-"${tasks[i]}">
                                07.08.2022
                                </div>
                            </div>
                        </div>
                        <div class="new-task-inner-elements-right">
                            <div class="done-button" onclick="markAsDone()">__</div>
                        </div>
                    </div>`;
}


function addToBord(i) { //
    tasks[i].processing_state = 'todo';
    closeDialog('dialog-bg-backlog'); //überprüfen
    await updateBacklog();
}


async function updateBacklog() {
    showBacklog();
    await saveToBackend();
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

async function renderToDos() {
    includeHTML();
    await downloadFromServer();
    await loadFromBackend();
    selectNavElement();
    showBacklog();
}


function showBoard() {
    let tasksBoard = document.getElementById('todo-table');
    tasksBoard.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        tasksBoard.innerHTML += templateBoard(i);
    }
}

function templateBoard(i) {
    return `
 <div class="backlogTasks ${tasks[i]['inputCategory']}" id="backlogTasks-${i}" onclick="openTask(${i}, 'backlog')">
    <div class="backlogAssigned">//bearbeiten und vergleichen mit Add Task
        <span class="p">ASSIGNED TO:</span>
        <div class="avatarPerson">
            <img class="img" src="../img/${tasks[i]['avatarPicker']}.jfif" alt="">
            <div class="avatarPersonName">
                <span>${tasks[i]['avatarPicker']}</span>
                <span style="color: #6f8bf3f7">${tasks[i]['avatarPicker']}@join.com</span>
            </div>
        </div>
    </div>
    <div class="backlogCategory">
        <span class="p">CATEGORY:</span>
        <span>${tasks[i]['inputCategory']}</span>
    </div>
    <div class="backlogDescription">
        <span class="p">DESCRIPTION:</span>
        <span>${tasks[i]['inputDescription']}</span>
    </div>
 </div>
 <div class="new-task" draggable="true" id="new-task-"${i}">
                        <div class="new-task-inner-elements-left">
                            <div class="new-task-urgency-color" id="new-task-urgency-color-${tasks[i][urgency - color]}"></div>
                            <div class="draggable-part" id="draggable-part-${i}">
                                <img src="img/draggable Kopie 3.png">
                            </div>
                            <div class="todo-text">
                                <div class="todo-title" id="todo-title-${i}">
                                    Beispiel
                                </div>
                                <div class="todo-deadline" id="todo-deadline-"${tasks[i]}">
                                07.08.2022
                                </div>
                            </div>
                        </div>
                        <div class="new-task-inner-elements-right">
                            <div class="done-button" onclick="markAsDone()">__</div>
                        </div>
                    </div>`;
}


function addToBord(i) { //
    tasks[i].processing_state = 'todo';
    closeDialog('dialog-bg-backlog'); //überprüfen
    await updateBacklog();
}


async function updateBacklog() {
    showBacklog();
    await saveToBackend();
}