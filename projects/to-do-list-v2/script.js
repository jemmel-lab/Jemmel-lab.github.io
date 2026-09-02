lucide.createIcons();

// Notes:

    // Clear all tasks: localStorage.removeItem("tasks");
    // Task sample : const newTaskObj = {
                    //     id: crypto.randomUUID(),
                    //     title: title.value,
                    //     description: description.value,
                    //     dueDate: dueDate,
                    //     priority: priority.value,
                    //     category: category.value,
                    //     favorite: false,
                    //     status: "Ongoing"
                    // }

// Initialize list storage

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const trash = JSON.parse(localStorage.getItem("trash")) || [];
    // localStorage.setItem("tasks", JSON.stringify(tasks));


// Close dropdown menu's
document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            menu.classList.remove("active");
        });
    }
    if (!e.target.closest(".sort-by-controls")) {
        document.querySelector(".sort-dropdown-menu").classList.remove("active");
    }
    // if (
    //     !e.target.closest(".task-more-btn-menu") &&
    //     !e.target.closest("#task-more-btn")
    // ) {
    //     document.querySelector(".task-more-btn-menu").classList.remove("active");
    // }
});

// Navigation ↓

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(navLink => {
    navLink.addEventListener("click", () => {
        navLinks.forEach(navLink => {
            navLink.classList.remove("selected");
        })
        navLink.classList.add("selected");
    });
});

// Navigation ↑

// Search ↓

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchForm.addEventListener("submit", () => {
    searchTask(searchInput.value)
});
searchBtn.addEventListener("click", () => {
    searchTask(searchInput.value)
});

function searchTask(input) {
    alert(input)
}

// Search ↑

// Add task ↓

const addTaskBtn = document.getElementById("add-task-btn");

addTaskBtn.addEventListener("click", () => {
    showTaskModal("add");
});

// Add task ↑

// Quick add task ↓

const quickAddTaskTitle = document.getElementById("quick-add-task-input");
const dropdownBtns = document.querySelectorAll(".dropdown-btn");
const allDropdownMenu = document.querySelectorAll(".dropdown-menu");

dropdownBtns.forEach(dropdownBtn => {
    dropdownBtn.addEventListener("click", () => {

        allDropdownMenu.forEach(dropdownMenu => {
            dropdownMenu.classList.remove("active");
        })

        const dropdownMenu = dropdownBtn.nextElementSibling;
        dropdownMenu.classList.toggle("active");
    });
});

// ---- Due Date
const dueDateDropdownMenu = document.getElementById("due-date-dropdown-menu");
const dueDateBtn = document.querySelector("#due-date-dropdown-btn");
const dueDate = dueDateBtn.querySelector("span");
const dueDateRadio = document.querySelectorAll(".due-date-radio [name='due-date-radio']");
const dueDatePicker = document.getElementById("due-date-picker");

let selectedDate = "None";
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

dueDateRadio.forEach(radio => {
    radio.addEventListener("change", () => {
        
        switch(radio.id) {
            case "no-due-date":
                dueDate.textContent = "No due Date";
                dueDateBtn.style.color = "var(--color-text-muted)";
                selectedDate = "None";
                break;
            case "due-date-today":
                dueDate.textContent = "Today";
                dueDateBtn.style.color = "var(--color-text)";
                selectedDate = formatDate(today);
                break;
            case "due-date-tomorrow":
                dueDate.textContent = "Tomorrow";
                dueDateBtn.style.color = "var(--color-text)";
                selectedDate = formatDate(tomorrow);
                break;
        }

        dueDatePicker.value = "";
        dueDateDropdownMenu.classList.remove("active");
    });
});
dueDatePicker.addEventListener("change", () => {

    dueDateRadio.forEach(radio => {
        radio.checked = false;
    });

    if(!dueDatePicker.value) {
        dueDate.textContent = "No due date";
        dueDateBtn.style.color = "var(--color-text-muted)";
        selectedDate = "None";
    } else {
        dueDateBtn.style.color = "var(--color-text)";
        const [year, month, day] = dueDatePicker.value.split('-');
        selectedDate = `${month}/${day}/${year}`;
        dueDate.textContent = selectedDate;
    }

    dueDateDropdownMenu.classList.remove("active");
});

