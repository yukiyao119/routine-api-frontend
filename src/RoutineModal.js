class RoutineModal {
    constructor(routine){
        this.id = routine.id
        this.category = routine.category
        this.title = routine.title
        this.user_id = routine.user_id
    }

    render(){
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
        routineTitleSpan.innerText = `${this.title}`
    
        stage.append(orb)
        routinesDIV.append(stage)
        
    }

    // handlePopup = (evt){

    // }
}
