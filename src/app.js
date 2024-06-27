import { Ship, Gameboard, Player } from "./classes.js";
import { createGrid } from "./build";
import { botMove } from "./bot.js";
import "./style.css";

const playerContainer = document.querySelector('#player');
const computerContainer = document.querySelector('#computer');
const playerText = document.querySelector(".left h3")
const computerText = document.querySelector(".right h3")
const footer = document.querySelector("footer")

const player = new Player();
const computer = new Player();

function newMatch() {
    player.randomFleet();
    computer.randomFleet();

    createGrid(playerContainer, player.gameboard.board, true);
    createGrid(computerContainer, computer.gameboard.board, true);
}

newMatch()

const randomize = document.querySelector("#randomize")
randomize.addEventListener("click", () => {
    player.restart()
    player.randomFleet()
    createGrid(playerContainer, player.gameboard.board, true)
})

const start = document.querySelector("#start")
start.addEventListener("click", () => {
    randomize.style.display = "none";
    start.style.display = "none";
    document.querySelector(".right").style.display = "block";
    playerText.textContent = "Player"
})

const playerGrid = document.querySelector("#player")
const computerGrid = document.querySelector("#computer")

computerGrid.addEventListener("mouseover", (event) => {
    let target = event.target
    const index = Array.prototype.indexOf.call(computerGrid.children, target)
    const attacked = computer.gameboard.attack(index % 10, Math.floor(index / 10))
    if(computer.gameboard.allSunk()) {
        document.querySelector("#win").style.display = "block";
        document.querySelector("footer h2").textContent = "You win"
    }
    if(attacked == 0) {
        target.textContent = "•";
    } else {
        target.textContent = "×";
    }

    const move = botMove(player.gameboard.hits, player.gameboard.misses)
    player.gameboard.attack(move)
    if(player.gameboard.allSunk()) {
        document.querySelector("#win").style.display = "block";
        document.querySelector("footer h2").textContent = "You loose"
    }
    let calc = move[0] + move[1] * 10
    target = document.querySelector(`#n${calc}`)
    if(player.gameboard.board[calc] == 0) {
        target.textContent = "•";
    } else {
        target.textContent = "×";
    }
})

const newGame = document.querySelector("#new_game");
newGame.addEventListener("click", () => {
    document.querySelector(".right").style.display = "none";
    footer.style.display = "none";
    randomize.style.display = "block";
    start.style.display = "block";
    player.restart()
    computer.restart()
    newMatch()
})