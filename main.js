const submitBtn = document.getElementById("btn-submit");
const submitInput = document.getElementById("txt-priority");
const olElement = document.getElementById("ordered-list");
const olElementConfirm = document.getElementById("ordered-list-confirm");
const divElementConfirm = document.getElementById("container-confirm-message");
const errorContainer = document.getElementById("input-err");
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
    const getTasks = JSON.parse(localStorage.getItem("tasks"));
    if (getTasks.length != 0) {
        for (let i = 0; i < getTasks.length; i++) {
            let listItem = document.createElement('li');
            listItem.innerText = getTasks[i];
            olElementConfirm.appendChild(listItem);
            listItem.style.listStyle = "decimal inside";
        }
        document.getElementById("container").style.display = "none";
        let dailyTaskMessage = document.createElement('h1');
        dailyTaskMessage.innerText = "Here are your daily tasks";
        divElementConfirm.appendChild(dailyTaskMessage);
    }
}

window.onload = function() {
    showTasks();
  };
