import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import App from './App';
import registerServiceWorker from './registerServiceWorker';

const suit = ["Spades", "Diamonds", "Hearts", "Clubs"];
const rank = [2,3,4,5,6,7,8,9,10,11,12,13,100];
var z = 0;
var varPicture = [];
var newDeckGeneral = [], createDeckArray = [],  deck = [];
var handWithDups1 = [], handWithDups2 = [], handWithDups3 = [];
var hand1 = [], hand2 = [], hand3 = [];

var newCard = {
    suit: this.suit,
    rank: this.rank,
    picture: this.picture
};

function pic(x, y){
    return("/Users/adityamadhavan/cardgame/src/cards/png/" + x + "/" + y + ".png");
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
                picture: picture[pictureIdx]      
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

// for( let i = 0; i < deck.length; i++){console.log(deck[i].picture);}

function distributeCard(hand) {
    for (var i = 0; i < 17; i++) {
      hand[i] = deck[0];
      deck.shift();
    }
    return hand;
}
deck = newDeckGeneral;

handWithDups1 = distributeCard(handWithDups1);  
handWithDups2 = distributeCard(handWithDups2);
handWithDups3 = distributeCard(handWithDups3);

function duplicate(hand) { //Removes Duplicates
    var x = hand.length;
    var y = hand.length;
    for (var i = 0; i < x; i++) {
      for (var j = i + 1; j < y; j++) {
        if (hand[i].rank === hand[j].rank) {
          hand.splice(i, 1);
          hand.splice(j - 1, 1);
          y = y - 2;
        }
      }
      x = y;
    }
    return hand;
}

hand1 = duplicate(handWithDups1); //Duplicates removed  
hand2 = duplicate(handWithDups2); //Duplicates removed  
hand3 = duplicate(handWithDups3); //Duplicates removed

function turn(handA, handB) { //Turn
    let x = Math.trunc(Math.random() * handB.length);
    let a = handB[x];
    console.log("Selected Card")
    console.log(handB[x]);
    handA.push(a);
    handB.splice(x, 1);
    handA = duplicate(handA);
    console.log("Hand taken by");
    for (var i = 0; i < handA.length; i++) {
      console.log(handA[i]);
    }
    console.log("Hand taken from");
    for (var i = 0; i < handB.length; i++) {
      console.log(handB[i]);
    }
    return handA;
}

const Turn = () => {
    return(
        <div>
            ...
        </div>    
    );
}

class Card extends React.Component{
    render(){
        return(
            <div>
                <img width="30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkzqDnXL_gZ2SsOZBxXd2Yh3IpJpTTorbiEqVBtgDgPZbnxHH" />
                <p>{this.props.rank} of {this.props.suit}</p>
            </div>
        );
    }
}

class Hand extends React.Component{
    render(){
        return(
            <div>
                {this.props.card.map((card) => <Card {...card} />)}
            </div>
        );
    }
}

class Board extends React.Component{
    render(){
        return(
            <div>
                <h1>Welcome to Old Boy</h1>
                <button onClick={() => alert('Refresh Page to Start New Game')}>New Game</button>
                <hr/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                        <Hand card={hand1}/>
                        </div>
                        <div className="col-sm-4">
                            <Hand card={hand2}/>
                        </div>
                        <div className="col-sm-4">
                            <Hand card={hand3}/>
                        </div>
                    </div>
                </div>    
            </div>
        );
    }
}

ReactDOM.render(<Board />, document.getElementById('root'));
registerServiceWorker();