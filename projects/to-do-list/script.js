const newTaskInput = document.getElementById("new-task-input");
const newTaskBtn = document.getElementById("new-task-btn");
const taskList = document.getElementById("ongoing-task-list");

const taskArr = [];

function updateTask() {
    taskList.innerHTML = taskArr.map((task, index) => {
        return `<li class="task" id="task${index+1}">
            <div>
                <input type="checkbox" class="checkbox" name="task${index+1}-checkbox" id="task${index+1}-checkbox">
                <span class="task-text">${task}</span>
            </div>
            <button class="delete-btn" id="delete-btn${index+1}">&#10005;</button>
        </li>`
    }).join("");
};
updateTask();

newTaskBtn.addEventListener("click", () => {
    if(!newTaskInput.value) {
        alert("Please add a task!");
        return;
    }
    if(taskArr.includes(newTaskInput.value)) {
        alert("Task already added!");
        return;
    }
    taskArr.push(newTaskInput.value);
    updateTask();
})