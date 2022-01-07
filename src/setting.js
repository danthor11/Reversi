import { Stage } from "./stage.js";

const $form = document.querySelector(".form-settings"),
    $pc = document.querySelector("[name='pc']"),
    $multiplayer = document.querySelector("[name='multiplayer']");

let mood=true;

export let options = {
    $form,
    $pc,
    $multiplayer,
    mood,
    stage
}

$form.addEventListener("submit",e=> {
    e.preventDefault()
    if(e.target.multiplayer.checked){
        mood=true
        options.stage.newGame(mood)
    }
    else if(e.target.pc.checked){
        mood=false
        options.stage.newGame(mood)
    }
    else 
        return
    $form.parentNode.classList.remove("active")
    $form.parentNode.style.zIndex="-100"
})

document.addEventListener("change",e =>{
    if(e.target===$pc){
        if(e.target.checked)
            $multiplayer.disabled=true
        else
            $multiplayer.disabled=false
    }
    else if( e.target===$multiplayer){
        if(e.target.checked)
            $pc.disabled=true
        else
            $pc.disabled=false
    }
})