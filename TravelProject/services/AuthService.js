import auth from '@react-native-firebase/auth';

const createUser = async (email, password) => {
  return await auth().createUserWithEmailAndPassword(email, password);
};

const signIn = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

// More auth functions as needed...

export default {
  createUser,
  signIn,
  // Export other auth functions...
};
