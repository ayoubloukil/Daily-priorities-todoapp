const submitBtn = document.getElementById("btn-submit");
const submitInput = document.getElementById("txt-priority");
const olElement = document.getElementById("ordered-list");
let taskArr = [];


function addTask(){
    if (taskArr.length === 0 || taskArr.length < 3){
        taskArr.push(submitInput.value);
        let listItem = document.createElement('li');
        listItem.innerText = submitInput.value;
        olElement.appendChild(listItem);
    } else {
        alert("You have reached the maximum amount of tasks you can submit!")
    }
    console.log(taskArr)
    submitInput.value = "";
}


function confirmTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    document.getElementById("container-submit").style.display = "none";
    showTasks();
}

function showTasks(){
    const getTasks = localStorage.getItem(JSON.parse("tasks"));

}





 


// function showTask () {
//     localStorage.getItem('priorities')
// }