// ---- Priority
const priorityDropdownMenu = document.getElementById("priority-dropdown-menu");
const priorityDropdownBtns = document.querySelectorAll("#priority-dropdown-menu button");
const priorityBtn = document.querySelector("#priority-dropdown-btn");
const priority = priorityBtn.querySelector("span");
let selectedPriority = "None";

priorityDropdownBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const spanElement = btn.querySelector("span");

        priority.textContent = spanElement.textContent;
        selectedPriority = spanElement.textContent;

        switch (spanElement.textContent) {
            case "High":
                priorityBtn.style.color = "var(--color-danger)";
                break;
            case "Medium":
                priorityBtn.style.color = "var(--color-warning)";
                break;
            case "Low":
                priorityBtn.style.color = "var(--color-success)";
                break;
            case "No priority":
                priorityBtn.style.color = "var(--color-text-muted)";
                selectedPriority = "None";
                break;
        }
        priorityDropdownMenu.classList.remove("active");
    });
});

// ---- Category
const categoryDropdownMenu = document.getElementById("category-dropdown-menu");
const categoryDropdownBtns = document.querySelectorAll("#category-dropdown-menu button");
const categoryBtn = document.querySelector("#category-dropdown-btn");
const category = categoryBtn.querySelector("span");
let selectedCategory = "None";

categoryDropdownBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const spanElement = btn.querySelector("span");

        category.textContent = spanElement.textContent;
        selectedCategory = spanElement.textContent;

        switch (spanElement.textContent) {
            case "Work":
                categoryBtn.style.color = "var(--color-info)";
                break;
            case "Personal":
                categoryBtn.style.color = "var(--color-success)";
                break;
            case "Study":
                categoryBtn.style.color = "var(--color-more-accent)";
                break;
            case "Other":
                categoryBtn.style.color = "var(--color-warning)";
                break;
            case "No category":
                categoryBtn.style.color = "var(--color-text-muted)";
                selectedCategory = "None";
                break;
        }
        categoryDropdownMenu.classList.remove("active");
    });
});

const quickAddTaskBtn = document.getElementById("quick-add-task-btn");
quickAddTaskBtn.addEventListener("click", () => {
    if (!quickAddTaskTitle.checkValidity()) {
        quickAddTaskTitle.reportValidity();
        return;
    }

    const newTaskObj = {
        id: crypto.randomUUID(),
        title: quickAddTaskTitle.value,
        description: "None",
        dueDate: selectedDate,
        priority: selectedPriority,
        category: selectedCategory,
        favorite: false,
        status: "Ongoing"
    }

    tasks.push(newTaskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("task-modal").classList.remove("active");
    renderTask();
    selectedDate = "None";
    dueDate.textContent = "Due Date";
    dueDateBtn.style.color = "var(--color-text-muted)";
    selectedPriority = "None";
    priority.textContent = "Priority";
    priorityBtn.style.color = "var(--color-text-muted)";
    selectedCategory = "None";
    category.textContent = "Category";
    categoryBtn.style.color = "var(--color-text-muted)";
    quickAddTaskTitle.value = "";

})

// Quick add task ↑ 

// Task list ↓

// ---- Render tasks
const taskListUl = document.querySelector(".task-list-ul");
renderTask();

// ---- Task list controls
const statusButtons = document.querySelectorAll(".status-controls button");

statusButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        statusButtons.forEach(btn => {
            btn.classList.remove("selected");
        });
        btn.classList.add("selected");
    });
});

