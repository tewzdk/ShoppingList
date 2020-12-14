import firestore, { firebase } from '@react-native-firebase/firestore';
import configureStore from '../redux/store';
import { setCurrent, setTotal, setHistory } from '../redux/slices/drinksSlice'

const dateString = new Date().getMonth() + '-' + new Date().getFullYear();
const totalDrinksRef = firestore().collection('totaldrinks').doc(dateString);
const decrement = firebase.firestore.FieldValue.increment(-1);
const increment = firebase.firestore.FieldValue.increment(1);

/**
 * Returns the document reference
 * @param {String} uid 
 * @returns drinksRef
 */
function getDrinksRef(uid) {
  return firestore().collection('users').doc(uid).collection('drinks').doc(dateString);
}

/**
 * Increments total drinks on user this month
 * and on the total drinks
 * @param {String} uid 
 */
export function handleAddDrink(uid) {
  const batch = firestore().batch();
  batch.update(getDrinksRef(uid), {drinks: increment})
  batch.update(totalDrinksRef, {total: increment})
  batch.commit().then(() => {
    console.log('added')

  });
}

/**
 * Decrements total drinks
 * @param {String} uid 
 * @param {Object} monthHistory 
 */
export async function handleRemoveDrink(uid, monthHistory) {
  if (monthHistory.amount - monthHistory.paid === 0) {

  } else {
    const batch = firestore().batch();
    batch.update(getDrinksRef(uid), {drinks: decrement})
    batch.update(totalDrinksRef, {total: decrement})
    batch.commit().then(() => {
      console.log('removed')
    });
  }
  
}

/**
 * Firestore onsnapshot listener
 * Updates the redux state
 */
export function snapshotDrinks() {
  const userId = configureStore.getState().user.user.uid

  const drinksRef = firestore().collection('users').doc(userId).collection('drinks').doc(dateString);

  return drinksRef.onSnapshot((querySnapshot, error) => {
    if (error || !querySnapshot) {
      return;
    }
    if (querySnapshot.exists) {
      const currentObj = {
        mydrinks: querySnapshot.data().drinks
      };
      configureStore.dispatch(setCurrent(querySnapshot.data().drinks));
    } else {
      // CREATE DOC && have userid from google
      userId && drinksRef.set({ drinks: 0});
    }
  })
}

/**
 * Firestore onsnapshot listner
 * Updates redux state
 */
export function snapshotTotal() {
  return totalDrinksRef.onSnapshot((querySnapshot, error) => {
    if (error || !querySnapshot) {
      return;
    }
    if (querySnapshot.exists) {
      const currentObj = {
        mydrinks: querySnapshot.data().total
      };
      configureStore.dispatch(setTotal(querySnapshot.data().total));
    } else {
      totalDrinksRef.set({ total: 0});
    }
  })
}

/**
 * Firestore onsnapshot listner
 * Updates redux state
 */
export function snapshotHistory() {
  const userId = configureStore.getState().user.user.uid
  const historyRef = firestore().collection('users').doc(userId).collection('drinks');
  return historyRef.onSnapshot((querySnapshot, error) => {
    if (error || !querySnapshot) {
      return;
    }
    const items = querySnapshot.docs.map((month) => {
      const monthDigit = month.id.split('-')[0];
      const yearDigit = month.id.split('-')[1];

      return {
        month: Number(monthDigit),
        year: Number(yearDigit),
        amount: month.data().drinks,
        paid: month.data().paid ? month.data().paid : 0
      }
    });
    configureStore.dispatch(setHistory(items))
  })
}

/**
 * Updates the total amount paid on history document
 * @param {Object} historyObject 
 */
export function updateHistory(historyObject) {
  const userId = configureStore.getState().user.user.uid
  const historyRef = getHistoryRef(userId);

  historyRef.doc(historyObject.month+'-'+historyObject.year).update({
    paid: historyObject.amount
  })
}

/**
 * Resets the total paid on history document
 * @param {Object} historyObject 
 */
export function deletePaidHistory(historyObject) {
  const userId = configureStore.getState().user.user.uid
  const historyRef = getHistoryRef(userId);
  historyRef.doc(historyObject.month+'-'+historyObject.year).update({
    paid: 0
  })
}

/**
 * Firestore document reference
 * @param {String} userId 
 * @returns Firestore document reference
 */
function getHistoryRef(userId) {
  return firestore().collection('users').doc(userId).collection('drinks');
}