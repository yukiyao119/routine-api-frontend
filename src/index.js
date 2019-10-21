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
    stage.setAttribute("id", "login")
    
    const spanOrb = document.createElement("span")
    spanOrb.classList.add("shadow")
    
    const orb = document.createElement("figure")
    const nameInput = document.createElement("input")
    nameInput.autocomplete = "off"
    const userForm = document.createElement("form")
    userForm.append(nameInput)
    nameInput.classList.add("user-name")
    // nameInput.setAttribute("id", "username")
    nameInput.id = "js-username"
    nameInput.placeholder = "Enter Username"

    orb.classList.add("orb")
    orb.classList.add("hvr-bob")

    orb.append(spanOrb)
    orb.append(userForm)
    
    stage.append(orb)
    userDiv.append(stage)



    
    userForm.addEventListener("submit", (evt) => {
        evt.preventDefault()
        let username = document.querySelector("#js-username").value 
        console.log(username)
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: username
            })
        }).then(res => res.json()).then(user => {
            console.log(user)
            makeUserOrb(user)
            
            user.routines.forEach((routine) => {
                makeRoutineOrb(routine)
            })  
      })
  })
}


function makeUserOrb(user){
    const loginOrb = document.querySelector("#login")
    loginOrb.remove()

    const stage = document.createElement("section")
    stage.classList.add("stage")
    
    const spanOrb = document.createElement("span")
    spanOrb.classList.add("shadow")

    const orbRoutineTitle = document.createElement("span")
    orbRoutineTitle.id = "routine-title"
    orbRoutineTitle.setAttribute("style", "color:white")
    
    const orb = document.createElement("figure")
    orb.classList.add("orb")
    orb.classList.add("hvr-bob")
    orb.append(spanOrb)
    orb.append(orbRoutineTitle)
    orbRoutineTitle.innerText = `${user.name}'s Routines`

    stage.append(orb)
    userDiv.append(stage)

}

function makeRoutineOrb(routine){
    const stage = document.createElement("section")
    stage.classList.add("stage")
    
    const spanOrb = document.createElement("span")
    spanOrb.classList.add("shadow")

    const orbRoutineTitle = document.createElement("span")
    orbRoutineTitle.id = "routine-title"
    orbRoutineTitle.setAttribute("style", "color:white")
    
    const orb = document.createElement("figure")
    orb.classList.add("orb")
    orb.classList.add("hvr-bob")
    orb.append(spanOrb)
    orb.append(orbRoutineTitle)
    orbRoutineTitle.innerText = `${routine.title}`

    stage.append(orb)
    userDiv.append(stage)

}