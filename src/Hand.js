import React from 'react';
import './App.css';
import Card from './Card.js';

class Hand extends React.Component{

    render(){
        return(
            <div>
                {this.props.card.map((card, i) => <Card key={i} {...card} />)}
            </div>
        );
    }
}

export default Hand;
