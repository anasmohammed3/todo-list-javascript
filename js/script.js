var input = document.getElementById("input");
var add = document.getElementById("add");
var tasks = document.getElementById("tasks");
var allTasks = [];

// Add a new task
add.addEventListener("click", function() {
    if (input.value === "") {
        alert("Please enter a task");
    } else {
        allTasks.push({ text: input.value, completed: false }); // Add the new task with completed status
        input.value = ""; // Clear the input field
        localStorage.setItem("tasks", JSON.stringify(allTasks)); // Save tasks in localStorage
        display(); // Update the display after adding a task
        input.focus();
    }    
});

// Display tasks
function display() {
    tasks.innerHTML = ""; // Clear the tasks container

    var taskHeader = document.createElement("div");
    taskHeader.classList.add("row", "align-items-center", "justify-content-between", "down");

    var taskTitle = document.createElement("h4");
    taskTitle.innerHTML = "Tasks";
    taskHeader.appendChild(taskTitle); 

    var taskNumber = document.createElement("h6");
    taskNumber.innerHTML = allTasks.length + " tasks";
    taskHeader.appendChild(taskNumber); 

    tasks.appendChild(taskHeader);

    // Create p elements for each task
    for (let i = 0; i < allTasks.length; i++) {
        let taskItem = document.createElement("p");
        taskItem.textContent = allTasks[i].text; 

        // Apply the line-through class if the task is completed
        if (allTasks[i].completed) {
            taskItem.classList.add("line-through");
        }

        // Add click event listener to toggle line-through
        taskItem.addEventListener("click", function() {
            toggleCompletion(i); // Pass the index to toggleCompletion
        });

        // Create Edit and Delete buttons
        let actions = document.createElement("div");
        actions.classList.add("actions");

        let editSpan = document.createElement("span");
        editSpan.textContent = " Edit ";
        editSpan.style.color = "blue";
        editSpan.style.cursor = "pointer";

        let deleteSpan = document.createElement("span");
        deleteSpan.textContent = " Delete ";
        deleteSpan.style.color = "red";
        deleteSpan.style.cursor = "pointer";

        // Add event listener for edit button
        editSpan.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent triggering toggleCompletion
            editTask(i, taskItem);
        });

        // Add event listener for delete button
        deleteSpan.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent triggering toggleCompletion
            deleteTask(i);
        });

        actions.appendChild(editSpan);
        actions.appendChild(deleteSpan);

        taskItem.appendChild(actions);
        tasks.appendChild(taskItem);
    }
}

// Toggle task completion
function toggleCompletion(index) {
    allTasks[index].completed = !allTasks[index].completed; // Toggle the completion status
    localStorage.setItem("tasks", JSON.stringify(allTasks)); // Update localStorage
    display(); // Re-display the tasks
}

// Edit task function
function editTask(index, taskItem) {
    let taskText = allTasks[index].text;

    // Create input field to replace the task content
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("form-input");
    editInput.value = taskText;

    // Prevent click events from propagating and toggling the task completion
    editInput.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    // Create save button
    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("btnn");
    saveButton.addEventListener("click", function(event) {
        event.stopPropagation();
        allTasks[index].text = editInput.value; // Update the task in the array
        localStorage.setItem("tasks", JSON.stringify(allTasks)); // Update localStorage
        display(); // Re-display the tasks
    });

    // Replace the task <p> content with the input and save button
    taskItem.innerHTML = "";
    taskItem.appendChild(editInput);
    taskItem.appendChild(saveButton);
}

// Delete task function
function deleteTask(index) {
    allTasks.splice(index, 1); // Remove the task from the array
    localStorage.setItem("tasks", JSON.stringify(allTasks)); // Update localStorage
    display(); // Re-display the tasks
}

// Load tasks from localStorage if they exist
function loadTasks() {
    if (localStorage.getItem("tasks")) {
        allTasks = JSON.parse(localStorage.getItem("tasks"));
        display(); 
    }
}

// Call loadTasks when the page is ready
loadTasks();
























