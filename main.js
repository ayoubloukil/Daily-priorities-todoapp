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
        console.log(taskArr)
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
    // Check if the input and button already exist
    let deleteInput = deleteSection.querySelector('input');
    let deleteButton = deleteSection.querySelector('button');

    if (!deleteInput && !deleteButton) {
        // Create and append input and button only if they don't already exist
        deleteInput = document.createElement('input');
        deleteButton = document.createElement('button');

        deleteInput.placeholder = "Enter task number to delete";
        deleteButton.innerHTML = "Delete a task";
        deleteInput.style.marginRight = "14px";

        deleteSection.appendChild(deleteInput);
        deleteSection.appendChild(deleteButton);

        // Add event listener for deleting a task
        deleteButton.addEventListener('click', () => {
            const getTasks = JSON.parse(localStorage.getItem("tasks"));
            const index = parseInt(deleteInput.value, 10) - 1;
            if (index >= 0 && index < getTasks.length) {
                getTasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(getTasks));
                deleteInput.value = "";
                showTasks();  // Update the task list display
            }
        });
    }
}


