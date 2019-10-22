// Selects elements for login 
let userDiv = document.querySelector(".user")
let userForm = document.querySelector("#username-form")

// Adds event listener for the login form sumbition 
userForm.addEventListener("submit", handleSubmit)
function handleSubmit(evt) {
    evt.preventDefault()
    let username = document.querySelector("#js-username").value 

    //posts to database
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

// definition of function called in fetch post
function makeRoutineOrb(routine){
    //creates and razzmatazz the the orb
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

    routineTitleSpan.addEventListener("click", (evt) => {
        makeAndDisplayModal(routine)
        
    })
    
    function makeAndDisplayModal(routine){
        let newTaskList = document.createElement("ul")
        let mainModalDiv = document.createElement("div")
        let contentModalDiv = document.createElement("div")
        let headerModalDiv = document.createElement("div")
        let bodyModalDiv = document.createElement("div")
        let footerModalDiv = document.createElement("div")
        let headerModalDivSpan = document.createElement("span")
    
        mainModalDiv.setAttribute("id", "taskModal")
        mainModalDiv.setAttribute("class", "modal")
        
        contentModalDiv.setAttribute("class", "modal-content")
        
    
        headerModalDiv.setAttribute("class", "modal-header")
        headerModalDivSpan.setAttribute("class", "close")
        headerModalDivSpan.innerText = 'x'

        headerModalDivSpan.onclick = () => {
            mainModalDiv.style.display = "none"
        } 

        headerModalDiv.innerHTML = `<h2> ${routine.title} </h2>`
        headerModalDiv.append(headerModalDivSpan)
    
        bodyModalDiv.setAttribute("class", "modal-body")
        routine.tasks.forEach((task) => {

            let newTaskItem = document.createElement("li")
            newTaskItem.setAttribute("data-id", `${task.id}`)
            newTaskItem.innerText = `${task.time } ${task.content}`
            newTaskList.append(newTaskItem)
            bodyModalDiv.append(newTaskList)
        })

    
    
        footerModalDiv.setAttribute("class", "modal-footer")
    
        contentModalDiv.append(headerModalDiv)
        contentModalDiv.append(bodyModalDiv)
        contentModalDiv.append(footerModalDiv)
    
        mainModalDiv.append(contentModalDiv)
        mainModalDiv.style.display = "block"

        routine.append(mainModalDiv)
    
        window.onclick = function(evt) {
            if (evt.target == mainModalDiv) {
              mainModalDiv.style.display = "none"
            }
        }
    
    }
    

}

