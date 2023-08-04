export async function createAnnouncementComment(body) {

    try{
        fetch(`http://localhost:8080/api/v1/announcementcomment`, 
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

export async function updateAnnouncementComment(body) {
    
    const id = body.id;

    if (id) {
        try{
            fetch(`http://localhost:8080/api/v1/announcementComment/${id}`,
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


export async function getAnnouncementById(id) {

    if (id) {
        try{
            const res = await fetch(`http://localhost:8080/api/v1/announcementComment/${id}`);
            const data = await res.json();
            
            return data;

        } catch (err) {
            return err;
        }
    }
}

export async function deleteAnnouncement(id) {

    if (id) {
        try {
            fetch(`http://localhost:8080/api/v1/announcementComment/${id}`, {
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


export async function getAllAnnouncementComments(announcementId) {

    console.log(announcementId);
    if(announcementId){
        try {
            const res = await fetch(`http://localhost:8080/api/v1/announcementcomment/all/${announcementId}`);
            const data = await res.json();

            console.log(data);

            return data;
        } catch (err) {
            return err;
        }
    }
}