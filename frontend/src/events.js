export async function createEvent(body) {
    
    try{
        fetch(`http://localhost:8080/api/v1/event`, 
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

export async function updateEvent(body) {
    
    const id = body.id;

    if (id) {
        try{
            fetch(`http://localhost:8080/api/v1/event/${id}`,
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
            
            const res = await fetch(`http://localhost:8080/api/v1/event/${id}`);
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
           const response = await fetch(`http://localhost:8080/api/v1/event/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          return await response.json(); 
        } else {
          throw new Error(`Delete event failed with status ${response.status}`);
        }
      } catch (err) {
        return err;
      }
    }
}

export async function getAllEvents(page) {

    try {
        const res = await fetch(`http://localhost:8080/api/v1/event/all?page=${page}`);
        const data = await res.json();

        return data;
    } catch (err) {
        return err;
    }
}


export async function getAllEventsFilterById(id, page) {

    if (id) {
        try {
            const res = await fetch(`http://localhost:8080/api/v1/event/all/${id}?filterBy=userId`)
            const data = await res.json();

            return data;
        } catch(err) {
            return err;
        }
    }
}