const footballTeam = {
  team: "Team Mag-tutulak",
  year: 2015,
  headCoach: "John Wick",
  players: [
  {
    name: "Joshua Sapon",
    position: "goalkeeper",
    isCaptain: false
  },
  {
    name: "Iverson Bragado",
    position: "forward",
    isCaptain: false
  },
  {
    name: "James Edrick Felipe",
    position: "defender",
    isCaptain: false
  },
  {
    name: "Jemmel Floranza",
    position: "midfielder",
    isCaptain: true
  },
  {
  name: "Lance Gutierrez",
  position: "goalkeeper",
  isCaptain: false
  },
  {
    name: "Renz Valmoria",
    position: "goalkeeper",
    isCaptain: false
  },
  {
    name: "Kyle Fernandez",
    position: "forward",
    isCaptain: false
  },
  {
    name: "Nathan Cabrera",
    position: "forward",
    isCaptain: false
  },
  {
    name: "Ethan Dela Cruz",
    position: "forward",
    isCaptain: false
  },
  {
    name: "Marky Villanueva",
    position: "forward",
    isCaptain: false
  },
  {
    name: "Cedrick Ramos",
    position: "midfielder",
    isCaptain: false
  },
  {
    name: "Paolo Mendoza",
    position: "midfielder",
    isCaptain: false
  },
  {
    name: "Ralph Tulio",
    position: "midfielder",
    isCaptain: false
  },
  {
    name: "Kevin Soriano",
    position: "midfielder",
    isCaptain: false
  },
  {
    name: "Sean Alvarado",
    position: "midfielder",
    isCaptain: false
  },
  {
    name: "Miguel Pascual",
    position: "midfielder",
    isCaptain: false
  },
  {
    name: "Jared Manansala",
    position: "midfielder",
    isCaptain: false
  },
  {
    name: "Christian Navarro",
    position: "defender",
    isCaptain: false
  },
  {
    name: "Vince Aguilar",
    position: "defender",
    isCaptain: false
  },
  {
    name: "Noel Garcia",
    position: "defender",
    isCaptain: false
  },
  {
    name: "Adrian Tolentino",
    position: "defender",
    isCaptain: false
  },
  {
    name: "Carl Esteban",
    position: "defender",
    isCaptain: false
  },
  {
    name: "Jerome Bautista",
    position: "defender",
    isCaptain: false
  },
  {
    name: "Elijah Santos",
    position: "defender",
    isCaptain: false
  }
  ]
}

console.log(footballTeam.players.length);

function getAllPlayers() {
  return footballTeam.players.map(player =>
    `<div class="player-card">
      <h2>${player.isCaptain ? "(Captain)" : ""} ${player.name}</h2>
      <p>Position: ${player.position}</p>
    </div>`
  )
}
function getPlayersByPosition(position) {
  if(position === "all") {
    return getAllPlayers();
  }
  return footballTeam.players
    .filter(player => player.position === position)
    .map(player => {
    return `<div class="player-card">
      <h2>${player.isCaptain ? "(Captain)" : ""} ${player.name}</h2>
      <p>Position: ${player.position}</p>
    </div>`
  })
}

const team = document.getElementById("team");
const year = document.getElementById("year");
const headCoach = document.getElementById("head-coach");
const playerCards = document.getElementById("player-cards");

team.innerText = footballTeam.team;
year.innerText = footballTeam.year;
headCoach.innerText = footballTeam.headCoach;
playerCards.innerHTML = getAllPlayers().join("");

const positionSelector = document.getElementById("players");

positionSelector.addEventListener("change", () => {
  playerCards.innerHTML = getPlayersByPosition(positionSelector.value).join("");
})