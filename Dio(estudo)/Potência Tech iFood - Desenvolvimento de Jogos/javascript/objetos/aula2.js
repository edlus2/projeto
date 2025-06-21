/*
const edgar = {
    nome: 'edgar peixoto',
    idade: 25,

    descreva: function(){
        console.log(`Meu nome e ${this.nome} e minha idade e ${this.idade}`)
    }
}

class pessoa {
    nome;
    idade;
    nascimento;

    constructor (nome, idade){
        this.nome = 'teste';
        this.idade = 20;
        this.nascimento = 2023 - idade;
    }

    descreve() {
        console.log(`Meu nome e ${this.nome} e minha idade e ${this.idade}`)
    }
}

const teste = new pessoa();
const edgar = new pessoa('edgar',27);


console.log(edgar);

edgar.descreve();
*/

class Pessoa{
    nome;
    idade;
}

function comparar(p1,p2){
    if (p1.idade > p2.idade){
        console.log(`${p1.nome} é mais velho(a) que ${p2.nome}`)
    }else if(p2.idade > p1.idade){
        console.log(`${p2.nome} é mais velho(a) que ${p1.nome}`)
    }else(
        console.log(`${p2.nome} é ${p1.nome} tem a mesma idade.`)
    )
}

const edgar = new Pessoa();
edgar.nome = 'edgar';
edgar.idade = 27;

const ludimila = new Pessoa();
ludimila.nome = 'ludimila';
ludimila.idade = 25;

comparar(edgar,ludimila);