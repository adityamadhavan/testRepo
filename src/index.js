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
var initHand1 = [], initHand2 = [], initHand3 = [];
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
console.log(deck);

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

console.log(initHand1);

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
                {this.props.card.map((card, i) => <Card key={i} {...card} />)}
            </div>
        );
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hand1: initHand1,
            hand2: initHand2,
            hand3: initHand3
        };
    }


    duplicateFilter() {
        this.setState({hand1: this.duplicate(this.state.hand1),
                       hand2: this.duplicate(this.state.hand2),
                       hand3: this.duplicate(this.state.hand3)
        });
       
    }

    duplicate(hand) {
        for (var i = 0; i < hand.length; i++) {
            for (var j = i + 1; j < hand.length; j++) {
              if (hand[i].rank === hand[j].rank) {
                hand.splice(i, 1);
                hand.splice(j - 1, 1);
                j = i;
              }
            }
          }

       return hand;
    }

    Button1() {
        this.setState({hand1: this.PlayComp(this.state.hand1, this.state.hand2)});
    }

    Button2() {
        this.setState({hand2: this.PlayPlayer(this.state.hand2, this.state.hand3)});
    }

    Button3() {
        this.setState({hand3: this.PlayComp(this.state.hand3, this.state.hand1)});
    }

    PlayPlayer(handA, handB, handC) { //Turn
        let x = Math.trunc(Math.random() * handB.length);
        let y = Math.trunc(Math.random() * handC.length);
        if(this.state.handB !== 0){
            let a = handB[x];
            console.log("Selected Card")
            console.log(handB[x]);
            handA.push(a);
            handB.splice(x, 1);
        }
        else if(handB === 0 && handC !== 0){
            let b = handC[y];
            console.log("Selected Card")
            console.log(handB[y]);
            handA.push(b);
            handB.splice(y, 1);
        }
        else{}
        return handA;
    }

    PlayComp(handA, handB) {
        let a = this.PlayPlayer(handA, handB);
        let b = this.duplicate(a);
        return b;
    }

    render(){
        return(
            <div>
                <h1 align="center">Welcome to Old Boy</h1>
                <div className="container">
                    <div clasName="row" >
                        <div className="col=sm=4" ></div>
                        <div className="col=sm=4" >
                            <button onClick={() => alert('Pls Refresh this bloody page')}>New Game</button>
                            <button onClick={this.duplicateFilter.bind(this)}>Remove Duplicates</button>
                        </div>
                        <div className="col=sm=4" ></div>    
                    </div>
                </div>
                <hr/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <button disabled={this.state.hand1.length === 0 || this.state.hand2.length === 0} onClick={this.Button1.bind(this)}>Play</button>
                            <Hand card={this.state.hand1}/>
                        </div>
                        <div className="col-sm-4">
                            <button disabled={this.state.hand2.length === 0 || this.state.hand3.length === 0} onClick={this.Button2.bind(this)}>Play</button>
                            <Hand card={this.state.hand2}/>                      
                        </div>
                        <div className="col-sm-4">
                            <button disabled={this.state.hand3.length === 0 || this.state.hand1.length === 0} onClick={this.Button3.bind(this)}>Play</button>
                            <Hand card={this.state.hand3}/>
                        </div>
                    </div>
                </div>    
            </div>
        );
    }
}




class App extends React.Component{
    render(){
        return(
            <div>
                <Board />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();