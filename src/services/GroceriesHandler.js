import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import configureStore from '../redux/store';
import { setShoppingList, setHintList } from '../redux/slices/groceriesSlice'

const shopRef = firestore().collection('shoppinglist')
const listRef = firestore().collection('searchvalues').doc('default')

/**
 * Firestore onsnapshot listener
 * returns list ordered by color
 * Updates the list in redux
 */
export async function getShoppingList() {
  return shopRef.orderBy('color','asc').onSnapshot((querySnapshot, error) => {
    if (error || !querySnapshot) {
      return;
    }
    try {
      const data = querySnapshot.docs.map((item) => {
        const tempItem = item.data();
        tempItem.id = item.id;
        return tempItem;
      });      
      configureStore.dispatch(setShoppingList(data))
    } catch {}
  });
}

/**
 * Firestore onsnapshot listener
 * Updates the list in redux
 */
export async function getHintList() {
  return listRef.onSnapshot((querySnapshot, error) => {
    if (error || !querySnapshot) {
      return;
    }
    try {
      const dataList = querySnapshot.data().values;
      configureStore.dispatch(setHintList(dataList))
    } catch {}
  })
}

/**
 * Adds document to the shoppinglist collection
 * Will update search values and make sure the array does not 
 * already contain the String
 * @param {Object} item 
 */
export async function addToShoppingList(item) {
  const addToList = firebase.firestore.FieldValue.arrayUnion(item.name)
  shopRef.add(item).then(() => {
    listRef.update({values: addToList});
  })
}

/**
 * Update firestore document
 * @param {Object} item 
 */
export async function updateShoppingListItem(item) {
  const id = item.id;
  const tempItem = item;
  delete tempItem.id;
  shopRef.doc(id).update(tempItem).then(() => {
    console.log('added')
  })
}

/**
 * Deletes document from collection
 * @param {String} id 
 */
export async function deleteFromShoppingList(id) {
  shopRef.doc(id).delete().then(() => console.log('removed'))
}

/**
 * Updates the active value to false
 * @param {String} id 
 */
export async function removeFromShoppingList(id) {
  shopRef.doc(id).update({active: false})
}

/**
 * Update the active value to true
 * @param {*} id 
 */
export async function backToShoppingList(id) {
  shopRef.doc(id).update({active: true})
}