import firestore from '@react-native-firebase/firestore';
import configureStore from '../redux/store';
import { setEvents } from '../redux/slices/calendarSlice'
const eventRef = firestore().collection('events')

/**
 * Creates event document
 * @param {String} date 
 * @param {String} time 
 * @param {String} text 
 * @param {String} author 
 */
export function addEvent(date, time, text, author) {
  eventRef.add({
    date: date,
    time: time,
    text: text,
    author: author
  });
}

/**
 * Updates event document
 * @param {Object} item 
 */
export function updateEvent(item) {
  const id = item.id;
  const tempItem = item;
  delete tempItem.id;
  eventRef.doc(id).update(tempItem).then(() => {
    console.log('added')
  })
}

/**
 * Deletes event object
 * @param {String} id 
 */
export function deleteEvent(id) {
  eventRef.doc(id).delete();
}

/**
 * Firestore onSnapshotlistener
 * on all events
 * updates redux state
 */
export function snapshotEvents() {
  return eventRef.orderBy('time','asc').onSnapshot((querySnapshot, error) => {
    if (error || !querySnapshot) {
      return;
    }
    const eventList = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    })
    configureStore.dispatch(setEvents(eventList))
  })
}
