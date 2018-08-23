  function CountFun(cnt){
    if(typeof cnt == "number"){
      cnt=parseInt(cnt, 10)+parseInt(1, 10);
    }
    else cnt = "TypeError";
    
    return cnt;
}
module.exports = CountFun;


