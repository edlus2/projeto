
const state = {
    view : {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId  : null,
        countDownTimerId: setInterval(countDown, 1000),
        tempo : 1000,
        hit : 0,
        result : 0,
        correntTime:60,
        
    }
};

function countDown() {
    state.values.correntTime--;
    state.view.timeleft.textContent = state.values.correntTime;

    if(state.values.correntTime <= 0){
        alert("Game Over! O seu tempo Acabou" + state.values.result)
    }
}


function radomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomsquare = state.view.squares[randomNumber];
    randomsquare.classList.add("enemy")
    state.values.hit = randomsquare.id;

}

function moveEnemy(){
    state.values.timerId = setInterval(radomSquare, state.values.tempo)
}

function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown" , () =>{
            if(square.id === state.values.hit){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hit = null
            }
    });
    });
}

function init(){
    moveEnemy();
    addListenerHitBox();
}

init();