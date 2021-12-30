export const  Reversi = function(){
   // this.newGame()
    this.board = this.createArray()
    this.initializeArray()
    this.playes= []
}


Reversi.prototype.createArray = function(){
    let x = new Array(8);

    for (let i = 0; i < 8; i++) {
        x[i] = new Array(8);
    }
    return x;
    
}

Reversi.prototype.initializeArray = function(){
    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) { 
            if(i===3 && j===3 || i===4 && j===4)
                this.board[i][j]= {
                    isOpen:true,
                    player:-1
                }
            else if(i===4 && j===3 || i===3 && j===4)
                this.board[i][j]=  {
                    isOpen:true,
                    player:1
                }
            else
                this.board[i][j]={
                    isOpen: false,
                    player: 0,
                    canPlay:false
                }
        }
           
    }


}

Reversi.prototype.flipToken = function(row,column,player){
    let band=true,
        k=0,
        mustFlip=false,
        rowUp=true,
        rowDown=true,
        columnRight=true,
        columnLeft=true;

    const board = this.board

    if(row===7)
        rowDown=false
    else if(row===0)
        rowUp=false
    if(column===7)
        columnRight=false
    else if(column===0)
        columnLeft=false

    if(rowUp){
        // ?                    ARRIBA
        //Verificar si celdas adyacentes son del jugador contrario
        if(board[row-1][column].player===player*-1){  
            //Recorrer en linea buscando la ficha del jugador
            for (let i = row-1; i >= 0 &&band ; i--) {
                if(i<0)
                    band=false
                
                if(band){
                    //Acumular cantida de fichas por voltear   
                    if(board[i][column].player===player*-1)
                        k++
                    else if(board[i][column].player===player){
                        mustFlip=true
                        band=false
                    }
                    

                    if(!board[i][column].isOpen)
                        band=false
                }
                
                
            }
            
            if(mustFlip){
                for (let i = 0; i <= k; i++) {
                    this.board[row-i][column]={
                        isOpen: true,
                        player: player
                    }
                    console.log(row-i,column)
                }
            }
            k=0;
            band=true
            mustFlip=false
        }
    }
    

    if(rowDown){
        // ?                    ABAJO
        if(board[row+1][column].player===player*-1){
            for (let i = row+1; i < 8 && band; i++) {
                if(i>7)
                    band=false

                if(band){
                    if(board[i][column].player===player*-1)
                        k++
                    
                    else if(board[i][column].player===player){
                        band=false
                        mustFlip=true
                    }
                    
                    if(!board[i][column].isOpen)
                        band=false 
                }
            }
            
            if(mustFlip)

                for (let i = 0; i <= k; i++) {
                    this.board[row+i][column]={
                        isOpen:true,
                        player:player
                    }
                    
                }
            k=0;
            band=true
            mustFlip=false
        }
    }

    
        
    if(columnLeft){
        // ?                    IZQUIERDA
        if(board[row][column-1].player===player*-1){
            for (let i = column-1; i >= 0 && band; i--) {
                if(i<0)
                    band=false

                if(band){
                    if(board[row][i].player===player*-1)
                        k++

                    else if(board[row][i].player===player){
                        band=false
                        mustFlip=true
                    }

                    if(!board[row][i].isOpen)
                        band=false
                }
            }

            if(mustFlip)
                for (let i =0 ; i <= k; i++) {
                    this.board[row][column-i]={
                        isOpen:true,
                        player:player
                    }
                    
                }
            
            k=0;
            band=true
            mustFlip=false

        }
    }
    

    if(columnRight){
        //?                 DERECHA
        console.log(row,column,columnRight)
        if(board[row][column+1].player===player*-1){

            for (let i = column+1; i < 8 && band; i++) {
                if(i>7)
                    band=false
                if(band){
                    if(board[row][i].player===player*-1)
                        k++
                        
                    else if(board[row][i].player===player){
                        band=false
                        mustFlip=true
                    }

                    if(!board[row][i].isOpen)
                        band=false
                }
                
            }
            

            if(mustFlip)
                for (let i = 0; i <= k; i++) {
                    this.board[row][column+i]={
                        isOpen:true,
                        player:player
                    }
                    
                }

            k=0;
            band=true
            mustFlip=false
        }
    }

    
    if(rowUp && columnLeft){
        // !            DIAGONAL
    
        //?             ESQUINA SUPERIOR IZQUIERDA 
        if(board[row-1][column-1].isOpen){
            if(board[row-1][column-1].player===player*-1){
                for (let i = 1; i < 7 && band; i++){
                    if(row-i<0 || column-i <0)
                        band=false
                    if(band){
                        if(board[row-i][column-i].player===player*-1)
                            k++
                        if(board[row-i][column-i].player===player){
                            band=false
                            mustFlip=true
                        }
                        if(!board[row-i][column-i].isOpen)
                          band=false
                    }
                   
                    
                }
        
                if(mustFlip)
                    for (let i = 0; i <= k; i++) {
                        this.board[row-i][column-i]={
                            isOpen:true,
                            player
                        }
                        
                    }
        
                k=0;
                band=true
                mustFlip=false
            }
        }
    
    }

    

    if(rowUp && columnRight){
        // ?               ESQUINA SUPERIOR DERECHA
        if(board[row-1][column+1].isOpen){
            if(board[row-1][column+1].player===player*-1 ){
                for (let i = 1; i < 7 && band; i++) {   
                    if(row-i<0 || column+i>7)  
                        band=false

                    if(band){
                        if(board[row-i][column+i].player===player*-1)
                            k++
                        else if(board[row-i][column+i].player===player){
                            band=false
                            mustFlip=true
                        }

                        if(!board[row-i][column+i].isOpen)
                            band=false
                    }
                    

                }
        
                if(mustFlip)
                    for (let i = 0; i <= k; i++) {
                        this.board[row-i][column+i]={
                            isOpen:true,
                            player
                        }  
                    }
                k=0;
                band=true
                mustFlip=false
            }
        }
    }
    
    
    if(rowDown && columnLeft){
        //?                 ESQUINA INFERIOR IZQUIERDA
        if(board[row+1][column-1].isOpen){
            if(board[row+1][column-1].player===player*-1){
                for (let i = 1; i < 7 && band; i++) {   
                    
                    if(row+i>7 || column-i<0)
                        band=false

                    if(band){
                        if(board[row+i][column-i].player===player*-1)
                            k++
                        if(board[row+i][column-i].player===player){
                            band=false
                            mustFlip=true
                        }
    
                        if(!board[row+i][column-i].isOpen)
                            band=false
                    }
                   

                }

                if(mustFlip)
                    for (let i = 0; i <= k; i++) {
                        this.board[row+i][column-i]={
                            isOpen:true,
                            player
                        }  
                    }


                k=0;
                band=true
                mustFlip=false
            }    
        }

    }
    
    if(rowDown && columnRight){
        //?                 ESQUINA INFERIOR DERECHA
        if(board[row+1][column+1].isOpen){
            if(board[row+1][column+1].player===player*-1 ){
                for (let i = 1; i < 7 && band; i++) {   
                    if(row+i>7 || column+i>7)
                        band=false
                    
                    if(band){
                        if(board[row+i][column+i].player===player*-1)
                            k++
                        if(board[row+i][column+i].player===player){
                            band=false
                            mustFlip=true
                        }
    
                        if(!board[row+i][column+i].isOpen)
                            band=false
                    }
                }
                if(mustFlip)
                    for (let i = 0; i <= k; i++) {
                        this.board[row+i][column+i]={
                            isOpen:true,
                            player
                        }  
                    }
            }
        }
    }
    
    
}


