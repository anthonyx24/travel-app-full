import auth from '@react-native-firebase/auth';

const createTrip = async (tripData) => {
  try{
    const idToken = await auth().currentUser.getIdToken();
    const response = await fetch('http://localhost:8080/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: tripData, 
    });

    if (!response.ok) {
      throw new Error('Error creating trip!');
    }

    return;

  }catch(error){
    console.error("Error creating trip:", error);
    throw error;
  }
};

const getAllTrips = async () => {
  try{
    const idToken = await auth().currentUser.getIdToken();
    const response = await fetch('http://localhost:8080/trips', {
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
    console.error("Error getting all trips:", error);
    throw error;
  }
}

const getTrip = async (tripId) => {
  try{
    const idToken = await auth().currentUser.getIdToken();
    const response = await fetch(`http://localhost:8080/trips/${tripId}`, {
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
    console.error("Error getting trip:", error);
    throw error;
  }
}

const deleteTrip = async (tripId) => {
  try{
    const idToken = await auth().currentUser.getIdToken();
    const response = await fetch(`http://localhost:8080/trips/${tripId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('HTTP error: Status code ' + response.status);
    }

    return;

  }catch(error){
    console.error(error);
    throw error;
  }
}



export default {
  createTrip,
  getAllTrips,
  getTrip,
  deleteTrip,
  // Export other auth functions...
}
