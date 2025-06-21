const precoCombustivel = 5.79;
const gastoMedio /*Gasto medio KM por litro*/ = 10;
const distancia = 100;

const listrosConsumido = distancia / gastoMedio;
const gasto = listrosConsumido * precoCombustivel;

console.log('o valor gasto sera de: '+gasto.toFixed(2));