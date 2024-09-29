

document.getElementById("taskForm").addEventListener("submit", handleTaskSubmission);

function handleTaskSubmission(event) {
    event.preventDefault();
    let taskInputValue = document.getElementById("taskInput").value;
    if (taskInputValue.length > 20) {
        alert("Task is too long. (MAX 20 CHARS)")
    } else {
        console.log("Task entered: " + taskInputValue);
        //addTaskToList(taskInputValue);
        
    }
    document.getElementById("taskForm").reset();
}

function addTaskToList(task) {
    let taskList = document.getElementById('taskList');
    let newTask = document.createElement('li');
    newTask.textContent = task;
    taskList.appendChild(newTask);
}


window.addEventListener("DOMContentLoaded", fetchTasks);
function fetchTasks() {
    fetch("http://localhost:3000/tasks") // Send a GET request to the server
        .then((response) => response.json()) // Convert the response to JSON
        .then((tasks) => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = ""; // Clear the existing list
            tasks.forEach((task) => {
                const newTask = document.createElement("li");
                newTask.textContent = task.task; // Add task to the list
                taskList.appendChild(newTask);
            });
        })
        .catch((error) => console.error("Error fetching tasks:", error));
}

