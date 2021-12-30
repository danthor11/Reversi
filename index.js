import { Stage } from "./stage.js";

const stage = new Stage(),
    $restartBtn = document.getElementById("restart");


$restartBtn.addEventListener("click",e => {
    stage.newGame()
})

document.onmousedown = function()
     {
          return false;
     }


