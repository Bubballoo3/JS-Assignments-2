var boardpieces=document.querySelectorAll("button.boardpiece");
const possiblelines=[["b1","b2","b3"],["b4","b5","b6"],["b7","b8","b9"],
                    ["b1","b4","b7"],["b2","b5","b8"],["b3","b6","b9"],
                    ["b1","b5","b9"],["b3","b5","b7"]]
var xmove=true;
console.log(boardpieces);
var players=1;

for (var piece of boardpieces) {
    piece.addEventListener("click", function (e) {
        var value=e.target.getAttribute("id");
        console.log(e.target.parentElement.getAttribute("id"));
        console.log("working")
        if (xmove) {
            e.target.parentElement.innerHTML="<img class=\"boardpiece\" src=\"xIcon.png\">"
            xmove=false
        }
        else if (players == 2){
            e.target.parentElement.innerHTML="<img class=\"boardpiece\" src=\"oIcon.png\">"
            xmove=true
        }
    });
}

function checkWin(madeMoves){

}