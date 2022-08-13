let users = [];
let tasks = [];

setURL('https://gruppe-271.developerakademie.net/smallest_backend_ever');

async function init() {
    includeHTML();
    await downloadFromServer();
    await loadFromBackend();
    showBacklog();
}

async function saveToBackend() {
    let usersAsJSON = JSON.stringify(users);
    let tasksAsJSON = JSON.stringify(tasks);
    await backend.setItem('saveUser', usersAsJSON);
    await backend.setItem('saveTask', tasksAsJSON);
}


async function loadFromBackend() {

    // let a = await backend.deleteItem('saveUser');
    // let b = await backend.deleteItem('saveTask');

    console.log('jsonFromServer', jsonFromServer);


    let usersAsJSON = await backend.getItem('saveUser');
    let tasksAsJSON = await backend.getItem('saveTask');

    users = JSON.parse(usersAsJSON) || [];
    tasks = JSON.parse(tasksAsJSON) || [];
    console.log('Loaded', users);
    console.log('Loaded', tasks);

    // saveToBackend();

}


function selectSavedOption(id, variable) {
    Array.from(document.querySelector(`#${id}`).options).forEach(function(option_element) {
        if (option_element.value == variable) {
            option_element.selected = true;
        }
    });
}


function openDialog(id) {
    document.getElementById(id).classList.remove('d-none');
}

function closeDialog(id) {
    document.getElementById(id).classList.add('d-none');
}


function openTask(i, page) {
    openDialog(`dialog-bg-${page}`);
    document.getElementById(`dialog-content-${page}`).innerHTML = templateMoveTo(i, page); //welche Dialog? Testen
    document.getElementById(`move-to-${page}-icon`).classList.add('d-none'); //
}


async function deleteTask(i, page) {
    console.log('page', page);
    tasks.splice(i, 1);
    users.splice(i, 1);
    closeDialog(`dialog-bg-${page}`); //welche Dialog?
    console.log('update1', page);
    await update(page);
    console.log('update', page);
}


function editTask(i, page) {
    document.getElementById(`dialog-content-${page}`).innerHTML = '';
    document.getElementById(`dialog-content-${page}`).innerHTML = templateEditTask(i, page);
    document.getElementById(`change-${page}-title`).value = tasks[i].title;
    document.getElementById(`change-${page}-date`).value = tasks[i].due_date;
    document.getElementById(`change-${page}-description`).value = tasks[i].description;
    selectSavedOption(`change-${page}-category`, tasks[i].category);
    selectSavedOption(`change-${page}-urgency`, tasks[i].urgency);
    selectSavedOption(`change-${page}-assigned-to`, tasks[i].assigned_to);
}

async function update(page) {
    console.log('update', page + "test");
    switch (page) {
        case 'backlog':
            console.log('updatepage', page);
            await updateBacklog();
            break;
        case 'board':
            await updateBoard();
            break;
    }
}




async function move(i, page) {
    switch (page) {
        case 'backlog':
            tasks[i].processing_state = 'todo';
            break;
        case 'board':
            tasks[i].processing_state = 'backlog'
            break;
    }
    closeDialog(`dialog-bg-${page}`);
    await update(page);
}



async function changeTask(i, page) {
    tasks[i].title = document.getElementById(`change-${page}-title`).value;
    tasks[i].category = document.getElementById(`change-${page}-category`).value;
    tasks[i].description = document.getElementById(`change-${page}-description`).value;
    tasks[i].due_date = document.getElementById(`change-${page}-date`).value;
    tasks[i].urgency = document.getElementById(`change-${page}-urgency`).value;
    tasks[i].assigned_to = document.getElementById(`change-${page}-assigned-to`).value;
    showTask(i, page);
    await update(page);
}

function templateMoveTo(i, page) {
    return `
    
    <div class="dialogAllBacklog" id="${page}-item-${i}">
        <img src="./img/x-icon.png"class="xICon" onclick="closeDialog('dialog-bg-${page}')"></img>
        <div class"icon-menu">
            <button class="move circle-plus"  id="move-to-board-icon" onclick="move(${i}, '${page}')">Move to Board</button>
          <!-- <button class="move circle-minus" id="move-to-backlog-icon" onclick="move(${i}, '${page}')">Remove from Board</button>
            <button class="move square"  onclick="editTask(${i}, '${page}')">Edit Task</button> -->
            <button class="move trash-can" onclick="deleteTask(${i}, '${page}')">Delete Task</button>
        </div>
        <div class="task-header">
            <div class="column-dialog">
                <span class="title">Title</span>
                <p class="titleText">${tasks[i]['Titel']}</p>
            </div>
            <div class="column-dialog">
                <span class="categoryPadding">Assigned to:</span>
                <div class="assigned-to">
                    <img class="rounded-circle profile-picture" src="../imgs/pp_${users[i]['img']}".jfif" alt="">
                    <div class="person-name">
                        <span>${users[i]['name']}</span>

                    </div>
                </div>
            </div>
        </div>
        <div class="task-settings">
            <div class="column-dialog">
                <span class="categoryPadding" >Category:</span>
                <p class="categoryID">${tasks[i]['Category']}</p>
            </div>
            <div class="column-dialog">
                <span class="categoryPadding">Urgency:</span>
                <p class="urgencyID">${tasks[i]['Urgency']}</p>
            </div>
            <div class="column-dialog">
                <span class="categoryPadding">Due Date:</span>
                <p class="dateID">${tasks[i]['Date']}</p>
            </div>
        </div>
        <div class="column-dialog">
            <span class="categoryPadding">Description:</span>
            <p class="description">${tasks[i]['Description']}</p>
        </div>
    </div>
    `;
}


function templateEditTask(i, page) {
    return `
    <div class="edit-dialog">
        <button class="buttonClose" onclick="closeDialog('dialog-bg-${page}')" title="Close"></button>
        <form action="" onsubmit="changeTask(${i}, '${page}'); return false;" class="add-task-form">
        <div class="add-task-form--left">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">TITLE</label>
                <input type="text" class="form-control input-field" id="change-${page}-title" required>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">CATEGORY</label>
                <select class="form-select input-field" id="change-${page}-category" aria-label="CATEGORY" required>
                    <option id="category-option-1" value="category_1">Category 1</option>
                    <option id="category-option-2" value="category_2">Category 2</option>
                    <option id="category-option-3" value="category_3">Category 3</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">DESCRIPTION</label>
                <textarea class="form-control textarea-input" id="change-${page}-description" rows="3" required></textarea>
            </div>
        </div>
        <div class="add-task-form--right">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">DUE DATE</label>
                <input type="date" class="form-control input-field" id="change-${page}-date" required>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">URGENCY</label>
                <select class="form-select input-field" id="change-${page}-urgency" aria-label="URGENCY" required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">ASSIGNED TO</label>
                <select class="form-select input-field" id="change-${page}-assigned-to" aria-label="ASSIGNED TO" required>
                    <option value="">Anja</option>
                    <option value="">Max</option>
                    <option value="">Tijana</option>
                </select>
            </div>
            <div class="mb-3 form-controls">
                <button type="reset" class="btn btn-light cancel-btn" onclick="openTask(${i}, '${page}')">CANCEL</button>
                <button type="submit" class="btn btn-primary submit-btn">SAVE CHANGES</button>
            </div>
        </div>
        </form>
    </div>
    `;
}