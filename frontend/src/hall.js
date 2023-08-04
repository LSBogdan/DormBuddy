export async function createHall(body) {

    try{
        fetch(`http://localhost:8080/api/v1/hall`,
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

export async function updateHall(body) {

    const id = body.id;

    if (id) {
        try{
            fetch(`http://localhost:8080/api/v1/hall/${id}`,
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

export async function getHallById(id) {
    if (id) {
        try {
            const res = await fetch(`http://localhost:8080/api/v1/hall/${id}`);
            const data = await res.json();
            
            return data;

        } catch (err) {
            return err;
        }
    }
}


export async function getHallByNumber(id) {

    if (id) {
        try {
            const res = await fetch(`http://localhost:8080/api/v1/hall/hallNumber/${id}`);
            const data = await res.json();
            
            return data;

        } catch (err) {
            return err;
        }
    }
}

export async function deleteHallById(id) {

    if (id) {
        try {
          fetch(`http://localhost:8080/api/v1/hall/${id} `, {
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

export async function getAllHalls(page) {

    try{

        const res = await fetch(`http://localhost:8080/api/v1/hall/all?page=${page}`);
        const data = await res.json();

        return data;
    } catch(err) {
        return err;
    }
}

export async function getAllHallsByFloorPaginated(id, page) {

    try{

        const res = await fetch(`http://localhost:8080/api/v1/hall/all/floor/paginated/${id}?page=${page}`)
        const data = await res.json();

        return data;
    } catch (err) {
        return err;
    }
}

export async function getAllHallsByFloor(id) {
    try{

        const res = await fetch(`http://localhost:8080/api/v1/hall/all/floor/${id}`)
        const data = await res.json();

        return data;
    } catch (err) {
        return err;
    }
}
