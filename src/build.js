export function createGrid(container, fill) {
    // while (container.firstChild) {
    //     container.removeChild(container.lastChild);
    // }

    for(let i = 0; i <= 99; i++) {
        const tile = document.createElement("div");
        if(fill[i] != 0) {
            switch(fill[i].name) {
                case "Carrier":
                    tile.style.background = "red";
                    break;
                case "Battleship":
                    tile.style.background = "blue";
                    break;
                case "Cruiser":
                    tile.style.background = "green";
                    break;
                case "Submarine":
                    tile.style.background = "orange";
                    break;
                case "Destroyer":
                    tile.style.background = "purple";
                    break;
            }
        }
        tile.classList.add("tile");
        container.appendChild(tile);
    }
}