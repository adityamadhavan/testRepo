import React from 'react';
import './index.css';
import Hand from './Hand.js';

const suit = ["Spades", "Diamonds", "Hearts", "Clubs"];
const rank = [2,3,4,5,6,7,8,9,10,11,12,13,100];
var z = 0, loser = 0;
var varPicture = [];
var newDeckGeneral = [], createDeckArray = [],  deck = [];
var initHand1 = [], initHand2 = [], initHand3 = [];
var isFaceUp;


var newCard = {
    suit: this.suit,
    rank: this.rank,
    picture: this.picture,
    name: this.name
};

function pic(x, y){
    return("./cards/png/" + x + "/" + y + ".png"); // /Users/adityamadhavan/cardgame/src/cards/png/" + x + "/" + y + ".png
}


for (var x = 0; x < 4; x++){
    for (var y = 0; y < 13; y++){
        varPicture[z] = pic(x,y);
        z++;
    }
}
const picture = varPicture;

function CreateDeck(){
    var deck = [];
    var pictureIdx = 0;
    for (var suitIdx = 0; suitIdx < suit.length; suitIdx++) {
        for (var rankIdx = 0; rankIdx < rank.length; rankIdx++) {
            newCard = {
                suit: suit[suitIdx],
                rank: rank[rankIdx],
                picture: picture[pictureIdx],  
                name: rank[rankIdx] + " " + "of" + " " + suit[suitIdx]    
            };
        deck.push(newCard);
        pictureIdx++;
        }
    }
  return deck;
}

createDeckArray = CreateDeck();

function shuffleDeck(deck) {
    for (var i = 0; i < deck.length; i++) {
      var swapIdx = Math.trunc(Math.random() * deck.length);
      var tmp = deck[swapIdx];
      deck[swapIdx] = deck[i];
      deck[i] = tmp;
    }
    return deck;
}
  
newDeckGeneral = shuffleDeck(createDeckArray);
newDeckGeneral.pop();
deck = newDeckGeneral;

function distributeCard(hand) {
    for (var i = 0; i < 17; i++) {
      hand[i] = deck[0];
      deck.shift();
    }
    return hand;
}
deck = newDeckGeneral;

initHand1 = distributeCard(initHand1); 
initHand2 = distributeCard(initHand2);
initHand3 = distributeCard(initHand3);
console.log(initHand3); 


class Board extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            hand1: initHand1,
            hand2: initHand2,
            hand3: initHand3,
            hand4: [],
            message: [],
            loser: []
        };
    }

    newGame() {
        this.setState({
            hand1: initHand1,
            hand2: initHand2,
            hand3: initHand3,
            hand4: [],
            
        });
    }

    duplicateFilter() {
        this.setState({hand1: this.duplicate(this.state.hand1, this.state.hand4, this.state.message),  
                       hand2: this.duplicate(this.state.hand2, this.state.hand4, this.state.message),
                       hand3: this.duplicate(this.state.hand3, this.state.hand4, this.state.message)
        });    
    }

    duplicate(handA, handB, message) {
        for (var i = 0; i < handA.length; i++) {
            for (var j = i + 1; j < handA.length; j++) {
              if (handA[i].rank === handA[j].rank) { 
                message.pop(handA[0]); message.pop(handA[0]);
                message.push(handA[i]);
                message.push(handA[j]);
                handB.reverse();
                handB.push(handA[i]);
                handB.push(handA[j]);  
                console.log(message);
                handA.splice(i, 1);
                handA.splice(j - 1, 1);
                j = i;
                handB.reverse();
              }
            }
          }  
       return handA;
    }

    Button1() {
        this.setState({hand1: this.PlayComp(this.state.hand1, this.state.hand2, this.state.hand3, this.state.hand4, this.state.message)});
    }

    Button2() {
        this.setState({hand2: this.PlayPlayer(this.state.hand2, this.state.hand3, this.state.hand1)});
    }

    Button3() {
        this.setState({hand3: this.PlayComp(this.state.hand3, this.state.hand1, this.state.hand2, this.state.hand4, this.state.message)});
    }

    PlayPlayer(handA, handB, handC) { //Turn
        let x = Math.trunc(Math.random() * handB.length);
        let y = Math.trunc(Math.random() * handC.length);
        if(handB.length !== 0){
            let a = handB[x];
            console.log("Selected Card")
            console.log(handB[x]);
            handA.push(a);
            handB.splice(x, 1);
        }
        else if(handB.length === 0 && handC.length !== 0){
            let a = handC[y];
            console.log("Selected Card")
            console.log(handC[y]);
            handA.push(a);
            handC.splice(y, 1);
        }
        else{}
        return handA;
    }


    PlayComp(handA, handB, handC, handD, message) {
        let a = this.PlayPlayer(handA, handB, handC);
        let b = this.duplicate(a, handD, message);
        return b;
    }
    
    render(){
        
        return(
            <div>
                <h1 align="center">Welcome to Old Boy</h1>
                <div className="container">
                    <div className="row" >
                        <div className="col-sm-2"></div>
                        <div align="center" className="col-sm-4">
                            <button onClick={this.newGame.bind(this)}>New Game</button>
                        </div>
                        <div align="center" className="col-sm-4">
                        <button onClick={this.duplicateFilter.bind(this)}>Remove Duplicates</button>
                        <div className="col-sm-2"></div>
                        </div>    
                    </div>
                </div>
                <hr/>
                <div className="container">
                    <div align="center" className="row">
                        <div className="col-sm-4">
                            <button padding="20" disabled={this.state.hand1.length === 0 || (this.state.hand2.length === 0 && this.state.hand3.length === 0)} onClick={this.Button1.bind(this)}>Continue to Player 1's Turn</button>
                        </div>
                        <div className="col-sm-4">
                            <button padding="20" disabled={this.state.hand2.length === 0 || (this.state.hand3.length === 0 && this.state.hand1.length === 0)} onClick={this.Button2.bind(this)}>Play</button>
                        </div>
                        <div className="col-sm-4">
                            <button padding="20" disabled={this.state.hand3.length === 0 || (this.state.hand1.length === 0 && this.state.hand2.length === 0)} onClick={this.Button3.bind(this)}>Continue to Player 3's Turn</button>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="row">
                                <div align="center" className="col-sm-12">
                                    <div><h6>Player 1</h6><Hand card={this.state.hand1}/></div>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">    
                                <div align="center" className="col-sm-12">  
                                    <div><h6>Player 2</h6><Hand card={this.state.hand2}/></div>                     
                                </div>
                            </div>
                            <hr/> 
                            <div className="row">    
                                <div align="center" className="col-sm-12">
                                    <div className="e" padding="30"><h6>Player 3</h6><Hand card={this.state.hand3}/></div>
                                </div>
                            </div>  
                            <hr/> 
                            <div className="row">    
                                <div align="center" className="col-sm-12">
                                    <div>...</div>
                                </div>
                            </div>  
                            
                        </div>
                        <div className="col-sm-3">
                            <div className="row">    
                                <div align="center" className="col-sm-12">  

                                    <div><h4>The top 2 cards were discarded in the last turn</h4><Hand card={this.state.hand4}/></div>                     
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        );
    }
}


export default Board;