const sortDropdownBtn = document.querySelector(".sort-dropdown-btn");
const sortDropdownMenu = document.querySelector(".sort-dropdown-menu");
const sortDropdownMenuBtns = sortDropdownMenu.querySelectorAll("button");
const ascendingDescendingBtn = document.querySelector(".ascending-descending");
const icon = ascendingDescendingBtn.querySelector("svg");

sortDropdownBtn.addEventListener("click", () => {
    sortDropdownMenu.classList.toggle("active");
});

sortDropdownMenuBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const sortBy = btn.querySelector("span").textContent;
        ascendingDescendingBtn.querySelector("span").textContent = sortBy;
        sortDropdownMenu.classList.remove("active");
        icon.classList.remove("descending");
    });
});

ascendingDescendingBtn.addEventListener("click", () => {
    icon.classList.toggle("descending");

});

const listDisplayBtn = document.querySelector(".list-display-controls");
const gridDisplayBtn = document.querySelector(".grid-display-controls");

listDisplayBtn.addEventListener("click", () => {
    listDisplayBtn.classList.add("selected");
    gridDisplayBtn.classList.remove("selected");
});
gridDisplayBtn.addEventListener("click", () => {
    gridDisplayBtn.classList.add("selected");
    listDisplayBtn.classList.remove("selected");
});

// ---- Task more button
    // TO-DO remake all this ↓↓↓
    // const taskImportantBtn = document.getElementById("task-important-btn");
    // const taskMoreBtn = document.getElementById("task-more-btn");
    // const taskMoreBtnMenu = document.querySelector(".task-more-btn-menu");
    // const taskMoreEditBtn = document.getElementById("edit-task");
    // const taskMoreDeleteBtn = document.getElementById("delete-task");

    // taskImportantBtn.addEventListener("click", () => {
    //     taskImportantBtn.classList.toggle("important");
    // });

    // taskMoreBtn.addEventListener("click", () => {
    //     taskMoreBtnMenu.classList.toggle("active");

// });

// Task list ↑ 

// Functions ↓

function renderTask() {
    taskListUl.innerHTML = "";
    tasks.forEach(task => {
        taskListUl.innerHTML += `
            <li class="task" data-id="${task.id}">
                <input type="checkbox" class="task-checkbox" ${task.status === "Completed" ? "checked" : ""}>
                <div class="task-info ${task.status === "Completed" ? "completed" : ""}">
                    <span class="task-title">${task.title}</span>
                    <div>
                        <span>
                            <i data-lucide="calendar"></i>
                            ${task.dueDate}
                        </span>
                        <span>
                            <i data-lucide="flag"></i>
                            ${task.priority}
                        </span>
                        <span>
                            <i data-lucide="tag"></i>
                            ${task.category}
                        </span>
                    </div>
                </div>
                <button type="button" class="task-btn task-favorite-btn ${task.favorite ? "favorite" : ""}">
                    <i data-lucide="star"></i>
                </button>
                <button type="button" class="task-btn delete-btn">
                    <i data-lucide="trash"></i>
                </button>
            </li>
        `;
    });
    taskListUl.addEventListener("click", (e) => {
        if (e.target.closest(".task")) {
            const taskElement = e.target.closest(".task");
            const taskId = taskElement.dataset.id;

            if (e.target.closest(".task-checkbox")) {
                const taskLi = document.querySelector(`[data-id="${taskId}"] div`);
                taskLi.classList.toggle("completed");
                toggleStatus(taskId);
            } else if (e.target.closest(".task-favorite-btn")) {
                const taskLi = document.querySelector(`[data-id="${taskId}"] .task-favorite-btn`);
                taskLi.classList.toggle("favorite");
                toggleFavorite(taskId);
            } else if (e.target.closest(".delete-btn")) {
                taskElement.remove();
                deleteTask(taskId);
            } else {
                showTaskModal("edit", taskId)
            }
        }
    });
    lucide.createIcons();
};

