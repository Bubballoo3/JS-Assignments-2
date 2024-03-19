const circles=document.querySelectorAll("div.circle");
const labels=document.querySelectorAll(".alt")
const OkMoves=["rock","paper","scissors"]
const maxlength=5
var playermoves=[]
var computermoves=[]
var compwins=0
var playwins=0





for (let i=0; i<circles.length; i++) {
circles[i].addEventListener('click', (e) => {
    currentTarget=e.target
    while  (!(OkMoves.includes(currentTarget.id))) {
        currentTarget=currentTarget.parentElement
    }
    currentmove=currentTarget.id
    makeUserMove(currentmove)
    cmove=makeComputerMove()
    checkMove(currentmove,cmove)
    
})
circles[i].addEventListener('mousedown', (e) => {
e.target.style.filter= "brightness(85%)"
})

circles[i].addEventListener('mouseup', (e) => {
e.target.style.filter= "brightness(100%)"
})
}
for (let i=0; i<labels.length; i++) {
    labels[i].addEventListener('click', (e) => {
    console.log(e.target.parentElement)}) // end click event listener;
    
    labels[i].addEventListener('mousedown', (e) => {
    e.target.parentElement.style.filter= "brightness(85%)"
    })
    
    labels[i].addEventListener('mouseup', (e) => {
    e.target.parentElement.style.filter= "brightness(100%)"
    })
    }

function makeUserMove(currentmove) {
    if (currentmove=="scissors") {
        imgfile="userScissors.png"
    }
    else {
        imgfile=currentmove+".png"
    }
    if (playermoves.length==maxlength) {
        playermoves.shift();
    }
    playermoves.push("<img src=\""+imgfile+"\">")

}
    
function makeComputerMove() {
    index=getRandomInt(3);
    move=OkMoves[index]
    imgfile=move+".png"
    if (computermoves.length == maxlength) {
        computermoves.shift();
    }
    computermoves.push("<img src=\""+imgfile+"\">")
    return index
}

function checkMove(playermove,computermove) {
    pindex=OkMoves.indexOf(playermove)
    cindex=computermove;
    if ((pindex+1)%3 == cindex){
        console.log("computer won");
        winningmove=computermoves.pop();
        colormove=winningmove.replace(">","class=\"bg-success\">");
        computermoves.push(colormove);
        console.log(computermoves);
        compwins+=1
    }
    else if ((cindex+1)%3 == pindex) {
        console.log("player won");
        winningmove=playermoves.pop();
        colormove=winningmove.replace(">","class=\"bg-success\">");
        playermoves.push(colormove);
        playwins+=1
    }
    else {
        console.log("tie");
        computermove=computermoves.pop();
        colormove=computermove.replace(">","class=\"bg-warning\">");
        computermoves.push(colormove);
        playermove=playermoves.pop();
        colormove=playermove.replace(">","class=\"bg-warning\">");
        playermoves.push(colormove);
    }
    //display moves
    cspot=document.getElementById("computer");
    chypertext=""
    for (var move of computermoves) {
        chypertext+=move
    }
    cspot.innerHTML=chypertext;

    pspot=document.getElementById("player");
    phypertext="";
    for (var move of playermoves) {
        phypertext+=move
    }
    pspot.innerHTML=phypertext;

    //display record
    recordplace=document.getElementById("record");
    recordplace.innerHTML=String(playwins)+"-"+String(compwins)
}

function reset() {
    document.getElementById("computer").innerHTML= "<span style=\"font-size: larger;\">Make a move to play!</span>";
    document.getElementById("player").innerHTML="";
    document.getElementById("record").innerHTML="0-0"
    playermoves=[]
    computermoves=[]
    compwins=0
    playwins=0
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
