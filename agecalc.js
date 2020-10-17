function goNext(){
  document.getElementById("year").focus();
  if (Date(2020,1,1)>Date(2019,1,1)){
    console.log("ok")
  }
}


function startBD(){
  var yearType= document.getElementById("yearType").value
  var yearBdayInput = document.getElementById("year").value;
  var monthBday = document.getElementById("month").value;
  var dayBday = document.getElementById("day").value;
  
  const Bday = seirekiBD(yearType,yearBdayInput,monthBday,dayBday);
  const BDyyyy = Bday.getFullYear().toString().padStart(4,"0");
  const karimm = parseInt(Bday.getMonth(),10)+1;
  const BDmm = karimm.toString().padStart(2,"0");
  const BDdd = Bday.getDate().toString().padStart(2,"0");
  getAge(BDyyyy,BDmm,BDdd);
  var warekiAndWarekiNen = getWareki(Bday);
    const m = parseInt(Bday.getMonth(),10)+1;
    document.getElementById("wareki").innerText = warekiAndWarekiNen + m + "月"　+ Bday.getDate() + "日";
    createAgeTable(BDyyyy,BDmm,BDdd)
}


function getWareki(targetDate){
  var wareki;
  var warekiNen;
  const Heisei = new Date(1989,0,8,0,0,0)
  const Reiwa = new Date(2019,4,1,0,0,0)
  if(targetDate < Heisei ){
    wareki="昭和";
    warekiNen = targetDate.getFullYear() - 1925;
  }else if(targetDate < Reiwa ){
    wareki="平成";
    warekiNen = parseInt(targetDate.getFullYear(),10) - 1988;
  }else if(targetDate >= Reiwa ){
    wareki="令和";
    warekiNen = parseInt(targetDate.getFullYear(),10) - 2018;
  }else{
    wareki="ダメでした"
  }
  var warekiAndWarekiNen = wareki + warekiNen + "年";
  return warekiAndWarekiNen;
}


function seirekiBD(yearType,yearBdayInput,monthBday,dayBday){
  var yearBday
  switch(yearType){
    case "西暦":
      yearBday=parseInt(yearBdayInput,10)
      break;
    case "昭和":
      yearBday=parseInt(yearBdayInput,10) + 1925
      break;
    case "平成":
      yearBday=parseInt(yearBdayInput,10) + 1988
      break;
    case "令和":
      yearBday=parseInt(yearBdayInput,10) + 2018
      break;
  }
  const Bday = new Date(yearBday,monthBday-1,dayBday);
  const m = parseInt(Bday.getMonth(),10)+1
  document.getElementById("seireki").innerText = Bday.getFullYear() + "/" + m + "/" + Bday.getDate()
  return Bday;
}


function getAge(BDyyyy,BDmm,BDdd){
  var today = new Date();
  const TDyyyy = today.getFullYear().toString().padStart(4,"0");
  var karimm = parseInt(today.getMonth(),10)+1;
  const TDmm = karimm.toString().padStart(2,"0");
  const TDdd = today.getDate().toString().padStart(2,"0");

  var age = Math.floor((Number(TDyyyy + TDmm + TDdd)-Number(BDyyyy+BDmm+BDdd))/10000);
  document.getElementById("age").innerText = age　+　"歳"
}


function createAgeTable(BDyyyy,BDmm,BDdd){
  deleteTableRow();
  for(let i = 0; i < 81; i++){
    var baseYear = parseInt(BDyyyy,10) + i;
    var baseDate = new Date(baseYear, 3, 1);
    let warekiAndWarekiNen = getWareki(baseDate);
    var BSyyyy = baseDate.getFullYear().toString().padStart(4,"0");
    var m = parseInt(baseDate.getMonth(),10)+1;
    var BSmm = m.toString().padStart(2,"0");
    var BSdd = baseDate.getDate().toString().padStart(2,"0")
    let age = Math.floor( (Number(BSyyyy+BSmm+BSdd) - Number(BDyyyy+BDmm+BDdd) ) / 10000 ); 

    let table = document.getElementById("ageTable");
    let newRow = table.insertRow();

    let newCell = newRow.insertCell();
    let newText = document.createTextNode(baseYear + "年");
    newCell.appendChild(newText)

    newCell = newRow.insertCell();
    newText = document.createTextNode(warekiAndWarekiNen);
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    newText = document.createTextNode(age);
    newCell.appendChild(newText);
     
    newCell = newRow.insertCell();
      switch (age) {
        case 6:
          newText = document.createTextNode('小学校入学');
          break;
        case 12:
          newText = document.createTextNode('中学校入学');
          break;
        case 15:
          newText = document.createTextNode('高校入学');
          break;
        case 18:
          newText = document.createTextNode('進学・就職');
          break;
        case 20:
          newText = document.createTextNode('専門短大卒');
          break;
        case 22:
          newText = document.createTextNode('大卒・就職');
          break;
        default:
          newText = document.createTextNode("");
          break;
      }
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    let yyyy = new Date()
    if(baseYear==yyyy.getFullYear()){
      newText = document.createTextNode("★");
    }else{
      newText = document.createTextNode("");
    }
    newCell.appendChild(newText);
  } 
}

function deleteTableRow() {
  var table = document.getElementById('ageTable');  //表のオブジェクトを取得
  var row_num = table.rows.length;    //表の行数を取得
  if (row_num>1) {
   //表に二行以上あるとき
    for(let i=row_num; i>= 2; i--){
      table.deleteRow(-1);   //末尾行を削除
    }
  }
}



function keydown(e){
  if (e.keyCode===13){
    var nextInput=document.activeElement.nextElementSibling.nextElementSibling;
    nextInput.focus();
  }
}
window.onkeydown=keydown;

let input = document.querySelector('input');
input.oninput = handleInput;
function handleInput(e) {
  var nextInput=document.activeElement.nextElementSibling.nextElementSibling;
  //nextInput.focus();
}