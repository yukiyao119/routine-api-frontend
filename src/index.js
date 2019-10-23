let userDiv = document.querySelector(".user")
let userForm = document.querySelector("#username-form")
const routinesDIV = document.querySelector(".routine-area")
const routineContainer = document.querySelector(".new-routine-container")
let addRoutine = false
const addRoutineBtn = document.querySelector("#new-routine-btn")

// user log in form submit event listener
userForm.addEventListener("submit", handleSubmit)
function handleSubmit(evt) {
    evt.preventDefault()
    let username = document.querySelector("#js-username").value 

    // fetch all routines from this user
    RoutineAdaptor.getAllRoutines(username)
    .then(user => {
        let userId = user.id 
        userForm.remove()

        user.routines.forEach((routine) => {
            makeRoutineOrb(routine)
        })

        // replace the user orb
        const orbFigure = document.querySelector("#username-figure")
        const orbLoggedName = document.createElement("span")
        orbLoggedName.id = "logged-name"
        orbLoggedName.setAttribute("style", "color:white")
        orbLoggedName.innerText = `${user.name}'s Routines`
        orbFigure.append(orbLoggedName)

        // Create the new routine form
        const routineForm = document.createElement("form")
        routineForm.id = "add-routine-form"

        const h3 = document.createElement("h3")
        h3.innerText = "Create a routine!"
        routineForm.append(h3)

        //Create array of options to be added
        let categoryArr = ["Health","Commute","Weekend","Other"]
        let titleArr = ["Early Riser","Gymrat","Productive Weekend","Commuter"]

        //Create and append select list
        let selectList = document.createElement("select");
        selectList.id = "mySelect";
        routineForm.appendChild(selectList);

        //Create and append category options
        for (let i = 0; i < categoryArr.length; i++) {
            let option = document.createElement("option");
            option.value = categoryArr[i];
            option.text = categoryArr[i];
            selectList.appendChild(option);
        }

        //Create and append select list
        let selectList2 = document.createElement("select");
        selectList2.id = "mySelect2";
        routineForm.appendChild(selectList2);

        //Create and append title options
        for (let i = 0; i < titleArr.length; i++) {
            let option = document.createElement("option");
            option.value = titleArr[i];
            option.text = titleArr[i];
            selectList2.appendChild(option);
        }

        //Create and append submit button
        const submitRoutineBtn = document.createElement('input')
        submitRoutineBtn.setAttribute("type", "submit")
        submitRoutineBtn.setAttribute("data-id", `${userId}`)
        submitRoutineBtn.setAttribute("value", "Submit")
        routineForm.append(submitRoutineBtn)
        routineContainer.append(routineForm)

        // routineContainer.style.display = 'none'
        addRoutineBtn.addEventListener('click', handleHideSeek)
        function handleHideSeek(evt) {
            // hide & seek with the form
            addRoutine = !addRoutine
            if (addRoutine) {
                routineContainer.style.display = 'block'
              // submit listener here
            } else {
                routineContainer.style.display = 'none'
            }
            
        }

        //  new routine form submit event listener
        routineForm.addEventListener("submit", (evt) => {
            evt.preventDefault()

            let newCategory = evt.target.mySelect.value
            let newTitle = evt.target.mySelect2.value

            RoutineAdaptor.createARoutine(newCategory, newTitle, userId)
            .then(createdRoutineObj => {
                makeRoutineOrb(createdRoutineObj)
            })

        })

    })
}

// definition of function called in fetch post
function makeRoutineOrb(routine){
    //creates and razzmatazz the the orb
    let stageId = routine.id
    const stage = document.createElement("section")
    stage.classList.add("stage")
    stage.setAttribute("data-id", `${stageId}`)

    
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

    orb.addEventListener("mousedown", (evt) => {
        let deleteId = evt.target.parentElement.dataset.id
        console.log(deleteId)

        
        this.downTimer = setTimeout(function() {
            fetch(`http://localhost:3000/routines/${deleteId}`, {
                 method: "DELETE"
            })
            // .then(res => res.json())
            // .then(data => {
            // })           
            orb.parentElement.remove()
        }, 3000)
        
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

        routinesDIV.append(mainModalDiv)
    
        window.onclick = function(evt) {
            if (evt.target == mainModalDiv) {
              mainModalDiv.style.display = "none"
            }
        }
    
    }
    

}

