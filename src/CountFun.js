  function CountFun(cnt){
    if(typeof cnt == "number"){
      cnt=parseInt(cnt, 10)+parseInt(1, 10);
    }
    else cnt = "TypeError";
    
    return cnt;
}
module.exports = CountFun;

// function GetLoser(hand1, hand2, hand3, hand4){
//   if((handA.length === 1 || handA.length === 3) && handB.length === 0 && handC.length === 0)
//         {loser = "Player 1 is the loser!"}
//         else if((handB.length === 1 || handB.length === 3) && handC.length === 0 && handA.length === 0)
//         {loser = "Player 2 is the loser!"}
//         else if((handC.length === 1 || handC.length === 3) && handA.length === 0 && handB.length === 0)
//         {loser = "Player 3 is the loser!"}
//         else{loser = "Game progresses"}
//         return loser;
