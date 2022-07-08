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






