const screen = document.querySelector(".screen span");

function btnClicked(btn) {
    if(btn.value === "power") {
        const tempBtn = document.querySelectorAll(".button");
    }
    if(btn.value === "ac") {
        screen.textContent = "";
        return
    }
    if(btn.value === "ce") {
        screen.textContent = "";
        return
    }
    screen.textContent += btn.value;
}

const btn = document.querySelectorAll(".button");

btn.forEach(btn => {
    btn.addEventListener("click", () => btnClicked(btn));
})

