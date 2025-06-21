/*
const logos = {
    jogo : 'resident',
    sexo : 'masculino',

}

const pessoa = {
    nome : 'edgar',
    idade : 27,
    __proto__ : logos, --> chama algo de outro lugar
}

console.log(logos)

 -----------------------------------------------------------------

mesma coisa que o de baixo

class Jogo{
    constructor (modelo , ano){
        this.modelo = modelo
        this.ano = ano
    }
    arma (){
        console.log(`Meu jogo é :${this.modelo}`)
    }
}

 -----------------------------------------------------------------

 mesmo de cima de forma diferente

function Jogo(modelo , ano){
    this.modelo = modelo
    this.ano = ano
}

Jogo.prototype.arma = function () {
    console.log(`Meu jogo é :${this.modelo}`)
}

const resident = new Jogo('R4',1990)

console.log(resident)

 resident.arma();
 
 -----------------------------------------------------------------

const criado = {
    ano : 1996,
}

const jogo = {
    jogos : 'resident evil',
    ano: 1990,
    __proto__ : criado
}

console.log(jogo.ano)
 -----------------------------------------------------------------

const criado = {
    jogo : 'resident evil',
    com : 'capcom',
    ano : 1996,
}

const jogo = Object.create(criado)
    
console.log(jogo.jogo)
 -----------------------------------------------------------------

function Jogo (nome , ano){
    this.nome = nome;
    this.ano = ano;
}
console.log(new Jogo('Resident Evil 4',1990))


Jogo.prototype.criado = function(){
    console.log(`Meu jogo e : ${this.nome}`)
}
const j1 = new Jogo('Resident Evil 4',1990)
j1.criado();

const n1 = {};

Jogo.call(n1,'teken',2001);

console.log(n1)

-----------------------------------------------------------------


String.prototype.t = function() {
    return `P ${this}`
}

console.log('teste'.t())
-----------------------------------------------------------------
*/