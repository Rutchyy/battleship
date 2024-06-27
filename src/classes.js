export class Ship {
    constructor(name, length, hits = []) {
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
        if((dir == "h" && (x + ship.length > 9)) || (dir == "v" && (y + ship.length > 9)))
            throw new Error("The ship was placed out of bounds. Please try again.");
            // return;

        // Finds the tiles that the ship will take up the space of, and ensures no overlapping.
        const tiles = [];
        for(let i = 0; i < ship.length; i++) {
            let column;
            let row;
            if(dir == "v") {
                column = x;
                row = (y + i) * 10;
            } else {
                column = x + i;
                row = y * 10;
            }
            if(this.board[row + column])
                throw new Error("The ship overlaps another. Please try again.");
            tiles.push(row + column);
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

        const ship = this.board[x + y * 10];

        if(typeof ship == "object") {
            ship.hit();
            this.hits.push([x, y]);
        } else {
            this.misses.push([x, y]);
        }

        // console.log("Hits:")
        // console.log(this.hits)
        // console.log("Misses:")
        // console.log(this.misses)

        return ship;
    }

    allSunk() {
        return this.hits.length >= 17; // 3 should be changed to 17.
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
                ship = new Ship("Carrier", 5);
                break;
            case 4:
                ship = new Ship("Battleship", 4);
                break;
            case 3:
                ship = new Ship("Cruiser", 3);
                break;
            case 2:
                ship = new Ship("Destroyer", 2);
                break;
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

            if((dir == "h" && (lengths[index] + x <= 10)) || (dir =="v" && (lengths[index] + y <= 10))) {
                try {
                    this.addShip(lengths[index], x, y, dir);
                    index++;
                } catch (error) {
                    // console.log(error);
                }
            }
        }
    }

    restart() {
        this.gameboard = new Gameboard();
    }
}