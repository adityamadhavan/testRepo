import React from 'react';
import './index.css';
import Hand from './Hand.js';
import Discard from './Discard.js';
 
var f = require('./functions.js');


var initHand1 = [], initHand2 = [], initHand3 = [];

initHand1 = f.distributeCard(initHand1, false); 
initHand2 = f.distributeCard(initHand2, true);
initHand3 = f.distributeCard(initHand3, false);



class Board1 extends React.Component{

    constructor(props){
        super(props);
        window.comp = this;
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
            hand1: f.distributeCard(initHand1, false),
            hand2: f.distributeCard(initHand2, true),
            hand3: f.distributeCard(initHand3, false),
            hand4: [],
            loser: "New Game",
            flag: [1,0,0],
            cnt: f.CountFun(this.state.cnt)
        });
    }
    

    duplicateButton() {
        this.setState({hand1: f.duplicate(this.state.hand1, this.state.hand4),  
                       hand2: f.duplicate(this.state.hand2, this.state.hand4),
                       hand3: f.duplicate(this.state.hand3, this.state.hand4),
                    });    
    }

    Button1() {
        this.setState({
            hand1: f.PlayComp(
                this.state.hand1, this.state.hand2, this.state.hand3, this.state.hand4, this.state.loser),
            loser: f.GetLoser(
                this.state.hand1, this.state.hand2, this.state.hand3, this.state.hand4, this.state.loser),
            flag: this.state.hand2.length === 0 ? [0,0,1 ] : [0,1,0]
            });
    }

    Button2() {
        this.setState({
            hand2: f.PlayPlayer(
                this.state.hand2, this.state.hand3, this.state.hand1, this.state.hand4, this.state.loser),
            loser: f.GetLoser(
                this.state.hand2, this.state.hand3, this.state.hand1, this.state.hand4, this.state.loser),
            
            flag: this.state.hand3.length === 0 ? [1,0,0] : [0,0,1]
            });
    }

    Button3() {
        this.setState({
            hand3: f.PlayComp(
                this.state.hand3, this.state.hand1, this.state.hand2, this.state.hand4, this.state.loser),
            loser: 
            f.GetLoser(
                this.state.hand1, this.state.hand2, this.state.hand3, this.state.hand4, this.state.loser),
            flag: this.state.hand3.length === 0 ? [0,1,0] : [1,0,0]
            });
    }

    render(){
      
        return(

            <div>
                <h1 className="welcome" align="center">Welcome to Old Boy!</h1>
                <div className="container">
                    <div className="row">
                        <div align="center" className="col-sm-2 topbuttons">
                            <button onClick={this.NewGame.bind(this)}>New Game</button>
                            <div>Games Played:<span className="badge">{f.CountFun(this.state.cnt)}</span></div>
                        </div>
                        <div className="col-sm-8">
                        <div align="center"><h1>{this.state.loser}</h1></div>
                        </div>  
                        <div className="col-sm-3"></div>  
                    </div>
                </div>
                <div className="container">
                    <div className="row">      
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col-sm-3">
                                    <button className="padding1539"
                                        disabled={this.state.flag[0] !== 1 || this.state.hand1.length === 0 || 
                                        (this.state.hand2.length === 0 && this.state.hand3.length === 0)} 
                                        onClick={this.Button1.bind(this)}>Pass to 1</button>
                                </div>  
                                <div align="center" className="col-sm-9">
                                    <div className="leftpx"><h6>Player 1</h6>
                                    <Hand card={this.state.hand1}/></div>
                                </div>
                            </div>
                            <div className="row"> 
                                <div className="col-sm-3 toppx">
                                    <ul class="nav flex-column navbarstyle">
                                        <li class="nav-item">
                                            <button className="padding0550" disabled={this.state.flag[1] !== 1 || (this.state.hand2.length === 0 || 
                                                (this.state.hand3.length === 0 && this.state.hand1.length === 0))} 
                                                onClick={this.Button2.bind(this)}>Play
                                            </button>
                                        </li>
                                        <li class="nav-item">
                                            <button className="padding1210" onClick={this.duplicateButton.bind(this)}>Discard</button>
                                        </li>
                                    </ul>
                                </div>

                                
                                <div align="center" className="col-sm-9">  
                                    <div className="leftpx"><h6>Player 2</h6>
                                    <Hand card={this.state.hand2}/></div>                     
                                </div>
                            </div>                            
                            <div className="row">  
                                <div className="col-sm-3">
                                    <button className="padding1539" 
                                        disabled={this.state.flag[2] !== 1 || (this.state.hand3.length === 0 ||
                                        (this.state.hand1.length === 0 && this.state.hand2.length === 0))} 
                                        onClick={this.Button3.bind(this)}>Pass to 2</button>
                                </div>  
                                <div align="center" className="col-sm-9">
                                    <div  className="leftpx" padding="30"><h6>Player 3</h6>
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

export default Board1;

