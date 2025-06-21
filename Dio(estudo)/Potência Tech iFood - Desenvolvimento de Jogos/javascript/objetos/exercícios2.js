class Pessoa{
    nome;
    peso;
    altura;

    constructor(nome,peso,altura){
        this.nome = nome;
        this.peso = peso;
        this.altura = altura;
    }

    calculoImc(){
        return this.peso / ( this.altura * this.altura )
    } 

    classificaimc(){
      const imc =  this.calculoImc();

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
} 

const edgar = new Pessoa('edgar',83 ,1.78);
console.log(edgar, 'IMC:',edgar.calculoImc().toFixed(2),edgar.classificaimc());

const joser = new Pessoa('joser',70,1.75);
console.log(joser,'IMC:',joser.calculoImc().toFixed(2),joser.classificaimc());