'use strict';

async function render() {
    includeHTML();
    await downloadFromServer();
    await loadFromBackend();
    selectNavElement();
    showBacklog();
}


function showBacklog() {
    let taskList = document.getElementById('tasks');
    taskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].processing_state == 'unallocated') { //
            taskList.innerHTML += templateBacklog(i);
        }
    }
}

function templateBacklog(i) {
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