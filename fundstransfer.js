const totalNum = 60
var over30m_ohter = 770;
var under30m_ohter = 550;
var over30m_our = 440;
var under30m_our = 220;

var over30 = 880;
var under30 = 660;

function inputValue(idNo){
  chooseFee(idNo);
  bigSum();
  sumFee();
  kensuCheck();
  smallSum();
}

function sumFeeAndsmallSum(){
  //手数料を手入力した場合
  bigSum();
  sumFee();
  smallSum();
}


function chooseFee(idNo){
  let amountFT = document.getElementById(idNo).value;
  let ourOrOther = document.getElementById("OBK"+idNo).checked;
  if (amountFT==="") return;
  switch(ourOrOther){
    case true:
      if(amountFT>=30001){
        document.getElementById("fee"+idNo).value=over30m_our;
      }else{
        document.getElementById("fee"+idNo).value=under30m_our;
      }
      break;
    case false:
      if(amountFT>=30001){
        document.getElementById("fee"+idNo).value=over30m_ohter;
      }else{
        document.getElementById("fee"+idNo).value=under30m_ohter;
      }
      break;
  }
}

function bigSum() {
  var bSum = 0;
  for (var i=1; i<=totalNum; i++) {
    var amountFT = document.getElementById(i).value; 
    if(amountFT==="" || amountFT===0) continue;
    //↓ついでに横トータルを全行計算する。
    document.getElementById("yokoTotal"+ i).value = parseInt(document.getElementById(i).value,10) + parseInt(document.getElementById("fee" + i).value,10);
    bSum=bSum+parseInt(amountFT,10);
    document.getElementById("bSum").value=bSum;
  }
  //合計金額表示桁切り
  document.getElementById("bSum").value=document.getElementById("bSum").value.replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );
}

function sumFee(){
  //手数料の総合計を計算
  var feeTotal = 0;
  for(var i=1; i<=totalNum; i++){
    var fee =document.getElementById("fee"+i).value;
    if (fee==="") continue;
    feeTotal=feeTotal+parseInt(fee,10);
  } 
  //振込金額+手数料合計計算（横トータルの合計を計算）
  var totalFundsAndFee =0;
  for(i=1; i<=totalNum; i++){
    var fundsAndFee = document.getElementById("yokoTotal"+i).value;
    if (fundsAndFee==="") continue;
    totalFundsAndFee=totalFundsAndFee+parseInt(fundsAndFee,10);
  }
  //手数料合計表示、桁切り
  document.getElementById("totalFeeT").value=feeTotal;
  document.getElementById("totalFeeT").value=document.getElementById("totalFeeT").value.replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );
  //振込金額+手数料の合計表示、桁切り
  document.getElementById("totalYokoTotalT").value=totalFundsAndFee;
  document.getElementById("totalYokoTotalT").value=document.getElementById("totalYokoTotalT").value.replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );

} 
function kensuCheck(){
  //総合計の件数を計算し総件数欄に出力
  var kensu = 0;
  for (var i=1; i<=totalNum; i++){
    var amountFT = document.getElementById(i).value;
    if(amountFT==="" || amountFT===0) continue;
    kensu += 1
  }
  document.getElementById("numOfDataT").value=kensu
}


  //for (i=1; i=totalNum; i++){
    //if(document.getElementById("yokoTotal"+i).value="") continue;
    //document.getElementById("yokoTotal"+i).value=document.getElementById("yokoTotal"+i).value.replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );
  //}

function smallSum(){
  //小計を計算する
  var startNo=1;
  var endNo=10;
  for (var j=0; j<=5; j++){
    var sSum = 0;
    var sFee = 0;
    var skensu = 0;
    for (var i=startNo; i<=endNo; i++){
      if(document.getElementById(i).value ==="") continue;
      sSum = sSum + parseInt(document.getElementById(i).value,10);
      sFee = sFee + parseInt(document.getElementById("fee"+i).value,10);
      skensu = skensu + 1
    }
    document.getElementById("sSum"+j).value=sSum;
    document.getElementById("totalFee"+j).value=sFee;
    document.getElementById("totalYokoTotal"+j).value=sSum+sFee;
    document.getElementById("numOfData"+j).value=skensu

    document.getElementById("sSum"+j).value=document.getElementById("sSum"+j).value.replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );
    document.getElementById("totalYokoTotal"+j).value=document.getElementById("totalYokoTotal"+j).value.replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );
    startNo=startNo+10;
    endNo=endNo+10;
  }
}

function keydown(e){
  if(e.keyCode === 13){
    var currentId = document.activeElement.id;
    var nextId = parseInt(currentId,10) + 1;
    document.getElementById(nextId).focus();
  }
}
window.onkeydown = keydown;

let input = document.querySelector('input');
input.oninput = handleInput;
function handleInput(e) {
 　 var currentId = document.activeElement.id;
    var nextId = parseInt(currentId,10) + 1;
    document.getElementById(nextId).focus(); 
}