Reversi.prototype.findPlays = function(player){
   
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            //Busqueda de fichas del jugador
            if(player===this.board[i][j].player){
                //busqueda de posibles jugadas
                this.playes.push(this.canPlay(i,j,player))
            }
        }
        
    }

}


Reversi.prototype.canPlay = function(row, column,player){

    let band=true,
        k=1,
        mustFlip=false,
        rowUp=true,
        rowDown=true,
        columnRight=true,
        columnLeft=true,
        playes=[];

    const board = this.board

    if(row===7)
        rowDown=false
    else if(row===0)
        rowUp=false

    if(column===7)
        columnRight=false
    else if(column===0)
        columnLeft=false

    // ?                    ARRIBA
    //Verificar si celdas adyacentes son del jugador contrario
    if(rowUp){
        if(board[row-1][column].player===player*-1){  
            //Recorrer en linea buscando la ficha del jugador
            for (let i = row-1; i >= 0 &&band ; i--) {
                if(i<0)
                    band=false
                if(band){
                    if(board[i][column].player===player*-1)
                        k++
                    if(!board[i][column].isOpen){
                        mustFlip=true
                        band=false
                    }
                }       
            }

            if(mustFlip){
                playes.push({
                    row: row-k,
                    column
                })
            }
            band=true
            mustFlip=false
            k=1
        }
    }
    

    
    if(rowDown){
        // ?                    ABAJO
        if(board[row+1][column].player===player*-1){
            for (let i = row+1; i < 8 && band; i++) {
                if(i>7)
                    band=false

                if(band){
                    if(board[i][column].player===player*-1)
                        k++
                    if(!board[i][column].isOpen){
                        band=false
                        mustFlip=true
                    }
                }
            }

            if(mustFlip){
                playes.push({
                    row: row+k,
                    column
                })
            }
            band=true
            mustFlip=false
            k=1
        }
    }
    
        
    if(columnLeft){
        // ?                    IZQUIERDA
        if(board[row][column-1].player===player*-1 ){
            for (let i = column-1; i >= 0 && band; i--) {
                if(i<0)
                    band=false
                if(band){
                    if(board[row][i].player===player*-1)
                        k++
                    if(!board[row][i].isOpen){
                        band=false
                        mustFlip=true
                    }
                }
                
            }

            if(mustFlip){
                playes.push({
                    row,
                    column:column-k
                })
            }
            band=true
            mustFlip=false
            k=1
        }
    }    
    

    if(columnRight){
        //?                 DERECHA
        if(board[row][column+1].player===player*-1){
            for (let i = column+1; i < 8 && band; i++) {
                if(i>7)
                    band=false
                if(band){
                    if(board[row][i].player===player*-1)
                        k++
                    if(!board[row][i].isOpen){
                        band=false
                        mustFlip=true
                    }
                } 
            }
            if(mustFlip){
                playes.push({
                    row,
                    column:column+k
                })
            }
            band=true
            mustFlip=false
            k=1
        }
    }
    


    // !            DIAGONAL
    
    //?             ESQUINA SUPERIOR IZQUIERDA 
    if(rowUp && columnLeft){
        if(board[row-1][column-1].isOpen){
            if(board[row-1][column-1].player===player*-1){
                for (let i = 1; i < 7 && band; i++){
                    if(row-i<0 || column-i<0)
                        band=false

                    if(band){
                        if(board[row-i][column-i].player===player*-1)
                            k++
                        if(!board[row-i][column-i].isOpen){
                            band=false
                            mustFlip=true
                        }
                    }
                    
                }
                if(mustFlip){
                    playes.push({
                        row: row-k,
                        column: column-k
                    })
                }
                band=true
                mustFlip=false
                k=1
            }
        }
    }
   
    

    if(rowUp && columnRight){
        // ?               ESQUINA SUPERIOR DERECHA
        if(board[row-1][column+1].isOpen){
            if(board[row-1][column+1].player===player*-1){
                for (let i = 1; i < 7 && band; i++) {   
                    if(row-i<0 || column+i>7)
                        band=false
                    if(band){
                        if(board[row-i][column+i].player===player*-1)
                            k++
                        if(!board[row-i][column+i].isOpen){
                            band=false
                            mustFlip=true
                        }
                    }
                    
                }
            
                if(mustFlip){
                    playes.push({
                        row: row-k,
                        column:column+k
                    })
                }
                band=true
                mustFlip=false
                k=1
            }
        }
    }
    
    

    //?                 ESQUINA INFERIOR IZQUIERDA
    if(rowDown && columnLeft){
        if(board[row+1][column-1].isOpen){
            if(board[row+1][column-1].player===player*-1){
                for (let i = 1; i < 7 && band; i++) {      
                    if(row+i>7 || column-i<0)
                        band=false

                    if(band){
                        if(board[row+i][column-i].player===player*-1)
                            k++
                        if(!board[row+i][column-i].isOpen){
                            band=false
                            mustFlip=true
                        }
                    }
                    
                }
        
                if(mustFlip){
                    playes.push({
                        row: row+k,
                        column:column-k
                    })
                }
                band=true
                mustFlip=false
                k=1
            }    
        }
    }
    
    
    //?                 ESQUINA INFERIOR DERECHA
    if(rowDown && columnRight){
        if(board[row+1][column+1].isOpen){
            if(board[row+1][column+1].player===player*-1){
                for (let i = 1; i < 7 && band; i++) {   

                    if(row+i>7 || column+i>7)
                        band=false

                    if(band){
                        if(board[row+i][column+i].player===player*-1)
                            k++
                        if(!board[row+i][column+i].isOpen){
                            band=false
                            mustFlip=true
                        }
                    }
                    
                }
        
                if(mustFlip){
                    playes.push({
                        row: row+k,
                        column:column+k
                    })
                }
              
            }
        }
    }
    
    

    return playes
}



Reversi.prototype.countToken = function(){
    let player1=0,
        player2=0;
    this.board.forEach(row=>{
        row.forEach(cell =>{
            if(cell.player===1)
                player1++
            else if(cell.player===-1)
                player2++
        })
    })

    return{
        player1,
        player2
    }
}

Reversi.prototype.countCellAvailable = function(){
    let cellOpened=0;
    this.board.forEach(row=>{
        row.forEach(cell =>{
            if(cell.isOpen)
                cellOpened++
        })
    })
    return cellOpened;
}