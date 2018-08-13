import React from 'react';
import './App.css';

export class Card extends React.Component{

    render(){
        return(
            <div>
                <button type="button" className="btn btn-outline-primary" data-toggle="button" aria-pressed="false" autoComplete="off">
                <img width="60"
                src={`${this.props.picture}`} alt="Card" />
                </button>
            </div>
        );
    }
}

export default Card;
