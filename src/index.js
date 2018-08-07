import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// import App from './App';
import registerServiceWorker from './registerServiceWorker';

const suit = ["Spades", "Diamonds", "Hearts", "Clubs"];
const rank = [2,3,4,5,6,7,8,9,10,11,12,13,100];
var newDeckGeneral = [], createDeckArray = [],  deck = [];
var handWithDups1 = [], handWithDups2 = [], handWithDups3 = [];
var hand1 = [], hand2 = [], hand3 = [];

var card = {
    suit: [],
    rank: [],
    image: this.image
};

function CreateDeck(){
    var deck = [];
    for (var suitIdx = 0; suitIdx < suit.length; suitIdx++) {
        for (var rankIdx = 0; rankIdx < rank.length; rankIdx++) {
            card = {
                suit: suit[suitIdx],
                rank: rank[rankIdx],
                if(suitIdx = 0){
                    image: './cards/spades/' + rankIdx + '.png'
                }
                
            };
        deck.push(card);
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

// for( let i = 0; i < deck.length; i++){console.log(deck[i]);}

function distributeCard(hand) {
    for (var i = 0; i < 17; i++) {
      hand[i] = deck[0];
      deck.shift();
    }
    return hand;
}

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


export class PrintDeck extends React.Component{
    render(){
        return(
            <div>
                <ul> 
                    {deck.map((deck, i) => <li key={i}>{deck.image}</li>)}
                </ul> 
            </div>       
        );
    }    
};

export class Hand extends React.Component{
    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <ul> 
                                {hand1.map((hand1, i) => <li key={i}>{hand1.rank} of {hand1.suit}</li>)}
                            </ul> 
                        </div>
                        <div className="col-sm-4">
                            <ul> 
                                {hand2.map((hand2, i) => <li key={i}>{hand2.rank} of {hand2.suit}</li>)}
                            </ul>
                        </div>
                        <div className="col-sm-4">
                            <ul> 
                                {hand3.map((hand3, i) => <li key={i}>{hand3.rank} of {hand3.suit}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>        
        );
    }
}

ReactDOM.render(<Hand />, document.getElementById('root'));
registerServiceWorker();

