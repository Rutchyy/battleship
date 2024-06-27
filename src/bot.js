export function botMove(shipHits = [], shipMisses = []) {
    let calc;
    while(true) {
        calc = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
        if(!shipHits.includes(calc) && !shipMisses.includes(calc)) {
            return calc;
        }
    }
}