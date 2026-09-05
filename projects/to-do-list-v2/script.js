lucide.createIcons();

// Notes:

    // Clear all tasks: 
    // localStorage.removeItem("trash");
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
});
// Setting Dates ↓

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const formattedToday = formatDate(today);
const formattedTomorrow = formatDate(tomorrow);

// Setting Dates ↑

// Navigation and Main ↓

const views = [
    {
        name: "all-task-li",
        title: "All Tasks",
        filter: task => true,
    },
    {
        name: "today-li",
        title: "Today",
        filter: task => task.dueDate === formattedToday,
    },
    {
        name: "favorite-li",
        title: "Favorite",
        filter: task => task.favorite,
    },
    {
        name: "ongoing-li",
        title: "Ongoing",
        filter: task => task.status === "Ongoing",
    },
    {
        name: "completed-li",
        title: "Completed",
        filter: task => task.status === "Completed",
    },
    {
        name: "trash-li",
        title: "Trash",
        filter: task => true,
    }
];

const navLinks = document.querySelectorAll(".nav-link");
let selectedNav = "all-task-li";
let currentView = views.find(view => view.name === selectedNav);

renderMain(selectedNav);
renderNavLinksBadges();

navLinks.forEach(navLink => {
    navLink.addEventListener("click", () => {
        navLinks.forEach(navLink => {
            navLink.classList.remove("selected");
        })
        navLink.classList.add("selected");
        selectedNav = navLink.id;
        currentView = views.find(view => view.name === selectedNav);

        renderMain(selectedNav);
    });
});

// Navigation and Main ↑

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
                selectedDate = formattedToday;
                break;
            case "due-date-tomorrow":
                dueDate.textContent = "Tomorrow";
                dueDateBtn.style.color = "var(--color-text)";
                selectedDate = formattedTomorrow;
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

taskListUl.addEventListener("click", (e) => {
    if (e.target.closest(".task")) {
        const taskElement = e.target.closest(".task");
        const taskId = taskElement.dataset.id;

        if (e.target.closest(".task-checkbox")) {
            const taskLi = document.querySelector(`[data-id="${taskId}"] div`);
            taskLi.classList.toggle("completed");
            toggleStatus(taskId, tasks);
        } else if (e.target.closest(".task-favorite-btn")) {
            const taskLi = document.querySelector(`[data-id="${taskId}"] .task-favorite-btn`);
            taskLi.classList.toggle("favorite");
            toggleFavorite(taskId, tasks);
        } else if (e.target.closest(".delete-btn")) {
            deleteTask(taskId);
        } else {
            showTaskModal("edit", taskId)
        }
    }
});

const trashListUl = document.querySelector(".trash-list-ul");

trashListUl.addEventListener("click", (e) => {
    if (e.target.closest(".task")) {
        const taskElement = e.target.closest(".task");
        const taskId = taskElement.dataset.id;

        if (e.target.closest(".task-checkbox")) {
            const taskLi = document.querySelector(`[data-id="${taskId}"] div`);
            taskLi.classList.toggle("completed");
            toggleStatus(taskId, trash);
        } else if (e.target.closest(".task-favorite-btn")) {
            const taskLi = document.querySelector(`[data-id="${taskId}"] .task-favorite-btn`);
            taskLi.classList.toggle("favorite");
            toggleFavorite(taskId, trash);
        } else if (e.target.closest(".delete-btn")) {
            deleteTask(taskId);
        }
    }
});

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

// Task list ↑ 

// Functions ↓

function renderNavLinksBadges() {
    const allTaskBadge = document.getElementById("all-task-count");
    const todayBadge = document.getElementById("today-count");
    const favoriteBadge = document.getElementById("favorite-count");
    const ongoingBadge = document.getElementById("ongoing-count");
    const completedBadge = document.getElementById("completed-count");
    const trashBadge = document.getElementById("trash-count");

    const now = formatDate(new Date());

    allTaskBadge.textContent = tasks.length;
    todayBadge.textContent = tasks.filter(task => task.dueDate === now).length;
    favoriteBadge.textContent = tasks.filter(task => task.favorite === true).length;
    ongoingBadge.textContent = tasks.filter(task => task.status === "Ongoing").length;
    completedBadge.textContent = tasks.filter(task => task.status === "Completed").length;
    trashBadge.textContent = trash.length;
}

function renderMain(selectedNav) {
    const addTaskBtn = document.getElementById("add-task-btn");
    const quickAddTaskCon = document.querySelector(".quick-add-task-container");
    const statusControls = document.querySelector(".status-controls");

    if (selectedNav !== "all-task-li") {
        addTaskBtn.classList.add("hide");
        quickAddTaskCon.classList.add("hide");
        statusControls.classList.add("hide");
    } else {
        addTaskBtn.classList.remove("hide");
        quickAddTaskCon.classList.remove("hide");
        statusControls.classList.remove("hide");
    }

    const header = document.querySelector("header h1");
    header.textContent = currentView.title;

    if (selectedNav === "trash-li") {
        renderTrash();
    } else {
        renderTask();
    }

    renderNavLinksBadges();
}

function renderTask() {
    const trashListUl = document.querySelector(".trash-list-ul");
    trashListUl.innerHTML = "";
    const taskListUl = document.querySelector(".task-list-ul");
    taskListUl.innerHTML = "";

    let filteredTask = tasks.filter(currentView.filter);

    filteredTask.forEach(task => {
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
    
    renderNavLinksBadges();
    lucide.createIcons();
};

function renderTrash() {
    const taskListUl = document.querySelector(".task-list-ul");
    taskListUl.innerHTML = "";
    const trashListUl = document.querySelector(".trash-list-ul");
    trashListUl.innerHTML = "";

    trash.forEach(task => {
        trashListUl.innerHTML += `
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
    
    renderNavLinksBadges();
    lucide.createIcons();
}

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

    const status = tasks.find(task => task.id === taskId)?.status || "Ongoing";
    const favorite = tasks.find(task => task.id === taskId)?.favorite || false;

    const newTaskObj = {
        id: taskId || crypto.randomUUID(),
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
    renderNavLinksBadges();
}

function deleteTask(taskId) {

    if (selectedNav === "trash-li") {
        const taskIndex = trash.findIndex(task => task.id === taskId);
        trash.splice(taskIndex, 1);
        localStorage.setItem("trash", JSON.stringify(trash));
        renderTrash();
        renderNavLinksBadges();
        return;
    }

    const task = tasks.find(task => task.id === taskId);
    trash.push(task);
    localStorage.setItem("trash", JSON.stringify(trash));
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask();
    renderNavLinksBadges();
}

function toggleStatus(taskId, taskList) {
    const task = taskList.find(task => task.id === taskId)
    task.status = task.status === "Completed" ? "Ongoing" : "Completed";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("trash", JSON.stringify(trash));
    if (selectedNav === "trash-li") {
        renderTrash();
    } else {
        renderTask();
    }
    renderNavLinksBadges();
}

function toggleFavorite(taskId, taskList) {
    const task = taskList.find(task => task.id === taskId)
    task.favorite = !task.favorite;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("trash", JSON.stringify(trash));
    if (selectedNav === "trash-li") {
        renderTrash();
    } else {
        renderTask();
    }
    renderNavLinksBadges();
}

function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

// Functions ↑