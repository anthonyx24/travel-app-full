import auth from '@react-native-firebase/auth';

const getAutocompleteKey = async () => {
    try{
      const idToken = await auth().currentUser.getIdToken();
      const response = await fetch('http://localhost:8080/autocomplete', {
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
      return responseData.apiKey;
  
    }catch(error){
      console.error("Error getting Autocomplete API key:", error);
      throw error;
    }
}

const getSuggestions = async (input, apiKey) => {
    const requestBody = {
        input: input,
        includeQueryPredictions: false,
    }
    try {
        const response = await fetch(`https://places.googleapis.com/v1/places:autocomplete?key=${apiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('HTTP error: Status code ' + response.status);
        }
  
      const responseData = await response.json();
      return responseData.suggestions;
    } catch (error) {
      console.error('Error making autocomplete request:', error);
      throw error;
    }
  };

export default {
    getAutocompleteKey,
    getSuggestions,
};
