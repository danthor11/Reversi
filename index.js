/**
 * 
 * @author {Daniel Porras} 
 * 
 */

import { options } from "./setting.js";
import { Stage } from "./stage.js";


const stage = new Stage(options.mood),
    $restartBtn = document.getElementById("restart"),
    $settingsBtn = document.getElementById("settings");


$restartBtn.addEventListener("click",e => {
    stage.newGame(options.mood)
})

$settingsBtn.addEventListener("click", e=> {
    options.$form.parentNode.classList.add("active")
    options.$form.parentNode.style.zIndex="100"

})

document.onmousedown = function(){
    return false;
}


