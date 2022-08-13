'use strict';
let emails = [{

        'email': 'tijana.couturier',
    },
    {
        'email': 'anja.hovhannisyan',
    },
    {
        'email': 'maximilian.tauber',
    },
];

async function init() {
    await downloadFromServer();
    await loadFromBackend();
    await includeHTML();
    menuInit();
    showBacklog();
}


function showBacklog() {


    let taskList = document.getElementById('tasks');
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        console.log('2');
        if (tasks[i].processing_state == 'backlog') { //
            taskList.innerHTML += templateBacklog(i);
        }
    }
    //downloadFromServer();
    // let tmp = downloadFromServer();

}

async function addToBord(i) { //
    tasks[i].processing_state = 'todo';
    closeDialog('dialog-bg-backlog'); //überprüfen
    await updateBacklog();
}


async function updateBacklog() {
    console.log('updatetest');
    showBacklog();
    console.log('update5');
    await saveToBackend();
}


function templateBacklog(i) {
    console.log('2');
    return `
 <div class="backlogTasks ${tasks[i]['Category']}" id="backlogTasks-${i}" onclick="openTask(${i}, 'backlog')">
    <div class="backlogAssigned">
   
        <div class="avatarPerson">
            <img class="img" src="./img/${users[i]['img']}" alt="">
           
            <div class="avatarPersonName">
                <span class="name">${users[i]['name']}</span>
                <span style="color: #6f8bf3f7;  padding-left: 10px;">${users[i]['email']}@join.com</span>
            </div>
        </div>
    </div>
    <div class="backlogCategory">

        <span>${tasks[i]['Category']}</span>
    </div>
    <div class="backlogDescription">

        <span>${tasks[i]['Description']}</span>
    </div>
 </div>`;
}


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