setURL('https://gruppe-271.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    await loadFromBackend();
    await includeHTML();
    menuInit();
    showBoard();
    updateHTML2();
}

function showBoard() {
    console.log('everything works until showBoard()');
    let tasksBoard = document.getElementById('todo');
    tasksBoard.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        tasksBoard.innerHTML += templateBoard(i);
    }
}

function templateBoard(i) {
    return `  
<div class="new-task" draggable="true" id="${i}" ondragstart="startDragging(${i})" onclick="openTodoInfo(${i})">
    <div class="new-task-urgency-color" id="new-task-urgency-color-${i}"></div>
    <div class="new-task-text-elements">
        <div class="new-task-upper-elements">
            <div class="new-task-inner-elements-left">
                <div class="draggable-part" id="draggable-part-${i}">
                    <img src="img/draggable Kopie 3.png">
                </div>
                <div class="todo-variables">
                    <div class="todo-text">
                        <div class="todo-title" id="todo-title-${i}"><b>${tasks[i]['Titel']}</b></div>
                    </div>
                    <div class="todo-deadline" id="todo-deadline-${i}">${tasks[i]['Date']}</div>
                </div>
            </div>    
            <div class="new-task-inner-elements-right ">
                <div class="done-button "  onclick="markAsDone(${i}) ">__</div>
            </div>
        </div>  
        <div class="new-task-details hide" id="new-task-details-${i}">
            <h5>Description:</h5>
            <p>${tasks[i]['Description']}</p>
            <h5>Category:</h5>
            <p>${tasks[i]['Category']}</p>
            <h5>Urgency:</h5>
            <p>${tasks[i]['Urgency']}</p>
        </div>
    </div>
</div>
`;
}

// drag & drop

let currentDraggedElement;

function startDragging(id) {
    currentDraggedElement = id;
}

function startDragging(i) {
    currentDraggedElement = i;
}

function allowDrop(event) {
    event.preventDefault();
}

function MoveTo(processingState) {
    //tasks[currentDraggedElement] = category; // z.b. Todo mit ID 1: Das Feld 'category' ändert sich zu open oder closed
    tasks[currentDraggedElement].processing_state = processingState;
    updateHTML2();
}

// test

function updateHTML2() {

    document.getElementById('todo').innerHTML = '';
    document.getElementById('inprogress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let element = tasks[i]['processing_state'];
        if (element == "todo" || element == "inprogress" || element == "testing" || element == "done") {
            document.getElementById(element).innerHTML += templateBoard(i);
            adjustColors(i);
        }
    }
}

// Adjusts colors for each task

function adjustColors(i) {
    let element = tasks[i]['processing_state'];

    if (element == "todo") {
        document.getElementById('new-task-urgency-color-' + i).classList.add('color-1');
    }
    if (element == "inprogress") {
        document.getElementById('new-task-urgency-color-' + i).classList.add('color-2');
    }
    if (element == "testing") {
        document.getElementById('new-task-urgency-color-' + i).classList.add('color-3');
    }
    if (element == "done") {
        document.getElementById('new-task-urgency-color-' + i).classList.add('color-4');
    }
}

// delete already done tasks

function markAsDone(i) {
    let currentTask = document.getElementById(i);
    currentTask.remove();
}

// includeHTML() Function

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        let file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * Function to open the info menu for the current task
 * 
 * @param {number}
 */

open = true;

function openTodoInfo(i) {
    if (open == true) {
        document.getElementById('new-task-details-' + i).classList.remove('hide');
        document.getElementById('new-task-urgency-color-' + i).classList.remove('new-task-urgency-color');
        document.getElementById('new-task-urgency-color-' + i).classList.add('new-task-urgency-color-open-menu');
        open = false;
    } else {
        document.getElementById('new-task-details-' + i).classList.add('hide');
        document.getElementById('new-task-urgency-color-' + i).classList.remove('new-task-urgency-color-open-menu');
        document.getElementById('new-task-urgency-color-' + i).classList.add('new-task-urgency-color')
        open = true;
    };
}