const pEtanol = 4.80;
const pGasolina = 5.79;
const gastoMedio /*Gasto medio KM por litro*/ = 10;
const distancia = 100;
const tipoDeCombustivel = 'Etanol';

const lConsumido = distancia / gastoMedio;

if (tipoDeCombustivel === 'Etanol'){
    const vGasto = lConsumido * pEtanol;
    console.log(vGasto.toFixed(2))
    
}else{
    const vGasto = lConsumido * pGasolina;
    console.log(vGasto.toFixed(2))
}