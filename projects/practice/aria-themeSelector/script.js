const themes = [
  {
    name: "light",
    message: "You've selected Light theme - goodbye good night sleep!",
    palette: "theme-light"
  },
  {
    name: "dark",
    message: "You've selected Dark theme - hello night owl!",
    palette: "theme-dark"
  },
  {
    name: "eyesore",
    message: "You've selected Eyesore - FUCK YOU!",
    palette: "theme-eyesore"
  }
];

const themeSwitchBtn = document.getElementById("theme-switcher-button");
const themeDropdown = document.getElementById("theme-dropdown");
const themeItems = document.querySelectorAll("[role='menuitem']");
const statusDiv = document.getElementById("status");

themeSwitchBtn.addEventListener("click", () => {
  themeDropdown.hidden = !themeDropdown.hidden;
  themeSwitchBtn.setAttribute("aria-expanded", `${!themeDropdown.hidden}`)
});

themeItems.forEach(item => {
  item.addEventListener("click", () => {
    for(const theme of themes) {
      if(theme.name === item.textContent.toLowerCase()){
        statusDiv.textContent = theme.message;
        document.body.classList.remove("theme-light", "theme-dark", "theme-eyesore");
        document.body.classList.add(theme.palette);
      }
    }
  })
})