/*
    ! -> operador de negaçao
    ex: console.log(!'')
    -------------------------------------------
    boolean (true , false)
    -------------------------------------------
    null -> ausencia de valor.
    undefined -> ausencia de declaraçao.

    const x = {nome : null};
    console.log(x.nome)
    console.log(x.idade)

    Resultado:
    null
    undefined
    -------------------------------------------
    number
    +infinity -infinity e NaN
    Double Precision 64-bit binary format IEEE 754

    -------------------------------------------
    string

    forma de declaraçao : ("texto"),('texto'),(`texto`).

    -------------------------------------------
    Symbol
    const x = Symbol('10')
    const y = Symbol('10')
    console.log(x === y)

    false
    
    const x = Symbol('10')
    const y = x;
    console.log(x === y)

    true

    Symbol -> e unico e nao pode ser repido .
    -------------------------------------------
*/

/*object

const x = {
    nome : "edgar",
    idade : 27,
    "altura": 1.78,
}

x['nome'] = 'carro'; // troca nome de algo ja escrito.

x.sobrenome = 'Peixoto';

console.log(x)
console.log(x.nome)//forma de chama algo especifico
console.log(x['nome'])//forma de chama algo especifico

*/