
let userDiv = document.querySelector(".user")
let userForm = document.querySelector("#username-form")

userForm.addEventListener("submit", handleSubmit)
function handleSubmit(evt) {
    evt.preventDefault()
    let username = document.querySelector("#js-username").value 

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: username
        })
    }).then(res => res.json())
    .then(user => {
        userForm.remove()

        const orbFigure = document.querySelector("#username-figure")
        const orbLoggedName = document.createElement("span")
        orbLoggedName.id = "logged-name"
        orbLoggedName.setAttribute("style", "color:white")
        orbLoggedName.innerText = `${user.name}'s Routines`
        orbFigure.append(orbLoggedName)

        user.routines.forEach((routine) => {
            makeRoutineOrb(routine)
        })
    })
}

function makeRoutineOrb(routine){
    const stage = document.createElement("section")
    stage.classList.add("stage")
    
    const spanOrb = document.createElement("span")
    spanOrb.classList.add("shadow")

    const routineTitleSpan = document.createElement("span")
    routineTitleSpan.id = "routine-title"
    routineTitleSpan.setAttribute("style", "color:white")
    
    const orb = document.createElement("figure")
    orb.classList.add("orb")
    orb.classList.add("hvr-bob")
    orb.append(spanOrb)
    orb.append(routineTitleSpan)
    routineTitleSpan.innerText = `${routine.title}`

    stage.append(orb)
    userDiv.append(stage)
    
    // routineTitleSpan.addEventListener("click")
}