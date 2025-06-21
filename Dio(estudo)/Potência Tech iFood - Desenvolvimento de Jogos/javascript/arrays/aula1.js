/*

.push(); adiciona uma nova na ultima posição
.pop(); remove a ultima
.length(); ver quantos tem adicionada
.slice(); remove a primeira


const alunos = ['edgar','ludi','edlu'];

alunos.push('lued');

alunos[4] = 'ed';

alunos.push(10);

console.log(alunos);*/

const notas = [];

notas.push(5);
notas.push(7);
notas.push(8);
notas.push(2);
notas.push(5);
notas.push(8);

const soma = notas[0] + notas[1] + notas[2] + notas[3] + notas[4] + notas[5];

console.log(soma / notas.length);