import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var imgDeck = [];

for (var i = 0; i < 13; i++){
  imgDeck[i] = './cards/spades' + i + '.png';
}

console.log(imgDeck[2]);
