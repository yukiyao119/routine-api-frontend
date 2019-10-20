// just to edit 
let userDiv = document.querySelector(".user")
console.log(userDiv)

pageLoad()

function pageLoad(){
    makeOrb()
}

function makeOrb(){
    const stage = document.createElement("section")
    stage.classList.add("stage")
    
    const spanOrb = document.createElement("span")
    spanOrb.classList.add("shadow")
    
    const orb = document.createElement("figure")
    orb.classList.add("orb")
    orb.append(spanOrb)
    
    stage.append(orb)
    userDiv.append(stage)
    
}