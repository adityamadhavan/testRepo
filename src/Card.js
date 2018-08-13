import React from 'react';
import './App.css';

export class Card extends React.Component{

    render(){
        console.log(this.props.picture)
        return(
            <div>
                <button type="button" class="btn btn-outline-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
                <img width="70"
                src={`${this.props.picture}`} alt="Card" />
                </button>
            </div>
        );
    }
}

export default Card;
