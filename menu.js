/**
 * 
 * Functions to open the menu 
 *  
 * no parameters
 * */


function openMenu() {
    document.getElementById('menu').classList.remove('d-none');
}

function closeMenu() {
    document.getElementById('menu').classList.add('d-none');
}

function menuInit() {
    if (window.location.href == 'https://gruppe-271.developerakademie.net/Join/board.html') {
        document.getElementById('board-menu-point').classList.remove('single-href');
        document.getElementById('board-menu-point').classList.add('single-href-active');
    }
    if (window.location.href == 'https://gruppe-271.developerakademie.net/Join/backlog.html') {
        document.getElementById('backlog-menu-point').classList.remove('single-href');
        document.getElementById('backlog-menu-point').classList.add('single-href-active');
    }
    if (window.location.href == 'https://gruppe-271.developerakademie.net/Join/addTask.html') {
        document.getElementById('addtask-menu-point').classList.remove('single-href');
        document.getElementById('addtask-menu-point').classList.add('single-href-active');
    }
    if (window.location.href == 'https://gruppe-271.developerakademie.net/Join/help.html') {
        document.getElementById('help-menu-point').classList.remove('single-href');
        document.getElementById('help-menu-point').classList.add('single-href-active');
    }
}