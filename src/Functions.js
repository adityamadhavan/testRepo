const suit = ["Spades", "Diamonds", "Hearts", "Clubs"];
const rank = [2,3,4,5,6,7,8,9,10,11,12,13,100];
var z = 0, getDeck = [];
var varPicture = [];

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

function CountFun(cnt){
    var cnt=parseInt(cnt, 10)+parseInt(1, 10);
    return cnt;
}

function duplicate(handA, handB) {
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

function GetLoser(handA, handB, handC, loser)
    {
        if((handA.length === 1 || handA.length === 3) && handB.length === 0 && handC.length === 0)
        {loser = "Player 1 is the loser!"}
        else if((handB.length === 1 || handB.length === 3) && handC.length === 0 && handA.length === 0)
        {loser = "Player 2 is the loser!"}
        else if((handC.length === 1 || handC.length === 3) && handA.length === 0 && handB.length === 0)
        {loser = "Player 3 is the loser!"}
        else{loser = "Game progresses"}
        return loser;
    }

function PlayPlayer(handA, handB, handC, handD) { 
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

function PlayComp(handA, handB, handC, handD) {
    let a = PlayPlayer(handA, handB, handC, handD);
        
    for(var i = 0; i < a.length; i++){
        a[i].isFaceUp = false;
    }
    let b = duplicate(a, handD);
    return b;
}

module.exports = {
    CountFun: CountFun,
    pic: pic,
    CreateDeck: CreateDeck,
    shuffleDeck: shuffleDeck,
    distributeCard: distributeCard,
    duplicate: duplicate,
    PlayComp: PlayComp,
    PlayPlayer: PlayPlayer,
    GetLoser: GetLoser
}