import React from 'react';
import './index.css';
import Hand from './Hand.js';
import Discard from './Discard.js';


const suit = ["Spades", "Diamonds", "Hearts", "Clubs"];
const rank = [2,3,4,5,6,7,8,9,10,11,12,13,100];
var z = 0, getDeck = [];
var varPicture = [];
var initHand1 = [], initHand2 = [], initHand3 = [];

function pic(x, y){
    return("./cards/png/" + x + "/" + y + ".png");}

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
          const newCard = {
                suit: suit[suitIdx],
                rank: rank[rankIdx],
                picture: picture[pictureIdx], 
                downPic: './cards/png/back.png',
                isFaceUp: false    
            };
        deck.push(newCard);
        pictureIdx++;
        }
    }
  return deck;
}

function shuffleDeck(deck) {
    for (var i = 0; i < deck.length; i++) {
      var swapIdx = Math.trunc(Math.random() * deck.length);
      var tmp = deck[swapIdx];

      deck[swapIdx] = deck[i];
      deck[i] = tmp;
    }
    deck.pop();
    return deck;
}
  
function distributeCard(hand, isFaceUp) {
    if (getDeck.length === 0)
    {let createDeckArray = CreateDeck(); 
    getDeck = shuffleDeck(createDeckArray);}

    for (var i = 0; i < 17; i++) {
      hand[i] = getDeck[0];
      hand[i]['isFaceUp'] = isFaceUp;
      getDeck.shift();
    }

    return hand;
}

initHand1 = distributeCard(initHand1, false); 
initHand2 = distributeCard(initHand2, true);
initHand3 = distributeCard(initHand3, false);

