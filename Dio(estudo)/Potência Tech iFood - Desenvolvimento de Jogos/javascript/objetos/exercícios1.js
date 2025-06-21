class Carro{
    marca;
    cor;
    gastoMedioKm;

    constructor (marca,cor,gastoMedioKm) {
        this.marca = marca;
        this.cor = cor;
        this.gastoMedioKm = gastoMedioKm;
    }

    valorGasto(distancia , precoCombustivel){
        return( distancia * this.gastoMedioKm) * precoCombustivel
    }
}

const gol = new Carro('gol', 'verde', (1/15).toFixed(2));
console.log(gol);
console.log('R$',gol.valorGasto(70,5).toFixed(2));

const ferrari = new Carro('ferrari','vermelha', (1/5).toFixed(2));
console.log(ferrari);
console.log('R$', ferrari.valorGasto(70,5).toFixed(2));