// const URL = http://localhost:3000/tasks

class TaskAdaptor {
    
    static createATask(routine, timeInput, contentInput, doneOrigin){
        return  fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                routine_id: `${routine.id}`,
                time: timeInput,
                content: contentInput,
                done: doneOrigin
            })
        }).then(res => res.json())
    }

    

}