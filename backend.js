let users = [];
let tasks = [];

setURL('https://gruppe-271.developerakademie.net/smallest_backend_ever');

async function init() {
    includeHTML();
    await downloadFromServer();
    await loadFromBackend();
    selectNavElement();
    showBacklog();
}

async function saveToBackend() {
    let usersAsJSON = JSON.stringify(users);
    let tasksAsJSON = JSON.stringify(tasks);
    await backend.setItem('users', usersAsJSON);
    await backend.setItem('tasks', tasksAsJSON);
}


async function loadFromBackend() {
    let usersAsJSON = await backend.getItem('users');
    let tasksAsJSON = await backend.getItem('tasks');
    users = JSON.parse(usersAsJSON) || [];
    tasks = JSON.parse(tasksAsJSON) || [];
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
    tasks.splice(i, 1);
    closeDialog(`dialog-bg-${page}`); //welche Dialog?

    await update(page);
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
    switch (page) {
        case 'backlog':
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
            tasks[i].processing_state = 'unallocated';
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
    
    <div class="dialog-task" id="${page}-item-${i}">
        <i class="fa-solid fa-xmark" aria-label="Close" onclick="closeDialog('dialog-bg-${page}')"></i>
        <div class"icon-menu">
            <button class="move circle-plus" aria-label="Move to Board" title="Move to Board" id="move-to-board-icon" onclick="move(${i}, '${page}')"></button>
            <button class="move circle-minus" aria-label="Remove from Board" title="Remove from Board" id="move-to-backlog-icon" onclick="move(${i}, '${page}')"></button>
            <button class="move square" aria-label="Edit Task" title="Edit Task" onclick="editTask(${i}, '${page}')"></button>
            <button class="move trash-can" aria-label="Delete Task" title="Delete Task" onclick="deleteTask(${i}, '${page}')"></button>
        </div>
        <div class="task-header">
            <div>
                <span class="task-title form-label">TITLE</span>
                <p class="task-title">${tasks[i].title}</p>
            </div>
            <div>
                <span class="form-label">ASSIGNED TO</span>
                <div class="assigned-to">
                    <img class="rounded-circle profile-picture" src="../imgs/pp_${tasks[i].assigned_to}.jfif" alt="">
                    <div class="person-name">
                        <span>${tasks[i].assigned_to}</span>
                        <span style="color: #6f8bf3f7">${tasks[i].assigned_to}@join.com</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="task-settings">
            <div>
                <span class="form-label">CATEGORY</span>
                <p>${tasks[i].category}</p>
            </div>
            <div>
                <span class="form-label">URGENCY</span>
                <p>${tasks[i].urgency}</p>
            </div>
            <div>
                <span class="form-label">DUE DATE</span>
                <p class="task-date">${tasks[i].due_date}</ü>
            </div>
        </div>
        <div class="task-description">
            <span class="form-label">DESCRIPTION</span>
            <p class="description">${tasks[i].description}</p>
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
                    <option value="samir_barbat">Anja</option>
                    <option value="samuel_bergen">Max</option>
                    <option value="lukas_volgger">Tijana</option>
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