export const PlayerPC = (function(){
    const Constructor = function(props) {
        this.props = props
        this.find(this.props)
    }
    
    Constructor.prototype.find = function(props){
        this.props.playes.forEach(cell => {
            console.log(cell)
        });
    }
    
    
 

    return Constructor
})();

