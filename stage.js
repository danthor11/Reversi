import { PlayerPC } from "./player-pc.js";
import { Reversi } from "./reversi.js";



export const Stage = function(){
    this.$stage= document.getElementById("stage")
    this.newGame()
}

Stage.prototype.newGame = function(){
    this.reversi = new Reversi()
    this.player=1
    this.createHTML()
    this.render()
    this.addEventListeners()
    this.endGame=false
    this.pass=0
}



Stage.prototype.createHTML= function(){
    let html=""

    for (let index = 0; index < 8; index++) {
        html+="<tr>"
        for (let j = 0; j < 8; j++) {
            html+=`<td id='${index}-${j}'></td>`
        }
        html+=`</tr>`
        
    }
    this.$stage.innerHTML=html

}

Stage.prototype.render = function (){
    this.reversi.findPlays(this.player)
    const playes = this.reversi.playes.flat(),
        score = this.reversi.countToken()
    for (let i = 0;i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const $cell = document.getElementById(`${i}-${j}`)
            //Posible Jugada
            if(playes.find(el => el.row===i && el.column===j )){
                $cell.innerHTML= `
                    <img src='./assets/circulo.png' alt='circulo'/>
                ` 
            }//Ficha vacia
            else {
                $cell.innerHTML=null
            } // Ficha del Jugador 1
            if(this.reversi.board[i][j].player===1){
                $cell.innerHTML=`
                    <img src='./assets/circulo.png' alt='circulo'/>
                `
                $cell.classList.add("player-1")
                $cell.classList.remove("player-2")
                $cell.classList.remove("playes")
            } //Ficha del jugador 2
            else if(this.reversi.board[i][j].player===-1){
                $cell.innerHTML=`
                    <img src='./assets/circulo.png' alt='circulo'/>
                `
                $cell.classList.add("player-2")
                $cell.classList.remove("player-1")
                $cell.classList.remove("playes")
            }
                           
            
            
        }       
    }
    // Turno del Jugador
    document.getElementById("name-player").textContent=`
        Turno del Jugador: ${this.player===1 ? "1" : "2"} 
    ` 
    //Puntuacion
    document.getElementById("score").innerHTML = `
        
            <div class="player-1">
                <img src='./assets/circulo.png' alt='circulo' />
                <figcaption>${score.player1}</figcaption>
            </div>
            <div class="player-2">
                <img src='./assets/circulo.png' alt='circulo' />
                <figcaption>${score.player2}</figcaption>
            </div>
      
    `
    
    //Verificacion de celdas disponibles
    if(this.reversi.countCellAvailable()===64){
        this.endGame=true
    }
        


    //Jugador pasa
    console.log(playes.length===0 && !this.endGame)
    if(playes.length===0 && !this.endGame){
        console.log("pasa")

        setTimeout(()=>{
            this.player*=-1
            this.reversi.playes=[]
            this.render()
            this.pass++
        },5000)
       
    }
    
    if(this.endGame){
        alert("El juego termino")
        console.log("endgame")
        this.printEndMessage(score)
    }
    
}

Stage.prototype.addEventListeners = function(){
    for (let i = 0;i < 8; i++) {
        for (let j = 0; j < 8; j++) {
           const $cell = document.getElementById(`${i}-${j}`)
        
           $cell.addEventListener("click",e => {
                const playes = this.reversi.playes.flat()
                if(!this.reversi.board[i][j].isOpen){
                    if(playes.find(el => el.row===i && el.column===j  && this.reversi.playes.flat().length>0)){
                        this.makePlayes(i,j,this.player)     
                    }
                    else{
                        console.log("no es mayor")
                    }
                }
           })
        }
    }
}

Stage.prototype.makePlayes = function(row,column){
    this.reversi.flipToken(Number(row),Number(column),this.player)
    this.player*=-1
    const test = new PlayerPC({
        playes:this.reversi.playes.flat(),
        board: this.reversi.board
    })
    this.reversi.playes=[]
    this.render()
    console.log(this.reversi.countCellAvailable())
 
}

Stage.prototype.printEndMessage = function(score){
    const $message = document.querySelector("#message")

    if(score.player1>score.player2){
        $message.textContent= "El ganador es el Jugador 1"
    }
    else{
        $message.textContent= "El ganador es el Jugador 2"
    }

    setTimeout(()=>{
        $message.textContent= ""
    },3000)

}