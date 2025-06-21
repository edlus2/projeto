const {gets,print} = require('./funcoes-auxiliares')

//console.log(funcoes.gets());


// const {gets , print} = require('./funcoes-auxiliares')

/*
const nSorteados = [];

for (let i = 0; i < 5; i++) {
    const nSorteado = gets();
    nSorteados.push(nSorteado);
}

let maior = 0;

for (let i = 0; i < nSorteados.length; i++) {
    const nSorteado = nSorteados[i];

    if(nSorteado > maior){
        maior = nSorteado;
    }
    
}

print(maior)
*/
const sorte = gets()
let maior = 0;

for (let i = 0; i < sorte; i++) {
    const nSorteado = gets();
    if(nSorteado > maior){
        maior = nSorteado;
    }
}

print(maior)
