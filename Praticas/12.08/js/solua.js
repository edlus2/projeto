let pag = document.getElementById('todo')
let dia = document.getElementById('sol')
let noite = document.getElementById('lua')
let fsol = document.getElementsByClassName('sol')[0]
let flua = document.getElementsByClassName('lua')[0]
let tdia = document.getElementsByClassName('tbdia')[0]
let tnoite = document.getElementsByClassName('tbnoite')[0]

    function sol() {
        pag.style.transition = '2s'
        pag.style.backgroundColor = 'white'
        pag.style.color = 'black'
        noite.style.display = 'block'
        dia.style.display = 'none'
        fsol.style.display = 'block'
        flua.style.display = 'none'
        tdia.style.display = 'block'
        tnoite.style.display = 'none'
    }

    function lua() {
        pag.style.transition = '2s'
        pag.style.backgroundColor = 'black'
        pag.style.color = 'white'
        noite.style.display = 'none'
        dia.style.display = 'block'
        flua.style.display = 'none'
        fsol.style.display = 'none'
        flua.style.display = 'block'
        tdia.style.display = 'none'
        tnoite.style.display = 'block'
    }