export function botMove(shipHits = [], shipMisses = [], botBoard = []) {
    while(true) {
        const calc = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
        if(!shipMisses.some(arr => arr[0] === calc[0] && arr[1] === calc[1]) &&
           !shipHits.some(arr => arr[0] === calc[0] && arr[1] === calc[1])) {

            return calc;
        }
        
    }
}