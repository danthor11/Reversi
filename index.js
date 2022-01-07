/**
 * 
 * @author {Daniel Porras} 
 * 
 */

import { options } from "./src/setting.js";
import { Stage } from "./src/stage.js";


const $restartBtn = document.getElementById("restart"),
    $settingsBtn = document.getElementById("settings");

options.stage = new Stage(options.mood)

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


