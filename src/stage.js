import { PlayerPC } from "./player-pc.js";
import { Reversi } from "./reversi.js";

/**
 * 
 * @param {boolean} mood mood of game that want to play 
 */

export const Stage = function(mood){
    this.$stage= document.getElementById("stage")
    this.newGame(mood)
}

/**
 * 
 * @param {boolean} mood mood of game that want to play 
 */
Stage.prototype.newGame = function(mood){
    this.reversi = new Reversi()
    this.player=1
    this.multiplayer=mood
    this.endGame=false
    this.pass=0
    this.lastPlayes=null
    this.createHTML()
    this.render()
    this.addEventListeners()
}



Stage.prototype.createHTML= function(){
    let html=""

    for (let index = 0; index < 8; index++) {
        html+="<tr>"
        for (let j = 0; j < 8; j++) {
            html+=`
                <td class='cell' id='cell-${index}-${j}'>
                    <div class='circle'>
                        <div class="last-playes"></div>
                    </div>
                </td>`
        }
        html+=`</tr>`
        
    }
    this.$stage.innerHTML=html

}


Stage.prototype.render = function (){
   
    const playes = this.reversi.findPlays(this.player),
        score = this.reversi.countToken();
        
    for (let i = 0;i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const $cell = document.querySelector(`#cell-${i}-${j} .circle`)
            //Posible Jugada
            if(playes.find(el => el.row===i && el.column===j )){
                $cell.classList.add("active")
            }//Ficha vacia
            else {
                $cell.classList.remove("active")
            } // Ficha del Jugador 1
            if(this.reversi.board[i][j].player===1){
                $cell.classList.add("active")
                $cell.classList.add("player-1")
                $cell.classList.remove("player-2")
                
            } //Ficha del jugador 2
            else if(this.reversi.board[i][j].player===-1){
                $cell.classList.add("active")
                $cell.classList.add("player-2")
                $cell.classList.remove("player-1")
                
            }
                           
            
            
        }       
    }

    if(this.lastPlayes){
        const {row,column} = this.lastPlayes
        document.querySelector(`#cell-${row}-${column} .circle .last-playes`).classList.add("active")   
    }
        
    // Turno del Jugador
    document.getElementById("name-player").textContent=`
        Turno del Jugador: ${this.player===1 ? "1" : "2"} 
    `  
    document.getElementById("name-player").classList.add(`player-${this.player===1 ? "1" : "2"}`)
    document.getElementById("name-player").classList.remove(`player-${this.player===1 ? "2" : "1"}`)

    //Puntuacion
    document.querySelectorAll(".score-container figcaption")[0].textContent=score.player1
    document.querySelectorAll(".score-container figcaption")[1].textContent=score.player2
        
    if(!this.multiplayer && !this.endGame){
        
        if(this.player===-1 && playes.length>0){
            const test = new PlayerPC({
                playes,
                board: this.reversi.board
            })
        
            setTimeout(() =>
                this.makePlayes(test.row,test.column)   
            ,Math.floor(Math.random()*8000-5000)+5000);
        }
        
    }
    
    //Verificacion de celdas disponibles
    if(this.reversi.countCellAvailable()===64){
        this.endGame=true
    }
        

    
    //Jugador pasa
    if(playes.length===0 && !this.endGame){
        this.passPlayes()
        
    }
    
    if(this.endGame){
        if(score.player1>score.player2){
            this.printMessage("El ganador es el jugador 1")
        }
        else if(score.player1<score.player2){
            this.printMessage("El ganador es el jugador 2")
        }
        else{
            this.printMessage("No hay ganador, es empate")
        }
    }
    
    console.log(64-this.reversi.countCellAvailable())
}

/**
 * 
 * @param {*} mood 
 */

Stage.prototype.addEventListeners = function(){
    for (let i = 0;i < 8; i++) {
        for (let j = 0; j < 8; j++) {
           const $cell = document.getElementById(`cell-${i}-${j}`)
           $cell.addEventListener("click",e => {
                const playes = this.reversi.playes.flat()
                if(!this.reversi.board[i][j].isOpen){
                    if(playes.find(el => el.row===i && el.column===j)){
                        // Modo multijugador
                        if(this.multiplayer){
                            this.makePlayes(i,j)     
                        }   //Modo vs PC
                        else {
                            if(this.player===1){        
                                this.makePlayes(i,j) 
                            }
                            
                        }
                    }
                }
           })
        }
    }
}

/**
 * 
 * @param {Number} row position x in array
 * @param {Number} column position y in array 
 */

Stage.prototype.makePlayes = function(row,column){
    if(this.lastPlayes){
        document.querySelector(`#cell-${this.lastPlayes.row}-${this.lastPlayes.column} 
            .circle .last-playes`).classList.remove("active")
    }
    this.reversi.flipToken(Number(row),Number(column),this.player)
    this.player*=-1
    this.reversi.playes=[]
    this.pass=0
    this.lastPlayes={
        row,
        column
    }
    this.render()
}

/**
 * 
 * @param {*} mood 
 */

Stage.prototype.passPlayes = function(){
    
    this.printMessage(`El jugador ${this.player===1 ? "1" : "2"} pasa`)

    this.player*=-1;
    this.reversi.playes=[];
    this.pass++;

    if(this.pass===2){
        this.printMessage(`No existen mas jugadas.`)
        this.endGame = true
    }
    else
        this.render()
    
    
}

/**
 * 
 * @param {String} message the message that wants show in the DOM
 */
Stage.prototype.printMessage = function(message){
    const $message = document.querySelector(".message-container"),
        $text = document.querySelector("#message span")

    $message.classList.add("active")
    $message.style.zIndex="100"
    $text.textContent=message

    setTimeout(()=>{
        $message.classList.remove("active")
        $message.style.zIndex="-100"
    },3000)
}