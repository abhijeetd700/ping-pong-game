import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById('ball'))

const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const computerPaddle = new Paddle(document.getElementById('computer-paddle'))

const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score')

let lastTime;

function update(time){

    if(lastTime !== null){
        let delta = time - lastTime

        if(isNaN(delta)){
            delta = 0;
        }

        ball.update(delta,[playerPaddle.rect(),computerPaddle.rect()])
        computerPaddle.update(delta,ball.y)
        
        let hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--h'))
        document.documentElement.style.setProperty("--h",hue+(delta*0.01))
        
        if(isLose()){
            handleLose()
        }
    }
    lastTime = time
    window.requestAnimationFrame(update)
}

function isLose(){

    let rect = ball.rect()
    
    return rect.left <=0 || rect.right >= window.innerWidth
    
}

function handleLose(){

    let rect = ball.rect()

    if(rect.right >= window.innerWidth){
        playerScore.innerText = parseInt(playerScore.innerText)+1;
    }
    else{
        computerScore.innerText = parseInt(computerScore.innerText)+1;
    }
    ball.reset()
    computerPaddle.reset()
}
document.addEventListener('mousemove',(e)=>{
    playerPaddle.position = ( e.y / window.innerHeight)*100;
})

window.requestAnimationFrame(update)