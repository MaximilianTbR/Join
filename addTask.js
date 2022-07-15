"use strict"

setURL('https://gruppe-271.developerakademie.net/smallest_backend_ever');


let selectedUsers = [];
let allTasks = [];

let users = [
    {
        'img': 'Anja.jpg',
        'name': 'Anja Hovhannisyan',
    },
    {
        'img': 'Tijana.png',
        'name': 'Tijana' + "<br>" + 'Couturier',
    },
    {
        'img': 'Max.png',
        'name': 'Maximilian Tauber',
    },
];


async function init() {
    await addAvartar();
    await includeHTML();
    await loadFromBackend();
 
}





async function saveToBackend() {
    let saveTask = JSON.stringify(allTasks);
    let saveUser = JSON.stringify(selectedUsers);
    await backend.setItem('saveTask', saveTask);
    await backend.setItem('saveUser', saveUser);

}



async function loadFromBackend() {
    let saveTask = await backend.getItem('saveTask');
    let saveUser = await backend.getItem('saveUser');
    allTasks = JSON.parse(saveTask) || [];
    selectedUsers = JSON.parse(saveUser) || [];

}



async function addAvartar() {
    let avatarPicker = document.getElementById('avartarPicker');
    avatarPicker.innerHTML = '';


    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        avatarPicker.innerHTML += /*html*/`
        <div id="user-${i}" onclick="selectUser(${i})" class="userContain">
        <img    src="img/${user['img']}" class="avatar ">
        <p class="userNames">${user['name']} </p>
        </div>
        `;
    }





}



function selectUser(i) {
    let user = document.getElementById('user-' + i);
    user.classList.toggle('avarta-selected');
    if (selectedUsers.includes(users[i])) {
        selectedUsers = selectedUsers.filter(a => a != users[i]);
    } else {

        selectedUsers.push(users[i]);
        console.log(selectedUsers);
    }
}







function createNewTask() {
    document.getElementById('taskCreated').classList.remove('d-none');
    document.getElementById('closed').classList.add('d-none');

    pushInputFolder();
}

function backNewTask() {
    document.getElementById('closed').classList.remove('d-none');
    document.getElementById('taskCreated').classList.add('d-none');

}




function pushInputFolder() {
    let titel = document.getElementById('inputTitel');
    let category = document.getElementById('inputCategory');
    let description = document.getElementById('inputDescription');
    let date = document.getElementById('inputDate');
    let urgancy = document.getElementById('inputUrgency');




    let task = {

        'Titel'      : titel.value,
        'Category'   : category.value,
        'Description': description.value,
        'Date'       : date.value,
        'Urgency'    : urgancy.value,


    };

    allTasks.push(task);
    console.log(allTasks);



    titel.value = '';
    category.value = '';
    description.value = ''
    date.value = '';
    urgancy.value = '';

    saveToBackend();
}




function clearAllInputFolder() {
    document.getElementById('inputTitel').value = '';
    document.getElementById('inputCategory').value = '';
    document.getElementById("inputDescription").selectedIndex = 0;
    document.getElementById("inputDate").selectedIndex = 0;
    document.getElementById('inputUrgency').value = '';


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









