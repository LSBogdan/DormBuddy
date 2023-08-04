export async function createUser(body) {

    try {
        fetch(`http://localhost:8080/api/v1/user`, 
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

export async function updateUser(body) {

    const id = body.id;

    if (id) {
        try{
            fetch(`http://localhost:8080/api/v1/user/${id}`,
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


export async function getUserById(id) {

    if (id) {
        try {
            const res = await fetch(`http://localhost:8080/api/v1/user/id/${id}`);
            const data = await res.json();
            
            return data;

        } catch (err) {
            return err;
        }
    }
}

export async function getUserByEmail(email) {

    if (email) {
        try{
            const res = await fetch(`http://localhost:8080/api/v1/user/email=${email}`);
            const data = await res.json();

            return data;
        } catch (err) {
            return err;
        }
    }
}

export async function getAllStudents(page) {
    
    try {
        const res = await fetch(`http://localhost:8080/api/v1/user/all/students?page=${page}`);
        const data = await res.json();

        return data;
    } catch (err) {
        return err;
    }
}

export async function getAllEmployes(page) {
    
    try {
        const res = await fetch(`http://localhost:8080/api/v1/user/all/employes?page=${page}`);
        const data = await res.json();

        return data;
    } catch (err) {
        return err;
    }
}