/*var jogadaPersonagem = 2;

var jogadaMonstro = 2;
function luta(){
     
    if (jogadaPersonagem > jogadaMonstro) {
        return "Você venceu a batalha!";
      } else if( jogadaPersonagem === jogadaMonstro){
        return "Foi um empate!";
      } else {
        return "Você perdeu a batalha!"
      }
    
    }
    
var resultado = luta();
console.log(resultado);

----------------------------------------------------------------------------
const tipoMagia = 'defesa';

// Solicita ao usuário a quantidade de vezes que a magia será usada
const quantidade = 3;

// Obtem a mensagem correspondente ao tipo de magia
const mensagem = obterMensagem(tipoMagia);


//TODO: Crie uma função ou outra estrutura condicional para retornar a mensagem correspondente ao tipo de magia:
function  obterMensagem(){

// Criamos um objeto 'mensagens' para mapear os tipos de magia para mensagens correspondentes.
  const mensagens = {
    ataque: "Usou magia de ataque!",
    cura: "Usou magia de cura!",
    defesa: "Usou magia de defesa!",
    invalido: "Tipo de magia inválido!"
  };
// Aqui fica o retorno da função com a mensagem associada ao tipo de magia fornecido:
  return mensagens[tipoMagia] || mensagens.invalido;
}
// É impresso a mensagem a quantidade de vezes especificada:
for (let i = 0; i < quantidade; i++) {
console.log(mensagem);
}
----------------------------------------------------------------------------


const nomePersonagem = 'jubileo';

// Solicita ao usuário que escolha entre "Atacar" ou "Fugir":
const acaoEscolhida = 'Fugir';

// TODO: Implemente uma solução utilizando lógica de programação;
//TODO: Verifique a ação escolhida e exibir a mensagem correspondente:if (acaoEscolhida == "Fugir" || acaoEscolhida == "Atacar") {
    
if (acaoEscolhida == "Fugir" || acaoEscolhida == "Atacar") {
    console.log(`${nomePersonagem} escolheu ${acaoEscolhida}!`)
} else {
    console.log("Tente novamente")
}
    
----------------------------------------------------------------------------


function combinacao(palavra){
    var palavrares = palavra + 'saur';
    return palavrares;
}

var nome = 'it';

var palavrain = combinacao(nome);

console.log(palavrain);

----------------------------------------------------------------------------
*/
class ItemMagico {
constructor( tipo ,dano , resistencia ) {
    this.tipo = tipo;
    this.dano = dano;
    this.resistencia = resistencia;

  }

  calcularDano() {
    return this.tipo === 'arma' ? this.dano * 2 : this.dano;
  }
}

const tipoItem = 'espada';
const danoItem = 200;
const resistenciaItem = 300;

const itemPersonalizado = new ItemMagico(tipoItem , danoItem , resistenciaItem)

console.log("Tipo: " + tipoItem );
console.log("Dano: " + danoItem );
console.log("Resistencia: " + itemPersonalizado.resistencia);

const danoTotal = itemPersonalizado.calcularDano();
console.log("Dano em combate: " + danoTotal);