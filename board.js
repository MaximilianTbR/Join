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