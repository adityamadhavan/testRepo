import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export class Card extends React.Component{

    render(){
        console.log(this.props.picture)
        return(
            <div>
                <button type="button" class="btn btn-outline-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
                <img width="70"
                src={`${this.props.picture}`} />
                </button>
            </div>
        );
    }
}

export default Card;