function clearTaskModal() {
    const modal = document.querySelector(".modal-content");
    modal.querySelector("#task-title-input").value = "";
    modal.querySelector("#task-description-input").value = "";
    modal.querySelector("#task-due-date-input").value = "";
    modal.querySelector('input[name="priority-radio"][value="None"]').checked = true;
    modal.querySelector('input[name="category-radio"][value="None"]').checked = true;
}

function showTaskModal(type, taskId) {
    document.getElementById("task-modal").classList.add("active");
    const modal = document.querySelector(".modal-content");
    const confirmBtn = modal.querySelector("#confirm-btn");
    const cancelBtn = modal.querySelector("#cancel-btn");
    cancelBtn.addEventListener("click", () => {
        document.getElementById("task-modal").classList.remove("active");
    });

    if (type === "edit") {
        modal.querySelector("h2").textContent = "Edit task";
        modal.querySelector("#delete-btn").classList.add("active");
        modal.querySelector("#clear-btn").classList.remove("active");

        const task = tasks.find(task => task.id === taskId)

        let formattedDueDate = "None"
        if (task.dueDate !== "None") {
            const [month, day, year] = task.dueDate.split("/");
            formattedDueDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }

        modal.querySelector("#task-title-input").value = task.title;
        modal.querySelector("#task-description-input").value = task.description;
        modal.querySelector("#task-due-date-input").value = formattedDueDate;
        modal.querySelector(`input[name="priority-radio"][value="${task.priority}"]`).checked = true;
        modal.querySelector(`input[name="category-radio"][value="${task.category}"]`).checked = true;


        const deleteBtn = modal.querySelector("#delete-btn");
        deleteBtn.onclick = () => {
            deleteTask(taskId);
            clearTaskModal();
            document.getElementById("task-modal").classList.remove("active");
            const taskLi = document.querySelector(`[data-id="${taskId}"]`);
            taskLi.remove();
        };
        confirmBtn.querySelector("span").textContent = "Edit Task";
        confirmBtn.onclick = () => {
            updateTaskList(taskId);
        };

    } else {
        modal.querySelector("#delete-btn").classList.remove("active");
        modal.querySelector("#clear-btn").classList.add("active");

        const clearBtn = modal.querySelector("#clear-btn");
        clearBtn.onclick = () => {
            clearTaskModal();
        };

        confirmBtn.querySelector("span").textContent = "Add Task";
        confirmBtn.onclick = () => {
            const titleInput = document.getElementById("task-title-input")
            if (!titleInput.checkValidity()) {
                titleInput.reportValidity();
            } else {
                updateTaskList();
            }
        };
    }
}

function updateTaskList(taskId) {
    const modal = document.querySelector(".modal-content");
    const title = modal.querySelector("#task-title-input");
    const description = modal.querySelector("#task-description-input");

    const dateInput = modal.querySelector("#task-due-date-input");
    const [year, month, day] = dateInput.value.split('-');
    const dueDate = dateInput.value
        ? `${month}/${day}/${year}`
        : "None";

    const priority = modal.querySelector('input[name="priority-radio"]:checked');
    const category = modal.querySelector('input[name="category-radio"]:checked');

    const status = tasks.find(task => task.id === taskId).status || "Ongoing";
    const favorite = tasks.find(task => task.id === taskId).favorite || false;

    const newTaskObj = {
        id: crypto.randomUUID(),
        title: title.value,
        description: description.value,
        dueDate: dueDate,
        priority: priority.value,
        category: category.value,
        favorite: favorite,
        status: status
    }

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newTaskObj;
    } else {
        tasks.push(newTaskObj);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("task-modal").classList.remove("active");
    renderTask();
    clearTaskModal();
}

function deleteTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    trash.push(task);
    localStorage.setItem("trash", JSON.stringify(trash));
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleStatus(taskId) {
    const task = tasks.find(task => task.id === taskId)
    task.status = task.status === "Completed" ? "Ongoing" : "Completed";
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleFavorite(taskId) {
    const task = tasks.find(task => task.id === taskId)
    task.favorite = !task.favorite;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

// Functions ↑