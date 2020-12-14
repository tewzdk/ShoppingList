import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import configureStore from '../redux/store';
import {
  setUser,
  setUserName
} from '../redux/slices/userSlice';
import { setShoppingList } from '../redux/slices/groceriesSlice'
GoogleSignin.configure({
  webClientId: '529353011877-oe8qdrdkodvpksfj9iva8ebaeitu15uh.apps.googleusercontent.com',
});

/**
 * Login function with google
 */
export async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

/**
 * Sign out function
 */
export async function onGoogleSignOut() {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    return auth().signOut()

  } catch (error) {
    console.error(error);
  }
}

/**
 * get current logged in user from google
 */
export async function getCurrentUser() {
  const currentUser = await GoogleSignin.getCurrentUser();
  console.log(currentUser)
}

/**
 * Checks if user exists
 * then update the redux state
 * will create a user document if no user exists
 * @param {Object} googleUser 
 */
export async function setCurrentUser(googleUser) {
  const userData = googleUser._user;
  const userRef = firestore().collection('users').doc(googleUser._user.uid);
  const userDoc = await userRef.get()
  const userObj = {
    uid: userData.uid,
    name: userData.displayName,
    image: userData.photoURL,
    email: userData.email,
  }
  if (userDoc.exists) {
    configureStore.dispatch(setUser(userDoc.data()));
  } else {
    userRef.set(userObj).then(() => {
      console.log('created')
      configureStore.dispatch(setUser(userObj));
    })
  }
}

/**
 * Sets the new user name
 * and update redux state
 * @param {String} newName 
 */
export function setNewUserName(newName) {
  const userState = configureStore.getState().user.user;
  const userRef = firestore().collection('users').doc(userState.uid);
  // TODO: Firebase function to change user name on all documents
  userRef.update({name: newName}).then(() => {
    configureStore.dispatch(setUserName(newName));
  })
}
