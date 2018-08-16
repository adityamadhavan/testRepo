import React from 'react';
import './index.css';

export class Card extends React.Component{

    render(){
        return(
            <button type="button" className="btn btn-outline-primary" data-toggle="button" aria-pressed="false" autoComplete="off">
                <img width="80"
                src={this.props.isFaceUp ? `${this.props.picture}` : `${this.props.downPic}`} alt="Card" />
            </button>
            
        );
    }
}

export default Card;