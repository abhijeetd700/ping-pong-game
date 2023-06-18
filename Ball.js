const INITIAL_VELOCITY = 0.05
const VELOCITY_INC = 0.001

export default class Ball{

    constructor(ballElem){
        this.ballElem = ballElem
        this.reset()
    }

    get x(){
       return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
            
    }
    set x(value){
        this.ballElem.style.setProperty("--x",value)
    }
    get y(){
       return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
            
    }
    set y(value){
        this.ballElem.style.setProperty("--y",value)
    }
    reset(){
        this.x = 50
        this.y = 50
        this.direction = {x:0}

        while( Math.abs(this.direction.x) <= 0.1  ||
        Math.abs(this.direction.x) >= 0.9){
            const heading = this.randomNumberBetween(0,2*Math.PI)
            this.direction = {x:Math.cos(heading),y:Math.sin(heading)}
        }
        this.velocity = INITIAL_VELOCITY
    }

    rect(){
        return this.ballElem.getBoundingClientRect()
    }

    update(delta,paddlesRect){

        if(isNaN(delta)){
            delta = 0;
        }

        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += INITIAL_VELOCITY * VELOCITY_INC
        
        const rect = this.rect()

        if(rect.bottom >= window.innerHeight || rect.top <=0 ){
            this.direction.y *= -1; 
        }

        if( paddlesRect.some((r)=>this.isCollison(r,rect)) ){
            this.direction.x *= -1;
        }
        
        
    }

    randomNumberBetween(min,max) {
        return Math.random() * (max-min)+min
    }

    isCollison(paddleRect,ballRect){

        return(paddleRect.right>=ballRect.left &&
        paddleRect.left<= ballRect.right &&
        paddleRect.top<=ballRect.bottom &&
        paddleRect.bottom>=ballRect.top)
    }

}