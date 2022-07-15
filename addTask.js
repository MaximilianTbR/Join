<<<<<<< HEAD
let users = [
    {
       'img' : 'Anja.jpg',
       'name' : 'Anja Hovhannisyan',
    },
    {
       'img' : 'Tijana.png',
       'name' : 'Tijana' + "<br>"+'Couturier',
    },
    {
       'img' : 'Max.png',
       'name' : 'Maximilian Tauber',
    },
];


let selectUsers = [];

async function render() {
    let avatarPicker = document.getElementById('avartarPicker');
    avatarPicker.innerHTML = '';


    for (let i = 0; i < users.length; i++) {
        const user = users[i];
     

        avatarPicker.innerHTML += /*html*/`
        <div class="userContain">
        <img id="user-${i}" onklick="selectUser(${i})"  src="img/${user['img']}" class="avatar ">
        <p class="userNames">${user['name']} </p>
        </div>

        `;
    }
    await includeHTML();
  
}






// function createNewTask() {
//     document.getElementById('closed').classList.add('d-none');
//     document.getElementById('taskCreated').classList.remove('d-none');
    
// }

// function backNewTask() {
//     document.getElementById('closed').classList.remove('d-none');
//     document.getElementById('taskCreated').classList.add('d-none');
// }






// let allTasks = [];



// function createNewTask(){
//     let titel = document.getElementById('inputTitel');
//     let category = document.getElementById('inputCategory');
//     // let categorySelect =category.options[categorySelect.selectedIndex].text;
//     let description = document.getElementById('inputDescription');
//     // let descriptionSelect = category.options[descriptionSelect.selectedIndex].text;
//     let date = document.getElementById('inputDate');
//     let urgancy = document.getElementById('inputUrgency');
//     // let urgancySelect = category.options[urgancySelect.selectedIndex].text;
   

//     let task = {

//         'Titel' : titel.value,
//         'Category' : category.value,
//         'Description' : description.value,
//         'Date' : date.value,
//         'Urgency' : urgancy.value
//     };

//     allTasks.push(task);
//     console.log(allTasks);
  
// }





// function save() {
//     let saveTask = JSON.stringify(allTasks);
 
//     localStorage.setItem('saveTask', saveTask);
   
// }

// function load() {
//     let saveTask = localStorage.getItem('saveTask');
//     allTasks = JSON.parse(saveTask);
    

// render();

// }
















//{-------------------------ClearButton------ fertig ---------------
function clearAllInputFolder() {
    document.getElementById('inputTitel').value = '';
    document.getElementById('inputCategory').value = '';
    document.getElementById("inputDescription").selectedIndex = 0;
    document.getElementById("inputDate").selectedIndex = 0;
    document.getElementById('inputUrgency').value = '';   
}
// }








//v HTML Einbinden---------------------------------------------------------------------------

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}
// }








































// let inputarrayTitel = [];
// let inputarrayNote = [];



// function save() {
//     let saveNote = JSON.stringify(inputarrayNote);
//     let saveTitel = JSON.stringify(inputarrayTitel);
//     localStorage.setItem('Note', saveNote);
//     localStorage.setItem('Titel', saveTitel);
// }

// function load() {
//     let saveNote = localStorage.getItem('Note');
//     let saveTitel = localStorage.getItem('Titel');

//     if (saveTitel && saveNote) {
//         inputarrayNote = JSON.parse(saveTitel);
//         inputarrayTitel = JSON.parse(saveNote);
//     }
// }




// Add note -------------------------------------

// function renderNotes() {
//     let myposts = document.getElementById('addNewNoteContain');
//     myposts.innerHTML = ``;

//     for (let i = 0; i < inputarrayNote.length; i++) {
//         let arrayTitel = inputarrayTitel[i];
//         let arrayNote = inputarrayNote[i];

//         myposts.innerHTML +=/*html*/`
//     <div  class="divneu">
//         <b class="titelFieldcenter">${arrayTitel}</b>
//         <p class="noteFieldcenter">${arrayNote}</p>
//         <div>
//             <a class="xIcon" onclick="deliteXicon(${i})" href="#"><b>X</b></a>
//             </div>
//     </div>`;

      
//     }
// }
=======
let users = [
    {
       'img' : 'Anja.jpg',
       'name' : 'Anja Hovhannisyan',
    },
    {
       'img' : 'Tijana.png',
       'name' : 'Tijana' + "<br>"+'Couturier',
    },
    {
       'img' : 'Max.png',
       'name' : 'Maximilian Tauber',
    },
];


let selectedUsers = [];

async function render() {
    let avatarPicker = document.getElementById('avartarPicker');
    avatarPicker.innerHTML = '';


    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        avatarPicker.innerHTML += /*html*/`
        <div id="user-${i}" class="userContain">
        <img  onclick="selectUser(${i})"  src="img/${user['img']}" class="avatar ">
        <p class="userNames">${user['name']} </p>
        </div>
        `;
    }

    await includeHTML();
    // load();
    // save();
    

}




function selectUser(i){
    let user = document.getElementById('user-' +i);
    user.classList.toggle('avarta-selected');
        if (selectedUsers.includes(users[i])){
            selectedUsers = selectedUsers.filter(a => a != users[i]);
        }else{

            selectedUsers.push(users[i]);
        }
    }



let allTasks = [];



function createNewTask(){
    document.getElementById('taskCreated').classList.remove('d-none');
    document.getElementById('closed').classList.add('d-none');

    pushInputFolder();
}

// function pushInputFolder(){
//     return createNewTask() && pushInputFolder2();

//     // createNewTask();
//     // pushInputFolder2();
// }


function pushInputFolder(){
    let titel = document.getElementById('inputTitel');
    let category = document.getElementById('inputCategory');
    let description = document.getElementById('inputDescription');
    let date = document.getElementById('inputDate');
    let urgancy = document.getElementById('inputUrgency');
    // let users = document.getElementById(`user-${i}`);

  
   
    let task = {

        'Titel' : titel.value,
        'Category' : category.value,
        'Description' : description.value,
        'Date' : date.value,
        'Urgency' : urgancy.value,
        'User' : users.value
    };

    allTasks.push(task);
    console.log(allTasks);
   
   
  
   titel.value = '';
    category.value = '';
    description.value = '' 
    date.value =''; 
    urgancy.value = '';   


}




function save() {
    let saveTask = JSON.stringify(allTasks);
    localStorage.setItem('saveTask', saveTask);
 
}

function load() {
    let saveTask = localStorage.getItem('saveTask');
    allTasks = JSON.parse(saveTask);
}






function backNewTask() {
    document.getElementById('closed').classList.remove('d-none');
    document.getElementById('taskCreated').classList.add('d-none');
    
}





//{-------------------------ClearButton------ fertig ---------------
function clearAllInputFolder() {
    document.getElementById('inputTitel').value = '';
    document.getElementById('inputCategory').value = '';
    document.getElementById("inputDescription").selectedIndex = 0;
    document.getElementById("inputDate").selectedIndex = 0;
    document.getElementById('inputUrgency').value = '';   
}
// }








//v HTML Einbinden---------------------------------------------------------------------------

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}
// }






>>>>>>> 53ed531b108f6077ac15b54d4bffb81ce1d28ed9
