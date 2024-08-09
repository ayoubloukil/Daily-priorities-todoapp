const submitBtn = document.getElementById("btn-submit");
const submitInput = document.getElementById("txt-priority");
const olElement = document.getElementById("ordered-list");
const olElementConfirm = document.getElementById("ordered-list-confirm");
const divElementConfirm = document.getElementById("container-confirm-message");
const errorContainer = document.getElementById("input-err");
const container_confirm = document.getElementById("container-confirm");
const deleteSection = document.getElementById("container-confirm-deleteSection");
const addContainer = document.getElementById("container");
const checkArray = JSON.parse(localStorage.getItem("tasks"));
const deleteMsg = document.getElementById("container-confirm-deleteSectionMsg");
let taskArr = [];


function addTask(){
    errorContainer.innerHTML = "";
    if(submitInput.value.trim() !== ""){
        if (taskArr.length === 0 || taskArr.length < 3){
            taskArr.push(submitInput.value);
            let listItem = document.createElement('li');
            listItem.innerText = submitInput.value;
            olElement.appendChild(listItem);
            listItem.style.listStyle = "decimal inside";

        } else {
            alert("You have reached the maximum amount of tasks you can submit!")
        }
        submitInput.value = "";
    }   else {
        let errMessage = document.createElement('p');
        errMessage.innerText = "Submit a task to continue.";
        errorContainer.appendChild(errMessage);
    }

}


function confirmTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    showTasks();
}

function showTasks(){

    olElementConfirm.innerHTML = "";
    divElementConfirm.innerHTML = "";

    const getTasks = JSON.parse(localStorage.getItem("tasks"));
    if (getTasks.length != 0) {
        for (let i = 0; i < getTasks.length; i++) {
            let listItem = document.createElement('li');
            listItem.innerText = getTasks[i];
            olElementConfirm.appendChild(listItem);
            listItem.style.listStyle = "decimal inside";
            editBtn = document.createElement('button');
            editBtn.innerHTML = "Edit task";
            listItem.appendChild(editBtn);
            editBtn.style.marginLeft = "15px";
            editBtn.addEventListener('click', () => {
                const editBtnConfirm = document.createElement('button');
                const inputChange = document.createElement('input');

                listItem.innerText = "";
                editBtnConfirm.innerText = "confirm Change";
                editBtnConfirm.style.marginLeft = "15px";

                listItem.appendChild(inputChange);
                listItem.appendChild(editBtnConfirm);
                editBtnConfirm.addEventListener('click', () => {
                    const updatedTask = inputChange.value.trim();
                    if (updatedTask !== "") {
                        getTasks[i] = updatedTask;
                        localStorage.setItem("tasks", JSON.stringify(getTasks));
                        showTasks(); 
                    } else {
                        alert("Task cannot be empty");
                    }
                })
            });

        }
        addContainer.style.display = "none";
        let dailyTaskMessage = document.createElement('h1');
        dailyTaskMessage.innerText = "Here are your daily tasks";
        divElementConfirm.appendChild(dailyTaskMessage);
        deleteTask();
        
    }
}

window.onload = function() {
    showTasks();
  };


function deleteTask() {
    let deleteInput = deleteSection.querySelector('input');
    let deleteButton = deleteSection.querySelector('button');

    if (!deleteInput && !deleteButton) {
        deleteInput = document.createElement('input');
        deleteButton = document.createElement('button');

        deleteInput.placeholder = "Enter task number to delete";
        deleteButton.innerHTML = "Delete task";
        deleteInput.style.marginRight = "14px";

        deleteSection.appendChild(deleteInput);
        deleteSection.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            deleteMsg.innerHTML = "";
            const getTasks = JSON.parse(localStorage.getItem("tasks"));
            const index = parseInt(deleteInput.value, 10) - 1;
            if (deleteInput.value.trim() !== "" ){
                if (index >= 0 && index < getTasks.length) {
                    getTasks.splice(index, 1);
                    localStorage.setItem("tasks", JSON.stringify(getTasks));
                    deleteInput.value = "";
                    console.log(getTasks);
                    showTasks(); 
                }
            }   else {
                let errMessage = document.createElement('p');
                errMessage.innerText = "Submit a task to delete.";
                deleteMsg.appendChild(errMessage);
            }
        });
    }
}
