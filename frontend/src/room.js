export async function getRoomById(id) {

    if (id) {
        try{
            const res = await fetch(`http://localhost:8080/api/v1/room/${id}`);
            const data = await res.json();

            return data;
        } catch (err) {
            return err;
        }
    }
}