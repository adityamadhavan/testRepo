import React from 'react';
import './App.css';
import './Board.js'

class Loser extends React.Component{

    
    getLoser() {
        if  (hand1 !== 0 && hand2 === 0 && hand3 === 0)
        {loser = "Player 1 loses"}
    else if (hand2 !== 0 && hand3 === 0 && hand1 === 0)
        {loser = "Player 2 loses"}
    else if (hand3 !== 0 && hand1 === 0 && hand2 === 0)
        {loser = "Player 3 loses"}
        return loser; 
    }
    
    render(){
        return(
            <div>
                <h1><getLoser /></h1>
            </div>
        );
    }
}

export default Loser;