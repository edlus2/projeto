function escrevaNome(name){
    return 'Meu nome é ' +name;
}

function verificarIdade(idade){
    if (idade >=18){
        console.log(escrevaNome('edgar') +' sou Maior idade');
        
} else {
    console.log('Menor Idade')
}
}

escrevaNome('edgar');
verificarIdade('27');