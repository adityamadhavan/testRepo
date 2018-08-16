import React from 'react';
import './index.css';
import Card from './Card.js';

class Hand extends React.Component{

    render(){
        return(
             <ul className="list-inline card-container">
                {this.props.card.map((card, i) => 
                <li key={i} className="list-inline-item card"><Card  {...card} /> </li>)}
            </ul>
            
            
        );
    }
}

export default Hand;