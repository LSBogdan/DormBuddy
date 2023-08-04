export async function createAnnouncement(body) {

    try {
        fetch(`http://localhost:8080/api/v1/announcement`, 
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

export async function updateAnnouncement(body) {

    const id = body.id;

    if (id) {
        try{
            fetch(`http://localhost:8080/api/v1/announcement/${id}`,
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
        try {
            const res = await fetch(`http://localhost:8080/api/v1/announcement/${id}`);
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
        const response = await fetch(`http://localhost:8080/api/v1/announcement/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          return await response.json(); 
        } else {
          throw new Error(`Delete Announcement failed with status ${response.status}`);
        }
      } catch (err) {
        return err;
      }
    }
  }
  
export async function getAllAnnouncements(page) {

    try{

        const res = await fetch(`http://localhost:8080/api/v1/announcement/all?page=${page}`);
        const data = await res.json();

        return data;
    } catch(err) {
        return err;
    }
}

export async function getAllAnnouncementsByUserId(id, page) {

    if(id) {
        try{
            const res = await fetch(`http://localhost:8080/api/v1/announcement/all/${id}?page=${page}`);
            const data = await res.json();
            
            return data;
        } catch(err) {
            return err;
        }
    }
}