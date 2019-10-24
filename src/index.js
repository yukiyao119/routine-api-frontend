let userDiv = document.querySelector(".user")
let userForm = document.querySelector("#username-form")
const routinesDIV = document.querySelector(".routine-area")
const routineContainer = document.querySelector(".new-routine-container")
let addRoutine = false 
const addRoutineBtn = document.querySelector("#new-routine-btn")
addRoutineBtn.style.display = "none"

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

        addRoutineBtn.style.display = "block"
        routineContainer.style.display = 'none'
        // hide & seek with the form
        addRoutineBtn.addEventListener('click', handleHideSeek)
        function handleHideSeek(evt) {
            addRoutine = !addRoutine
            if (addRoutine) {
                routineContainer.style.display = 'block'
            } else {
                routineContainer.style.display = 'none'
            }
        }

        /* new routine btn & form */
        function newRoutineBtnForm(userId) {
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

            /* CREATE A NEW ROUTINE */
            routineForm.addEventListener("submit", (evt) => {
                evt.preventDefault()

                let newCategory = evt.target.mySelect.value
                let newTitle = evt.target.mySelect2.value

                RoutineAdaptor.createARoutine(newCategory, newTitle, userId)
                .then(createdRoutineObj => {
                    makeRoutineOrb(createdRoutineObj)
                })
            })
        }
        newRoutineBtnForm(userId)

    })

    // definition of function called in fetch post
    function makeRoutineOrb(routine){
        //creates and razzmatazz the the orb
        let stageId = routine.id
        const stage = document.createElement("section")
        stage.classList.add("stage")
        stage.setAttribute("data-id", `${stageId}`)
    
        const orb = document.createElement("figure")
        orb.classList.add("orb")
        orb.classList.add("hvr-bob")
    
        const spanOrb = document.createElement("span")
        spanOrb.classList.add("shadow")
    
        const routineTitleSpan = document.createElement("span")
        routineTitleSpan.id = "routine-title"
        routineTitleSpan.setAttribute("style", "color:white")
        routineTitleSpan.innerText = `${routine.title}`
        
        orb.append(spanOrb)
        orb.append(routineTitleSpan)
        stage.append(orb)
        routinesDIV.append(stage)
    
        // Start hold to delete functionality 
            let timeStop 
            let delta
            let timeStart
            orb.addEventListener("mousedown", (evt) => {
                timeStart = new Date()
                orb.classList.add("animated")
                orb.classList.add("pulse")
            })
            orb.addEventListener("mouseup", (evt) => {
                let deleteId = evt.target.parentElement.dataset.id
                timeStop = new Date ()
                
                delta = (timeStop - timeStart) / 1000.0
                if (delta > 2){
                    fetch(`http://localhost:3000/routines/${deleteId}`, {
                         method: "DELETE"
                     }).then(deleted => {
                         if(deleted.ok){
                            orb.parentElement.remove()    
                         }
                        console.log("finally")
                     })     
                 }
            })
        // End hold to delete functionality
        
        routineTitleSpan.addEventListener("click", (evt) => {
            makeAndDisplayModal(routine)
        })
        // Create and Razzmatazz Main & Content Modal Div
        function makeAndDisplayModal(routine){

            // Create and Razzmatazz Main Modal Div
            let mainModalDiv = document.createElement("div")
            mainModalDiv.setAttribute("data-id", `${routine.id}`)
            mainModalDiv.setAttribute("class", "modal")
    
            // Create and Razzmatazz Content Modal Div
            let contentModalDiv = document.createElement("div")
            contentModalDiv.setAttribute("class", "modal-content")
            
            // Create and Razzmatazz Header Modal Div with span exit
            let headerModalDiv = document.createElement("div")
            let headerModalDivSpan = document.createElement("span")
            headerModalDiv.setAttribute("class", "modal-header")
            headerModalDivSpan.setAttribute("class", "close")
            headerModalDivSpan.innerText = 'xxx'
            
            headerModalDivSpan.onclick = () => {
                // mainModalDiv.style.display = "none"
                mainModalDiv.remove()
            } 
            
            headerModalDiv.innerHTML = `<h2> ${routine.title} </h2>`
            headerModalDiv.append(headerModalDivSpan)
            
            // Create, Razzmatazz, and Populate Body Modal Div 
            let bodyModalDiv = document.createElement("div")
            bodyModalDiv.setAttribute("class", "modal-body")
            let newTaskList = document.createElement("ul")
            newTaskList.setAttribute("data-id",`${routine.id}`)
            
            // Create and Razzmatazz Footer Modal Div
            let footerModalDiv = document.createElement("div")
            footerModalDiv.setAttribute("class", "modal-footer")
    
            // Create NewTask button to Footer Div
            const newTaskBtn = document.createElement("button")
            newTaskBtn.innerText = "Add a new Task"
            newTaskBtn.className = "js-new-task-btn"
            footerModalDiv.append(newTaskBtn)
    
            // Create form for add new Task
            const taskForm = document.createElement("form")
            taskForm.id = "add-task-form"
    
            const timeInput = document.createElement("input")
            timeInput.setAttribute('type',"text")
            timeInput.setAttribute("data-id", `${routine.id}`)
            timeInput.className = "js-time"
            timeInput.placeholder = "Eg: 6:00 PM"
            taskForm.append(timeInput)
    
            const contentInput = document.createElement("input")
            contentInput.setAttribute('type',"text")
            contentInput.setAttribute("data-id", `${routine.id}`)
            contentInput.className = "js-content"
            contentInput.placeholder = "Eg: Hit the gym"
            taskForm.append(contentInput)
    
            const submitTaskBtn = document.createElement('input')
            submitTaskBtn.setAttribute("type", "submit")
            submitTaskBtn.setAttribute("data-id", `${routine.id}`)
            submitTaskBtn.setAttribute("value", "Submit")
            taskForm.append(submitTaskBtn)
    
            const lineBreak = document.createElement("br")
            submitTaskBtn.append(lineBreak)
            submitTaskBtn.append(lineBreak)
            taskForm.append(lineBreak)
    
            footerModalDiv.prepend(taskForm)
            taskForm.style.display = "none"
    
            newTaskBtn.onclick = () => {
                taskForm.style.display = "block"
            } 
    
            /* CREATE A NEW TASK */
            taskForm.addEventListener("submit", addNewTask)
            function addNewTask(evt) { 
                evt.preventDefault()
                let contentInput = evt.target.querySelector(".js-content").value
                let timeInput = evt.target.querySelector(".js-time").value
                let doneOrigin = false
                
                TaskAdaptor.createATask(routine, timeInput, contentInput, doneOrigin)
                .then((createdTaskObj) => {
                    displayOneTask(createdTaskObj)
                    // debugger
                })
                
            }
            
            // Append created elements to Content Modal Div
            contentModalDiv.append(headerModalDiv)
            contentModalDiv.append(bodyModalDiv)
            contentModalDiv.append(footerModalDiv)
    
            // Append content div to main div and style
            mainModalDiv.append(contentModalDiv)
            mainModalDiv.style.display = "block"
    
            // Append main modial div to the routine area div 
            stage.append(mainModalDiv)
    
            // Event listener to exit modal without clicking 'x'
            window.onclick = function(evt) {
                if (evt.target == mainModalDiv) {
                    // mainModalDiv.style.display = "none"
                    mainModalDiv.remove()
                }
            }
    
            /* GET ALL TASKS BELONGS TO THIS ROUTINE */
            fetch(`http://localhost:3000/routines/${routine.id}`)
            .then(res => res.json())
            .then(routineObj => {
                // debugger
                routineObj.tasks.forEach(displayOneTask)
            })

            /* DISPLAY THIS ROUTINE'S TASKS */
            function displayOneTask(task) {
                // // create LI item
                let newTaskItem = document.createElement("li")
                newTaskItem.className = `item ${task.done ? "done" : ""}`
                // let newTaskItem = document.createElement("li")
                newTaskItem.setAttribute("data-id", `${task.id}`)
                newTaskItem.innerText = `${task.time } ${task.content} ${task.done}`
                
                // create task edit btn
                let editTaskBtn = document.createElement("button")
                editTaskBtn.setAttribute("data-id", `${task.id}`)
                editTaskBtn.innerText = "Edit"
                newTaskItem.append(editTaskBtn)
            
                // create task delete btn
                let deleteTaskBtn = document.createElement("button")
                deleteTaskBtn.setAttribute("data-id", `${task.id}`)
                deleteTaskBtn.innerText = "Delete"
                newTaskItem.append(deleteTaskBtn)

                // create task checkbox
                let taskCheckbox = document.createElement("input")
                taskCheckbox.type = "checkbox"
                taskCheckbox.id = "scale"
                taskCheckbox.names = "scales"
                taskCheckbox.setAttribute("data-id", `${task.id}`)
                newTaskItem.append(taskCheckbox)
            
                newTaskList.append(newTaskItem)
                bodyModalDiv.append(newTaskList)


                /* EDIT/UPDATE CHECKBOX */
                newTaskItem.addEventListener("click", updateCheckbox)
                function updateCheckbox(evt) {
                    console.log(evt.target);
                    if (evt.target.matches("[type='checkbox']")){
                        let whatCheckedValueBecomesBool = evt.target.checked
                        let id = evt.target.dataset.id
                        // debugger
                        fetch(`http://localhost:3000/tasks/${task.id}`, {
                            method: 'PATCH',
                            body: JSON.stringify({
                                done: whatCheckedValueBecomesBool
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                            })
                            .then(r => r.json())
                            .then(updatedTaskJSON => {
                                if (updatedTaskJSON.done === true) {
                                    debugger
                                    evt.target.parentElement.classList.add("done")
                                } else {
                                    evt.target.parentElement.classList.remove("done")
                                }
                            })
                    } 
                }
            

                /* DELETE A TASK */
                deleteTaskBtn.addEventListener("click", handleDelete)
                function handleDelete(evt) {
                    let deletingTaskId = evt.target.dataset.id
            
                    fetch(`http://localhost:3000/tasks/${deletingTaskId}`,{
                        method: 'DELETE'
                    }).then(res => {
                        if(res.ok){
                            // debugger
                            newTaskItem.remove()
                        }
                    })
                }
            
                // Create edit form for a Task
                const editForm = document.createElement("form")
                editForm.id = "edit-task-form"
                editForm.setAttribute("data-id", `${task.id}`)
            
                const editTimeInput = document.createElement("input")
                editTimeInput.setAttribute('type',"text")
                editTimeInput.className = "js-edit-time"
                editTimeInput.placeholder = "Eg: 6:00 PM"
                editForm.append(editTimeInput)
            
                const editContentInput = document.createElement("input")
                editContentInput.setAttribute('type',"text")
                editContentInput.className = "js-edit-content"
                editContentInput.placeholder = "Eg: Hit the gym"
                editForm.append(editContentInput)
            
                const submitTaskBtn = document.createElement('input')
                submitTaskBtn.setAttribute("type", "submit")
                submitTaskBtn.setAttribute("value", "Submit")
                editForm.append(submitTaskBtn)
            
                const lineBreak = document.createElement("br")
                submitTaskBtn.append(lineBreak)
                submitTaskBtn.append(lineBreak)
                editForm.append(lineBreak)
            
                newTaskItem.prepend(editForm)
                editForm.style.display = "none"
            
                editTaskBtn.onclick = () => {
                    editForm.style.display = "block"
                } 
            
                /* EDIT A TASK */
                editForm.addEventListener("submit", handleEdit)
                function handleEdit(evt) {
                    evt.preventDefault()
                    let newTime = evt.target.querySelector(".js-edit-time").value
                    let newContent = evt.target.querySelector(".js-edit-content").value
                    let thisTaskId = evt.target.dataset.id
                    let doneOrigin = false

                    let removingModal = evt.target.parentElement.parentElement.parentElement
                    // debugger
            
                    fetch(`http://localhost:3000/tasks/${thisTaskId}`, {
                        method: 'PATCH',
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            time: newTime,
                            content: newContent,
                        })
                    })
                    .then(res => res.json())
                    .then((updatedTaskObj) => {
                        mainModalDiv.remove()
                        makeAndDisplayModal(updatedTaskObj.routine)
                    })
                }


            
            
            }
            
        }  
        
    
    }

}



