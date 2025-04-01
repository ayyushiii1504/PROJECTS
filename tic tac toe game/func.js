let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");

let turn = true;
let win = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [3, 4, 5], [6, 7, 8]];
const resetGame=()=>{
    turn=true;
    for(let b of boxes){
        b.disabled = false;
        b.innerText="";
        reset.innerText="Reset Button"
    }
    
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn) {
            box.innerHTML = "O";
            turn = false;
        }
        else {
            box.innerText = "X";
            turn = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of win) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                alert("Player " +pos1+ " wins");
                for(let b of boxes){
                    b.disabled = true;
                }
                reset.innerText="New Game";
            }
        }
    }
}

reset.addEventListener("click",resetGame);