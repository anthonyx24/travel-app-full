import auth from '@react-native-firebase/auth';

const createTrip = async (tripData) => {
  try{
    const idToken = await auth().currentUser.getIdToken();
    const response = await fetch('http://localhost:8080/trips/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: tripData, 
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    return;

  }catch(error){
    console.error(error);
    throw error;
  }
};

const getAllTrips = async () => {
  try{
    const idToken = await auth().currentUser.getIdToken();
    const response = await fetch('http://localhost:8080/trips/getAll', {
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
    console.error(error);
    throw error;
  }
}



export default {
  createTrip,
  getAllTrips,
  // Export other auth functions...
}
