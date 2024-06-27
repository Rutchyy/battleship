export class Ship {
    constructor(name, length, hits = 0) {
        this.name = name;
        this.length = length;
        this.hits = hits;
    }

    hit() {
        if(!this.isSunk()) this.hits++;
    }

    isSunk() {
        return this.hits == this.length;
    }
}

export class Gameboard {
    constructor() {
        this.board = [...Array(100).keys()].map((i) => (0));
        this.hits = [];
        this.misses = [];
        this.ships = [];
    }

    add(ship, x, y, dir) {
        // Throws error if the ship is out of bounds.
        if((dir == "h" && x + ship.length > 10) || (dir == "v" && y + ship.length > 10))
            throw new Error("The ship was placed out of bounds. Please try again.");

        // Finds the tiles that the ship will take up the space of, and ensures no overlapping.
        const tiles = [];
        for(let i = 0; i < ship.length; i++) {
            const column = dir == "v" ? x + i : x;
            const row = dir == "h" ? y + i : i;
            if(this.board[row + column * 10])
                throw new Error("The ship overlaps another. Please try again.");
            tiles.push(row + column * 9);
        }

        // Finally, appending the ship to the gameboard.
        tiles.forEach((item) => {
            this.board[item] = ship;
        });

        this.ships.push(ship);
    }

    attack(x, y) {
        // Validating the the coordinates haven't already been attacked.
        if(this.hits.some(pos => pos[0] == x && pos[1] == y) ||
            this.misses.some(pos => pos[0] == x && pos[1] == y)
        ) throw new Error("This tile has already been clicked. Try again.");

        const ship = this.board[x + y * 9]; // need to add validation to ensure the tile hasn't already been attacked.

        if(ship) {
            ship.hit();
            this.hits.push([x, y]);
        } else {
            this.misses.push([x, y]);
        }

        return ship;
    }

    allSunk() {
        return this.hits >= 3; // 3 should be changed to 17.
    }
}

export class Player {
    constructor () {
        this.gameboard = new Gameboard();
    }

    addShip(length, x, y, dir) {
        // Outputs the class of the ship that's being added.
        let ship;
        switch (length) {
            case 5:
                ship = new Ship("Aircraft Carrier", 5);
                break
            case 4:
                ship = new Ship("Battleship", 4);
                break
            case 3:
                ship = new Ship("Destroyer", 3);
                break
            case 2:
                ship = new Ship("Submarine", 3);
                break
            case 1:
                return new Ship("Cruiser", 2);
        }
        this.gameboard.add(ship, x, y, dir);
    }

    randomFleet() {
        const lengths = [5, 4, 3, 3, 2];
        let index = 0;

        // Iterates until all 5 ships have been properly placed.
        while(this.gameboard.ships.length < 5) {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const dir = Math.floor(Math.random() * 2) == 1 ? "h" : "v";

            try {
                this.addShip(lengths[index], x, y, dir);
                index++;
            } catch (error) {
                // error
            }
        }
    }

    restart() {
        this.gameboard = new Gameboard();
    }
}