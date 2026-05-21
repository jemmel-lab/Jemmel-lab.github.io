const screen = document.querySelector(".screen");

function btnClicked(btn) {
    console.log(btn.value);
    screen.textContent += btn.value;
}

const btn = document.querySelectorAll(".button");

btn.forEach(btn => {
    btn.addEventListener("click", () => btnClicked(btn));
})

