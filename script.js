inputForm = document.getElementById("inputForm");
textBox = document.getElementById("toDoInput");
submitButton = document.getElementById("submitButton");
toDoList = document.getElementById("toDoList");

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

inputForm.addEventListener("submit", function(e) {
    e.preventDefault();
    addTask();
});

function addTask() {
    if (textBox.value.trim()) {   //trims out extra white spaces
        const Task = document.createElement("li");
        Task.classList.add("task-item");
        
        // Create task text container
        const taskText = document.createElement("span");
        taskText.textContent = textBox.value;
        taskText.classList.add("task-text");
        
        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = function() {
            Task.remove();
            saveTasks(); // Save after deletion
        };
        
        // Append elements to task
        Task.appendChild(taskText);
        Task.appendChild(deleteButton);
        toDoList.appendChild(Task);
        
        saveTasks(); // Save after adding
        textBox.value = "";   // Clear the input after adding
    } 
    else {
        alert("Please enter a task");
    }
}

function saveTasks() {
    const tasks = [];
    const taskElements = toDoList.getElementsByClassName("task-text");
    for (let task of taskElements) {
        tasks.push(task.textContent);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskText => {
        const Task = document.createElement("li");
        Task.classList.add("task-item");
        
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskSpan.classList.add("task-text");
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = function() {
            Task.remove();
            saveTasks();
        };
        
        Task.appendChild(taskSpan);
        Task.appendChild(deleteButton);
        toDoList.appendChild(Task);
    });
}

