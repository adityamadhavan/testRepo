module.exports.CountFun = function CountFun(cnt){
    if(typeof cnt == "number"){
      cnt=parseInt(cnt, 10)+parseInt(1, 10);
    }
    else cnt = "TypeError";
    
    return cnt;
}

module.exports.GetLoser = function GetLoser(a, b, c, loser)
    {
        if((a === 1 || a === 3) && b === 0 && c === 0)
        {loser = "Player 1 is the loser!"}
        else if((b === 1 || b === 3) && c === 0 && a === 0)
        {loser = "Player 2 is the loser!"}
        else if((c === 1 || c === 3) && a === 0 && b === 0)
        {loser = "Player 3 is the loser!"}
        else{loser = "Game progresses"}
        return loser;
    }




