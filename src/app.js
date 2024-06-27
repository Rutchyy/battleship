import { Ship, Gameboard, Player } from "./classes.js";
import { createGrid } from "./build";
import "./style.css";

const playerContainer = document.querySelector('#player');
const computerContainer = document.querySelector('#computer');

const player = new Player();
player.randomFleet();
console.log(player)
console.log("hehe")

createGrid(playerContainer, player.gameboard.board);
// createGrid(computerContainer);

const randomize = document.querySelector("#randomize")
randomize.addEventListener("click", () => {
    player.restart()
    player.randomFleet()
    createGrid(playerContainer, player.gameboard.board)
})