// const URL = http://localhost:3000/login

class RoutineAdaptor {
    
    static getAllRoutines(username){
        return  fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: username
            })
        }).then(res => res.json())
    }

    static createARoutine(newCategory, newTitle, userId){
        return  fetch("http://localhost:3000/routines", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                category: newCategory,
                title: newTitle,
                user_id: userId
            })
        }).then(res => res.json())
      }

    

}