class Board extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            hand1: initHand1,
            hand2: initHand2,
            hand3: initHand3,
            hand4: [],
            loser: "Game On!",
            flag: [1,0,0],
            cnt: 0
        };
    } 

    NewGame(){
        this.setState({
            hand1: distributeCard(initHand1, false),
            hand2: distributeCard(initHand2, true),
            hand3: distributeCard(initHand3, false),
            hand4: [],
            loser: "New Game",
            flag: [1,0,0],
            cnt: this.CountFun(this.state.cnt)
        });
    }
    
    CountFun(cnt){
        cnt=parseInt(cnt, 10)+parseInt(1, 10);
        return cnt;
    }

    duplicateFilter() {
        this.setState({hand1: this.duplicate(this.state.hand1, this.state.hand4),  
                       hand2: this.duplicate(this.state.hand2, this.state.hand4),
                       hand3: this.duplicate(this.state.hand3, this.state.hand4),
                    });    
    }

    duplicate(handA, handB) {
        for (var i = 0; i < handA.length; i++) {
            for (var j = i + 1; j < handA.length; j++) {
              if (handA[i].rank === handA[j].rank) { 
                handB.reverse();
                handB.push(handA[i]);
                handB.push(handA[j]);  
                handA.splice(i, 1);
                handA.splice(j - 1, 1);
                j = i;
                handB.reverse();
              }
            }
          } 
          for(i = 0; i < handB.length; i++){
            handB[i].isFaceUp = true;
        }   
        
       return handA;
    }

    PlayPlayer(handA, handB, handC, handD) { 
        
        let x = Math.trunc(Math.random() * handB.length);
        let y = Math.trunc(Math.random() * handC.length);
        
        
        if(handB.length !== 0){
            let a = handB[x];
            a.isFaceUp = true;
            handA.push(a);
            handB.splice(x, 1);
        }
        else if(handB.length === 0 && handC.length !== 0){
            let a = handC[y]; 
            a.isFaceUp = true;
            handA.push(a);
            handC.splice(y, 1);
        }
        else{}

        return handA;
    }

    PlayComp(handA, handB, handC, handD) {


        let a = this.PlayPlayer(handA, handB, handC, handD);
        for(var i = 0; i < a.length; i++){
            a[i].isFaceUp = false;
        }
        let b = this.duplicate(a, handD);

        return b;
    }
    
    
    Button1() {
        this.setState({
            hand1: this.PlayComp(
                this.state.hand1, this.state.hand2, this.state.hand3, this.state.hand4, this.state.loser),
            loser: this.GetLoser(
                this.state.hand1, this.state.hand2, this.state.hand3, this.state.hand4, this.state.loser),
            flag: this.state.hand2.length === 0 ? [0,0,1 ] : [0,1,0]
            });
    }

    Button2() {
        this.setState({
            hand2: this.PlayPlayer(
                this.state.hand2, this.state.hand3, this.state.hand1, this.state.hand4, this.state.loser),
            loser: this.GetLoser(
                this.state.hand2, this.state.hand3, this.state.hand1, this.state.hand4, this.state.loser),
            
            flag: this.state.hand3.length === 0 ? [1,0,0] : [0,0,1]
            });
    }

    Button3() {
        this.setState({
            hand3: this.PlayComp(
                this.state.hand3, this.state.hand1, this.state.hand2, this.state.hand4, this.state.loser),
            loser: 
            this.GetLoser(
                this.state.hand1, this.state.hand2, this.state.hand3, this.state.hand4, this.state.loser),
            flag: this.state.hand3.length === 0 ? [0,1,0] : [1,0,0]
            });
    }

    GetLoser(handA, handB, handC, loser)
    {
        if((handA.length === 1 || handA.length === 3) && handB.length === 0 && handC.length === 0)
        {loser = "Player 1 is the loser"}
        else if((handB.length === 1 || handB.length === 3) && handC.length === 0 && handA.length === 0)
        {loser = "Player 2 is the loser"}
        else if((handC.length === 1 || handC.length === 3) && handA.length === 0 && handB.length === 0)
        {loser = "Player 3 is the loser"}
        else{loser = "Game progresses"}
        return loser;
    }
    
    render(){
      
        return(

            <div>
                <h1 align="center">Welcome to Old Boy</h1>
                <div className="container">
                    <div className="row">
                        <div align="center" className="col-sm-4 topbuttons">
                            <button onClick={this.NewGame.bind(this)}>New Game</button>
                            <div><h6>{this.CountFun(this.state.cnt)}</h6></div>
                        </div>
                        <div align="center" className="col-sm-4 topbuttons">
                        <button onClick={this.duplicateFilter.bind(this)}>Remove Duplicates</button>
                        </div>
                        <div className="col-sm-4">
                        <div align="center"><h1>{this.state.loser}</h1></div>
                        </div>    
                    </div>
                </div>
                <div className="container">
                    <div className="row">      
                        <div className="col-sm-8">
                            <div className="row">
                                <div className="col-sm-2">
                                    <button className="compbutton"
                                        disabled={this.state.flag[0] !== 1 || this.state.hand1.length === 0 || 
                                        (this.state.hand2.length === 0 && this.state.hand3.length === 0)} 
                                        onClick={this.Button1.bind(this)}>Pass to 1</button>
                                </div>  
                                <div align="center" className="col-sm-10">
                                    <div ><h6>Player 1</h6>
                                    <Hand card={this.state.hand1}/></div>
                                </div>
                            </div>
                            <div className="row"> 
                                <div className="col-sm-2">
                                    <button id="play"  
                                        disabled={this.state.flag[1] !== 1 || (this.state.hand2.length === 0 || 
                                        (this.state.hand3.length === 0 && this.state.hand1.length === 0))} 
                                        onClick={this.Button2.bind(this)}>Play</button>
                                </div>
                                <div align="center" className="col-sm-10">  
                                    <div><h6>Player 2</h6>
                                    <Hand card={this.state.hand2}/></div>                     
                                </div>
                            </div>                            
                            <div className="row">  
                                <div className="col-sm-2">
                                    <button className="compbutton" 
                                        disabled={this.state.flag[2] !== 1 || (this.state.hand3.length === 0 ||
                                        (this.state.hand1.length === 0 && this.state.hand2.length === 0))} 
                                        onClick={this.Button3.bind(this)}>Pass to 2</button>
                                </div>  
                                <div align="center" className="col-sm-10">
                                    <div padding="30"><h6>Player 3</h6>
                                    <Hand className="e" card={this.state.hand3}/></div>
                                </div>
                            </div>  
                        </div>
                        <div className="col-sm-3">
                            <div className="row">    
                                <div align="center" className="col-sm-12"> 
                                    <div><h4>The top 2 cards were discarded in the last turn</h4>
                                    <Discard card={this.state.hand4}/></div>
                                              
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