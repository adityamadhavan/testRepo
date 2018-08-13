import React from 'react';
import './App.css';
import './Board.js';

var hand1 = [], hand2 = [], hand3 = [];


class GetLoser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           hand1: this.hand1,
           hand2: this.hand2,
           hand3: this.hand3
        };
    }
    
    render(){
        if  (hand1.length !== 0 && hand2.length === 0 && hand3.length === 0)
        return(
            <h1>Player 1 is the loser</h1>
        );
        else if  (hand2.length !== 0 && hand3.length === 0 && hand1.length === 0)
        return(
            <h1>Player 2 is the loser</h1>
        );
        else if  (hand3.length !== 0 && hand1.length === 0 && hand2.length === 0)
        return(
            <h1>Player 3 is the loser</h1>
        );
        else return("Game in progress");
    
    }
}

export default GetLoser;