/*
Tabela IMC - Interpretação
Tabela IMC - Classificação para adultos acima de 20 anos.

Menor que 18.5 - Abaixo do peso ;
Entre 18.5 e 25 - Peso normal ;
Entre 25 e 30 - Pré-obesidade ;
Entre 30 e 40 - Obesidade;
Acima de 40 - Obesidade Grave;
 */

var peso = 79;
var altura = 1.78;

var imc = peso / (altura * altura);

// var imc = peso / Math.pow(altura, 2); Math.pow(algo, quantas vez multiplicar)
console.log(imc.toFixed(2))
if( imc < 18.5){
    console.log('Abaixo do peso')
}else if( imc >= 18.5 && imc < 25){
    console.log('Peso normal')
}else if( imc < 30){
    console.log('Pré-obesidade')
}else if( imc < 40){
    console.log('Obesidade')
}else {
    console.log('Obesidade Grave')
}