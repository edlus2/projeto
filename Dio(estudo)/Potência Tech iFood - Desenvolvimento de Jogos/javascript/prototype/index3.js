/*    
const fs = require('fs')

    const path = require('path')

    const pasta = path.resolve(__dirname , 'tarefas.csv')

    const leitura = fs.promises.readFile(pasta)

    leitura
        .then((arquivo) => arquivo.toString('utf8'))
        .then((texto) => texto.split('\n').slice(1))
        .then((linha) => linha.map((linha) => {
            const [nome , feito] = linha.split(';')
            return{
                nome,
                feito: feito.trim() === 'true'
            }
        }))

        .then((lista) => console.log(lista))
        .catch((erro) => console.log('Deu ruim',erro))

*/

const fs = require('fs')
const path = require('path')
    
const pasta = path.resolve(__dirname , 'tarefas.csv')

async function busca() {
    try{
        const arquivo = await fs.promises.readFile(pasta)
        const texto = arquivo.toString('utf8')
        console.log(texto)
    } catch (erro) {
        console.log(erro)
    } finally {
        console.log('finalizado')
    }
}

busca()
    