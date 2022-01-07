export const PlayerPC = (function(){
    const Constructor = function(props) {
        this.props = props
        return this.find()
    }
    
    Constructor.prototype.find = function(){
        const {playes,board} = this.props,
            playesPC=[];
            
        playes.forEach(cell => {
            playesPC.push(this.countTokenToFlip(cell.row,cell.column,board))   
        });


        if(playesPC.flat().length>0)
            return this.makeDecision(playesPC.flat())
        
    }
    /**
     * 
     * @param {Number} row position x in array
     * @param {Number} column  position y in array
     * @param {Array} board Array with data game
     * @returns {Array} coordinates of the playerpc's play
     */
    
    Constructor.prototype.countTokenToFlip = function(row,column,board){
        let band=true,
            k=0,
            j=0,
            mustFlip=false,
            rowUp=true,
            rowDown=true,
            columnRight=true,
            columnLeft=true,
            playes=[];

        const playerPC=-1

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
            if(board[row-1][column].player===playerPC*-1){  
                //Recorrer en linea buscando la ficha del jugador
                for (let i = row-1; i >= 0 &&band ; i--) {
                    if(i<0)
                        band=false
                    
                    if(band){
                        //Acumular cantida de fichas por voltear   
                        if(board[i][column].player===playerPC*-1)
                            k++
                        else if(board[i][column].player===playerPC){
                            mustFlip=true
                            band=false
                            j+=k
                        }
                        
                        if(!board[i][column].isOpen)
                            band=false
                    }
                }
                
                if(mustFlip){
                    playes = {
                        row,
                        column,
                        token:j,
                    }
                }

                k=0
                band=true
                mustFlip=false
            }
        }
        
    
        if(rowDown){
            // ?                    ABAJO
            if(board[row+1][column].player===playerPC*-1){
                for (let i = row+1; i < 8 && band; i++) {
                    if(i>7)
                        band=false
    
                    if(band){
                        if(board[i][column].player===playerPC*-1)
                            k++
                        
                        else if(board[i][column].player===playerPC){
                            band=false
                            mustFlip=true
                            j+=k
                        }
                        
                        if(!board[i][column].isOpen)
                            band=false 
                    }
                }
                
                if(mustFlip){
                    playes = {
                        row,
                        column,
                        token:j,
                    }
                }
    
                    
                k=0
                band=true
                mustFlip=false
            }
        }
    
        
            
        if(columnLeft){
            // ?                    IZQUIERDA
            if(board[row][column-1].player===playerPC*-1){
                for (let i = column-1; i >= 0 && band; i--) {
                    if(i<0)
                        band=false
    
                    if(band){
                        if(board[row][i].player===playerPC*-1)
                            k++
    
                        else if(board[row][i].player===playerPC){
                            band=false
                            mustFlip=true
                            j+=k
                        }
    
                        if(!board[row][i].isOpen)
                            band=false
                    }
                }
    
                if(mustFlip){
                    playes = {
                        row,
                        column,
                        token:j,
                    }
                }   
                k=0
                band=true
                mustFlip=false
    
            }
        }
        
    
        if(columnRight){
            //?                 DERECHA
            if(board[row][column+1].player===playerPC*-1){
    
                for (let i = column+1; i < 8 && band; i++) {
                    if(i>7)
                        band=false
                    if(band){
                        if(board[row][i].player===playerPC*-1)
                            k++
                            
                        else if(board[row][i].player===playerPC){
                            band=false
                            mustFlip=true
                            j+=k
                        }
    
                        if(!board[row][i].isOpen)
                            band=false
                    }
                    
                }
                if(mustFlip){
                    playes = {
                        row,
                        column,
                        token:j,
                    }
                }
                k=0
                band=true
                mustFlip=false
            }
        }
    
        
        if(rowUp && columnLeft){
            // !            DIAGONAL
        
            //?             ESQUINA SUPERIOR IZQUIERDA 
            if(board[row-1][column-1].isOpen){
                if(board[row-1][column-1].player===playerPC*-1){
                    for (let i = 1; i < 7 && band; i++){
                        if(row-i<0 || column-i <0)
                            band=false
                        if(band){
                            if(board[row-i][column-i].player===playerPC*-1)
                                k++
                            if(board[row-i][column-i].player===playerPC){
                                band=false
                                mustFlip=true
                                j+=k
                            }
                            if(!board[row-i][column-i].isOpen)
                              band=false
                        }
                       
                        
                    }
            
                    if(mustFlip){
                        playes = {
                            row,
                            column,
                            token:j,
                        }
                    }
                        
            
                    k=0
                    band=true
                    mustFlip=false
                }
            }
        
        }
    
        
    
        if(rowUp && columnRight){
            // ?               ESQUINA SUPERIOR DERECHA
            if(board[row-1][column+1].isOpen){
                if(board[row-1][column+1].player===playerPC*-1 ){
                    for (let i = 1; i < 7 && band; i++) {   
                        if(row-i<0 || column+i>7)  
                            band=false
    
                        if(band){
                            if(board[row-i][column+i].player===playerPC*-1)
                                k++
                            else if(board[row-i][column+i].player===playerPC){
                                band=false
                                mustFlip=true
                                j+=k
                            }
    
                            if(!board[row-i][column+i].isOpen)
                                band=false
                        }      
                    }
                    if(mustFlip){
                        playes = {
                            row,
                            column,
                            token:j,
                        }
                    }
                    k=0
                    band=true
                    mustFlip=false
                }
            }
        }
        
        
        if(rowDown && columnLeft){
            //?                 ESQUINA INFERIOR IZQUIERDA
            if(board[row+1][column-1].isOpen){
                if(board[row+1][column-1].player===playerPC*-1){
                    for (let i = 1; i < 7 && band; i++) {   
                        
                        if(row+i>7 || column-i<0)
                            band=false
    
                        if(band){
                            if(board[row+i][column-i].player===playerPC*-1)
                                k++
                            if(board[row+i][column-i].player===playerPC){
                                band=false
                                mustFlip=true
                                j+=k
                            }
        
                            if(!board[row+i][column-i].isOpen)
                                band=false
                        }
                       
    
                    }
    
                    if(mustFlip){
                        playes = {
                            row,
                            column,
                            token:j,
                        }
                    }
    
    
                    k=0
                    band=true
                    mustFlip=false
                }    
            }
    
        }
        
        if(rowDown && columnRight){
            //?                 ESQUINA INFERIOR DERECHA
            if(board[row+1][column+1].isOpen){
                if(board[row+1][column+1].player===playerPC*-1 ){
                    for (let i = 1; i < 7 && band; i++) {   
                        if(row+i>7 || column+i>7)
                            band=false
                        
                        if(band){
                            if(board[row+i][column+i].player===playerPC*-1)
                                k++
                            if(board[row+i][column+i].player===playerPC){
                                band=false
                                mustFlip=true
                                j+=k
                            }
        
                            if(!board[row+i][column+i].isOpen)
                                band=false
                        }
                    }
                    if(mustFlip){
                        playes = {
                            row,
                            column,
                            token:j,
                        }
                    }
                }
            }
        }
    
        return playes
    }

    /**
     * 
     * @param {Array} playesPC posibles playes
     * @returns {Object} coordinates of the playerpc's play
     */
    Constructor.prototype.makeDecision = function(playesPC){
        const reducer = (prev,current) => {
            return prev > current ? prev : current
        }
        return playesPC.reduce(reducer)
    }

    return Constructor
})();

