// botão on e off
let off = window.document.querySelector('.interruptooff')
let on = window.document.querySelector('.interruptoon')

//led 3 divisorias
let led1 = window.document.querySelector('.est')
let led2 = window.document.querySelector('.esta')
let led3 = window.document.querySelector('.estan')



off.addEventListener('click',function(){
    // botão on e off
    off.style.display = 'none';
    on.style.display = 'block';
    
    //led 3 divisorias
    led1.className = 'est1';  
    led2.className = 'est2';
    led3.className = 'est3';

});

on.addEventListener('click',function(){
    // botão on e off
    off.style.display = 'block';
    on.style.display = 'none';

    //led 3 divisorias
    led1.className = 'estas';
    led2.className = 'estas';
    led3.className = 'estas';
});

//click para informação dos action
let panico = window.document.querySelector('.panico')
let ite = window.document.querySelector('.it')
let moto = window.document.querySelector('.motoserra')
let chapo = window.document.querySelector('.chapolin')
let meedival = window.document.querySelector('.meedival')
let scorpion = window.document.querySelector('.scorpion')
let goku = window.document.querySelector('.goku')
let laika = window.document.querySelector('.laika')
let saitama = window.document.querySelector('.saitama')

function pan(){
    panico.className = 'informacao';
}
function it(){
    ite.className = 'informacao';
}
function mot(){
   moto.className = 'informacao';
}
function chapol(){
    chapo.className = 'informacao';
 }
 function medi(){
    meedival.className = 'informacao';
 }
 function scorp(){
    scorpion.className = 'informacao';
 }
 function gok(){
    goku.className = 'informacao';
 }
 function lai(){
    laika.className = 'informacao';
 }
 function sai(){
    saitama.className = 'informacao';
 }
function volta(){
    panico.className = 'panico';
    ite.className = 'it';
    moto.className = 'motoserra';
    chapo.className = 'chapolin';
    meedival.className = 'meedival';
    scorpion.className = 'scorpion';
    goku.className = 'goku';
    laika.className = 'laika';
    saitama.className = 'saitama';
}
