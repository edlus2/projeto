/*const nomes = 'Edgar Da Silva Peixoto';

console.log(nomes.length);

for (let i = 0; i < nomes.length; i++) {
    console.log(nomes[i]);   
}
------ parte 2 ------

const nome = 'Edgar';

for (let i = 0; i < nome.length; i++) {
    const letra = nome[i];
    console.log(letra)
}*/

const notas = [];

notas.push(10);
notas.push(10);
notas.push(10);

let soma = 0;

for (let i = 0; i < notas.length; i++) {
    const nota = notas[i];

    soma = soma + nota;
}

const media = soma / notas.length;
console.log(media.toFixed(2))