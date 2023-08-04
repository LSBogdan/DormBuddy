export async function createEventComment(body) {

    try{
        fetch(`http://localhost:8080/api/v1/eventComment`, 
        {
            method: "POST", 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((response) => {
            response.json();

            return JSON.stringify(response);
        });
    } catch (err) {
        return err;
        }
}

export async function updateEventComment(body) {
    
    const id = body.id;

    if (id) {
        try{
            fetch(`http://localhost:8080/api/v1/eventComment/${id}`,
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify(body),
            }).then((response) => {
                response.json();

                return JSON.stringify(response);
            });
        } catch (err) {
            return err;
        }
    }    
}


export async function getEventById(id) {

    if (id) {
        try{
            const res = await fetch(`http://localhost:8080/api/v1/eventComment/${id}`);
            const data = await res.json();
            
            return data;

        } catch (err) {
            return err;
        }
    }
}

export async function deleteEvent(id) {

    if (id) {
        try {
            fetch(`http://localhost:8080/api/v1/eventComment/${id}`, {
                method: "DELETE",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }).then((response) => {
                response.json();
                return JSON.stringify(response);
              });
            } catch (err) {
              return err;
            }
        }
}


export async function getAllEventComments(eventId) {

    console.log(eventId);
    if(eventId){
        try {
            const res = await fetch(`http://localhost:8080/api/v1/eventComment/all/${eventId}`);
            const data = await res.json();

            console.log(data);

            return data;
        } catch (err) {
            return err;
        }
    }
}