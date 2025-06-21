function calculoImc(peso,altura){
    return imc = peso / (altura * altura);

}

function classi(imc){
    if( imc < 18.5){
        return('Abaixo do peso')
    }else if( imc >= 18.5 && imc < 25){
        return('Peso normal')
    }else if( imc < 30){
        return('Pré-obesidade')
    }else if( imc < 40){
        return('Obesidade')
    }else {
        return('Obesidade Grave')
    }
}

function main(){
    var peso = 85;
    var altura = 1.78;

    var imc = calculoImc(peso , altura);
    console.log(calculoImc(peso,altura).toFixed(2));
    console.log(classi(imc));
}

main();