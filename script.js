function handleTaskSubmission(event) {
    event.preventDefault();
    let taskInputValue = document.getElementById("taskInput").value;
    if (taskInputValue.length > 20) {
        alert("Task is too long. (MAX 20 CHARS)")
    } else {
        addTaskToBackend(taskInputValue);
        console.log("Task entered: " + taskInputValue);
    }
    document.getElementById("taskForm").reset();
}

document
    .getElementById("taskForm")
    .addEventListener("submit", handleTaskSubmission);

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

function addTaskToBackend(task) {
    fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ task })
    })
        .then((response) => response.json())
        .then((newTask) => {
            console.log(newTask);
            addTasktoList(newTask);
        })
        .catch((error) => {
            console.error("Error adding tasks:", error);
        });
}

function addTasktoList(task) {
    let taskList = document.getElementById("taskList");
    let newTask = document.createElement("li");

    newTask.textContent = task.task;

    //create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add('delButton')
    deleteButton.textContent = "Delete";

    //add event listener for the delete button
    deleteButton.addEventListener("click", function () {
        deleteTaskFromBackend(task.id, newTask);
    });

    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);
}

function deleteTaskFromBackend(taskId, taskElement) {
    fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE"
    }).then(() => {
        taskElement.remove(); //remove from page
    }).catch((error) => {
        console.error("Error deleting task:", error)
    });
}

