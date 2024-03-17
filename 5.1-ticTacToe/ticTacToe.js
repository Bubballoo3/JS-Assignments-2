var boardpieces=document.querySelectorAll("button.boardpiece");
var result=document.getElementById("result")
const allpieces=["b1","b2","b3","b4","b5","b6","b7","b8","b9"];
const possiblelines=[["b1","b2","b3"],["b4","b5","b6"],["b7","b8","b9"],
                    ["b1","b4","b7"],["b2","b5","b8"],["b3","b6","b9"],
                    ["b1","b5","b9"],["b3","b5","b7"]]
var madeMoves = new Map();
var xmove=true;
var players=0;

document.addEventListener("click",function(e) {
    if (players == 0) {
        players=document.querySelector('input[name="players"]:checked').value;
    }
    console.log(players)
})

function activateboard() {
for (var piece of boardpieces) {
    piece.addEventListener("click", function (e) {
        if (players != 0) {
        var position=e.target.parentElement.getAttribute("id");
        //console.log(e.target.parentElement.getAttribute("id"));
        if (xmove) {
            e.target.parentElement.innerHTML="<img class=\"boardpiece\" src=\"xIcon.png\">"
            madeMoves.set(position,1)
            var result=checkWin(madeMoves)
            xmove=false
            if (result[0] == true) {
                endGame(result[1],result[2])
            }
            else if (players==1) {
                computerMove(madeMoves)
                result=checkWin(madeMoves)
                if (result[0]==true) {
                    endGame(result[1],result[2])
                }
                xmove=true
            }
        }
        else if (players == 2){
            e.target.parentElement.innerHTML="<img class=\"boardpiece\" src=\"oIcon.png\">"
            madeMoves.set(position,2)
            var result=checkWin(madeMoves)
            if (result[0] == true) {
                endGame(result[1],result[2])
            }
            else {
                xmove=true
            }
        }
    }
    });
}}
activateboard()

function computerMove(madeMoves) {
    var num=getRandomInt(9);
    id=allpieces[num];
    while (madeMoves.get(id) > 0) {
        var num=getRandomInt(9);
        id=allpieces[num];
    }
    document.getElementById(id).innerHTML="<img class=\"boardpiece\" src=\"oIcon.png\">"
    madeMoves.set(id,2)
    console.log(madeMoves)
}

function checkWin(madeMoves){
    var isWin=false;
    var winner="none";
    var winningCombo=[];
    for (var line of possiblelines) {
        var linevalues=[];
        var linepieces=[];
        for (var piece of line) {
            linepieces.push(piece)
            linevalues.push(madeMoves.get(piece))
        }
        //console.log(linepieces);
        //console.log(linevalues);
        if (arrayEquals(linevalues,[1,1,1])) {
            isWin=true;
            winner="X"
            winningCombo=linepieces;
        }
        else if (arrayEquals(linevalues,[2,2,2])) {
            isWin=true;
            winner="O"
            winningCombo=linepieces
        }
        //console.log("winCode: ",winningCombo)
    }
    return [isWin,winner,winningCombo];
}

function endGame(winner, winCode) {
    var message="";
    if ((players == 1) && (winner == "X")) {
        message="Congratulations player, you win!"
    }
    else if ((players == 1) && (winner == "O")) {
        message="Oh no! You lose"
    }
    else if ((players == 2) && (winner == "X")) {
        message="X's win! Congratulations"
    }
    else if ((players == 2) && (winner == "O")) {
        message="O's had it all game long. Nice job!"
    }
    result.innerHTML=message+"   <button type=\"button\" class=\"playagain\" onclick=\"reset()\"> Reset </button>"
    for (var position of winCode) {
        piece=document.getElementById(position);
        piece.children[0].classList=["winpiece"]
        //if (piece.innerHTML.includes("x")){
        //    piece.innerHTML="<img class=\"boardpiece winpiece\" src=\"oIcon.png\">"
        //}
    }
}
function reset() {
    for (var id of allpieces) {
        piece=document.getElementById(id)
        piece.innerHTML="<button type=\"button\" class=\"boardpiece\"></button>"
    }
    madeMoves.clear()
    result.innerHTML=""
    players=0
    xmove=true
    boardpieces=document.querySelectorAll("button.boardpiece")
    activateboard()
}




function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }