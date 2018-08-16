import React from 'react';
// import Board from './Board.js';
 
 class UserButton extends React.Component{
    render(){
        if(this.props.flag[1] === 1)
        return(<p>Pass to 1</p>);
        else if(this.props.flag[2] === 1)
            return(<p>Play</p>);
        else if(this.props.flag[3] === 1)
            return(<p>Pass to 3</p>);
        else return{};
    }
 }

 export default UserButton;