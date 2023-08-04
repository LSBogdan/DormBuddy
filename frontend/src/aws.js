export async function deletePhotoFromBucket(name) {

  try{
    const response = await fetch(`http://localhost:8080/api/v1/s3/${name}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addPhotoToBucket(name, photo) {
         
    try {
      const formData = new FormData();
      formData.append('file', photo);
  
      const response = await fetch(`http://localhost:8080/api/v1/s3/objects/${name}/${name}.png`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Photo added to bucket successfully');
      } else {
        throw new Error('Failed to add photo to bucket');
      }
    } catch (error) {
      console.log(error);
    }
  }

export async function getAllRoomPhotos(name) {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/s3/all/${name}`);
    const urlList = await res.json(); 

    if (Array.isArray(urlList)) {
      return urlList; 
    } else {
      throw new Error('Invalid response from the server');
    }
  } catch (err) {
    return err;
  }
}
  
  export async function getProfilePhoto(email) {
    
    const res = await fetch(`http://localhost:8080/api/v1/s3/${email}.png`);
   
    if (res.ok) {
      const url = await res.text();
      return url;
    }
    throw new Error('Failed to fetch profile photo');
 
}
