/*

const numero = new Promise((resolve, reject)  => {
    const n1 = parseInt(Math.random() * 100)
    resolve(n1)
    
}) 


numero
    .then((value) =>{
        console.log(value)
    })
    .catch((erro) =>{
        console.log(erro)
    })
    .finally(() => {
        console.log('finalizado!')
    })

*/

const numero = new Promise((resolve, reject)  => {
    //para demora 1 segundo para responder
    setTimeout(()=>{
        const n1 = parseInt(Math.random() * 100)
        resolve(n1)
    },1000)
}) 
    
console.log('vai filhao')

numero
    .then((value) =>{
        console.log(value)
        return value +10
    })
    .then((value) =>{
        console.log(value)
    })
    .catch((erro) =>{
        console.log(erro)
    })
    .finally(() => {
        console.log('finalizado!')
    })