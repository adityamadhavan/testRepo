import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export class Card extends React.Component{

    render(){
        return(
            <div>
                <button type="button" class="btn buttontran" data-toggle="button" aria-pressed="false" autocomplete="off">
                <img width="30" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkzqDnXL_gZ2SsOZBxXd2Yh3IpJpTTorbiEqVBtgDgPZbnxHH" />
                </button>
                <p>{this.props.rank} of {this.props.suit}</p>
            </div>
        );
    }
}

export default Card;
