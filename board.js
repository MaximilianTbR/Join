// Arrays for rendering todos of the four tables

let toDo = [];
let inProgress = [];
let testing = [];
let done = [];

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