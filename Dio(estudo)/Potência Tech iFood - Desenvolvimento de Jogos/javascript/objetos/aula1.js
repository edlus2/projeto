/*const edgar = {
    nome: 'edgar peixoto',
    idade: 25,
    cabelo : 'branco',

    descrever: function(){
        console.log(`Meu nome e ${this.nome} e inha indade e ${this.idade}` )
    }
};

delete edgar.cabelo;
edgar.altura = 1.75


console.log('--------- Pega o texto Todo.---------')
console.log('')
console.log(edgar);
console.log('')

console.log('--------- Separado ----------' )
console.log(edgar.nome);
console.log(edgar.idade);
console.log(edgar.altura);
console.log('')

console.log('--------- Funcao ----------')
edgar.descrever();
*/

const edgar = {
    nome: 'edgar peixoto',
    idade: 25,
};

const atributo = 'idade';

console.log(edgar['nome']);

edgar['nome'] = 'teste'
edgar.nome = 'teste'