const newTaskInput = document.getElementById("new-task-input");
const newTaskBtn = document.getElementById("new-task-btn");
const ongoingTaskList = document.getElementById("ongoing-task-list");

const taskArr = [];

function updateTask() {
    // displaying task
    ongoingTaskList.innerHTML = taskArr.map((task, index) => {
        return `<li class="task" id="task${index}">
            <div>
                <input type="checkbox" class="checkbox" name="task${index}-checkbox" data-id="${task.id}" ${task.completed ? "checked" : ""}>
                <span class="task-text ${task.completed ? "crossed-out" : "" }" data-id="${task.id}">${task.text}</span>
            </div>
            <button class="delete-btn" data-id="${task.id}">&#10005;</button>
        </li>`
    }).join("");
    console.log(taskArr)
};
updateTask();

// Add new task
newTaskBtn.addEventListener("click", () => {
    // TO-DO: make prettier alerts
    // check if input is valid and new
    if(!newTaskInput.value) {
        alert("Please add a task!");
        return;
    }
    if(taskArr.includes(newTaskInput.value)) {
        alert("Task already added!");
        return;
    }

    // Creating task
    const task = {
        id: Date.now(),
        text: newTaskInput.value,
        completed: false
    };
    // Adding task to array
    taskArr.push(task);

    newTaskInput.value = "";
    updateTask();
})

// Delete task or Mark as done task
ongoingTaskList.addEventListener("click", (e) => {
    // Check if delete button is clicked
     if (e.target.classList.contains("delete-btn")) {
        // Get the id of clicked task
        const id = Number(e.target.dataset.id);
        // Find the index of clicked task
        const index = taskArr.findIndex(task => task.id === id);

        taskArr.splice(index, 1);
        updateTask();
    }
    // Check if checkbox is clicked
     if (e.target.classList.contains("checkbox")) {
        // Get the id of clicked task
        const id = Number(e.target.dataset.id);
        const task = taskArr.find(task => task.id === id);
        task.completed = !task.completed;

        updateTask();
    }
})
