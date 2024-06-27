import { Gameboard, Player } from "./classes.js";

export function createGrid(container, fill) {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    for(let i = 0; i <= 99; i++) {
        const tile = document.createElement("div");
        if(fill[i] != 0) {
            switch(fill[i].name) {
                case "Carrier":
                    tile.style.background = "#ff8888";
                    break;
                case "Battleship":
                    tile.style.background = "#b3fdff";
                    break;
                case "Cruiser":
                    tile.style.background = "#d5ffb5";
                    break;
                case "Submarine":
                    tile.style.background = "#f9ff93";
                    break;
                case "Destroyer":
                    tile.style.background = "#ffdda8";
                    break;
            }
        }
        tile.classList.add("tile");
        container.appendChild(tile);
    }
}

