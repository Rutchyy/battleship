export function createGrid(container, fill) {
    // while (container.firstChild) {
    //     container.removeChild(container.lastChild);
    // }

    for(let i = 0; i <= 99; i++) {
        const tile = document.createElement("div");
        if(fill[i] != 0) {
            console.log(fill[i])
            tile.setAttribute("style", "background: red;")
        }
        tile.textContent = i;
        tile.classList.add("tile");
        container.appendChild(tile);
    }
}