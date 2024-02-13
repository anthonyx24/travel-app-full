import auth from '@react-native-firebase/auth';

const createPlace = async (placeData, tripId) => {
  try{
    const idToken = await auth().currentUser.getIdToken();
    const response = await fetch(`http://localhost:8080/trips/${tripId}/places`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: placeData, 
    });

    if (!response.ok) {
      throw new Error('HTTP error: Status code ' + response.status);
    }

    return;

  }catch(error){
    console.error("Error creating new place:", error);
    throw error;
  }
};

const getAllPlaces = async (tripId) => {
  try{
    const idToken = await auth().currentUser.getIdToken();
    const response = await fetch(`http://localhost:8080/trips/${tripId}/places`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('HTTP error: Status code ' + response.status);
    }

    const responseData = await response.json();
    return responseData;

  }catch(error){
    console.error("Error getting places:", error);
    throw error;
  }
}

const getPlace = async (tripId, placeId) => {
  try{
    const idToken = await auth().currentUser.getIdToken();
    const response = await fetch(`http://localhost:8080/trips/${tripId}/places/${placeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('HTTP error: Status code ' + response.status);
    }

    const responseData = await response.json();
    return responseData;

  }catch(error){
    console.error("Error getting place:", error);
    throw error;
  }
}



export default {
  createPlace,
  getAllPlaces,
  getPlace,
  // Export other auth functions...
}
