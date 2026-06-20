const taskForm = document.getElementById("task-form");
const newTaskInput = document.getElementById("new-task-input");
const newTaskBtn = document.getElementById("new-task-btn");
const ongoingTaskList = document.getElementById("ongoing-task-list");
const completedTaskList = document.getElementById("completed-task-list");
const deletedTaskList = document.getElementById("deleted-task-list");

const taskArr = [];
updateTask();

function updateTask() {
    // displaying task
    ongoingTaskList.innerHTML = taskArr
        .filter((task) => task.status === "ongoing")
        .map((task) => {1
            return `<li class="task" id="task${task.id}">
                <div>
                    <input type="checkbox" class="checkbox" name="checkbox-${task.id}" data-id="${task.id}">
                    <span class="task-text" data-id="${task.id}">${task.text}</span>
                </div>
                <button class="delete-btn" data-id="${task.id}">&#10005;</button>
            </li>`
        })
        .join("");
    completedTaskList.innerHTML = taskArr
        .filter((task) => task.status === "complete")
        .map((task) => {
            return `<li class="task" id="task${task.id}">
                <div>
                    <span class="task-text" data-id="${task.id}">${task.text}</span>
                </div>
                <button class="revert-btn" data-id="${task.id}">&cularr;</button>
            </li>`
        })
        .join("");
    deletedTaskList.innerHTML = taskArr
        .filter((task) => task.status === "deleted")
        .map((task) => {
            return `<li class="task" id="task${task.id}">
                <div>
                    <span class="task-text" data-id="${task.id}">${task.text}</span>
                </div>
                <button class="revert-btn" data-id="${task.id}">&cularr;</button>
            </li>`
        })
        .join("");
};

// Add new task
newTaskBtn.addEventListener("click", () => {
    // check if input is valid and new
    const taskText = newTaskInput.value.trim();
    if(!taskText) {
        alert("Please add a task!");
        return;
    }
    if(taskArr.some(task => task.text.toLowerCase() === taskText.toLowerCase())) {
        alert("Task already added!");
        return;
    }

    // Creating task
    const task = {
        id: Date.now(),
        text: taskText,
        status: "ongoing"
    };
    // Adding task to array
    taskArr.push(task);

    newTaskInput.value = "";
    updateTask();
});
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    newTaskBtn.click();

});

// Delete task or Mark as complete task
ongoingTaskList.addEventListener("click", (e) => {
    // Get the id of clicked task
    const id = Number(e.target.dataset.id);
    const task = taskArr.find(task => task.id === id);

    // Check if delete button is clicked
     if (e.target.classList.contains("delete-btn")) {
        task.status = "deleted";
    }
    // Check if checkbox is clicked
     if (e.target.classList.contains("checkbox")) {
        task.status = "complete";
    }
    updateTask();
})

// Revert completed task to ongoing
completedTaskList.addEventListener("click", (e) => {
    // Check if revert button is clicked
     if (e.target.classList.contains("revert-btn")) {
        // Get the id of clicked task
        const id = Number(e.target.dataset.id);
        const task = taskArr.find(task => task.id === id);
        task.status = "ongoing";
    }
    updateTask();
})
deletedTaskList.addEventListener("click", (e) => {
    // Check if revert button is clicked
     if (e.target.classList.contains("revert-btn")) {
        // Get the id of clicked task
        const id = Number(e.target.dataset.id);
        const task = taskArr.find(task => task.id === id);
        task.status = "ongoing";
    }
    updateTask();
})

