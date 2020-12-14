import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';

import { addEvent, updateEvent, deleteEvent, snapshotEvents } from '../services/CalendarHandler';
import DefaultPage from '../components/DefaultPage';
import { styles } from '../styles/calendarStyles'
import { colors } from '../assets/colors';
import { eventState } from '../redux/slices/calendarSlice';
import { userState } from '../redux/slices/userSlice';
import { InputField } from '../components/InputField';

export default function Calendar() {
  const events = useSelector(eventState);
  const user = useSelector(userState);
  const [selectedDate, setSelectedDate] = useState();
  const [addVisible, setAddVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [markedEvents, setMarkedEvents] = useState({})
  const [padType, setPadType] = useState('default');
  const [dateText, setDateText] = useState('');
  const [editItem, setEditItem] = useState({
    id: '',
    date: '2020-10-10',
    text: '',
    time: '10.00'
  });

  useEffect(() => {
    let unsubscribe = () => { };
    snapshotEvents((func) => {
      unsubscribe = func;
    });

    return () => {
      unsubscribe();
    }
  },[])

  /**
   * Create object with date attributes
   * used by RNCalendar to place dots on dates with events
   */
  useEffect(() => {
    let newMarkedEvents = {};
    events.forEach((e) => {
      newMarkedEvents = {...newMarkedEvents, [e.date]: {marked: true, dotColor: colors.accent}}
    })
    setMarkedEvents(newMarkedEvents)

  },[events])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        //Change to default settings when keyboard closes
        setIsUpdate(false);
        setAddVisible(false);
        setPadType('default')
        setDateText('');
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [])

  function handleClick() {
    setAddVisible(true)
  }

  function handleSubmit() {
    Keyboard.dismiss();
    const dateTextArray = dateText.split(':');
    const eventText = dateTextArray[0].trim();
    //Checks if the time string is correct and adds 00 if that has not been written by the user
    const eventTime = dateTextArray.length > 1 ? dateTextArray[1].trim().length === 5 ? dateTextArray[1].trim() : dateTextArray[1].trim().length === 3 ? dateTextArray[1].trim()+'00' : false : false;

    if (isUpdate) {
      const tempEditItem = { ...editItem, text: eventText, time: eventTime }
      eventTime && updateEvent(tempEditItem);
    } else {
      if(eventTime) {
        eventTime && addEvent(selectedDate, eventTime, eventText, user.name)
      }
    }

  }

  /**
   * Function used by user to go from writing event text
   * to writing the time of the event
   */
  function addTime() {
    const hasColon = dateText.indexOf(":") === -1 && dateText.length >= 1;
    hasColon && (
      setDateText(dateText + ' : '),
      setPadType('numeric')
    );
  }

  /**
   * Sets the selected date
   * @param {Date} date 
   */
  function handleDayPress(date) {
    setSelectedDate(date)
  }

  /**
   * Opens the modal for changing or deleting event
   * @param {Object} event 
   */
  function handlePressEvent(event) {
    setEditItem(event);
    setModalVisible(true);
  }

  /**
   * Opens Form for editing event
   * and formats the object values to a string
   */
  function handleEditEvent() {
    setIsUpdate(true);
    setModalVisible(false);
    setDateText(editItem.text+' : ' + editItem.time);
    setTimeout(() => {
      setAddVisible(true);
    }, 400)

  }

  /**
   * Closes the modal and calls a firebase function
   * @param {String} id 
   */
  function handleDeleteEvent(id) {
    deleteEvent(id)
    setModalVisible(false);
  }

  return(
    <DefaultPage>
      <View>
        <RNCalendar
            current={new Date()}
            onDayPress={(date) => handleDayPress(date.dateString)}
            theme={calendarTheme}
            markedDates={{
              ...markedEvents,
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: colors.accent,
                selectedTextColor: colors.dark,
              }
            }}
        />
      </View>
      <View style={styles.bottomContainer}>
          {selectedDate 
            && <Text style={styles.eventTitle}>{selectedDate.split('-')[2]+'. '+monthArray[selectedDate.split('-')[1]-1]+' '+selectedDate.split('-')[0]}</Text>
          }
          <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={events}
              renderItem={({ item, index }) => {
                if (item.date ? item.date === selectedDate : false) {
                  return (
                    <TouchableOpacity style={styles.eventLine} key={index.toString()} onPress={() => handlePressEvent(item)}>
                      <View style={styles.eventTopLine}>
                        <Text style={styles.eventTimeText}>{item.time}</Text>
                        <Text style={styles.textSeparator}>-</Text>
                        <View style={{flex: 1, paddingRight: 10}}>
                        <Text style={styles.authorText}>{'('+item.author+')'}</Text>
                        <Text style={styles.eventText}>{item.text}</Text>
  
                        </View>
  
                      </View>
  
                    </TouchableOpacity>
                  );
                }
              }}
            />
        {
          !addVisible && selectedDate &&
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleClick}
          >
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        }
        {addVisible &&
          <View style={styles.addComponent}>
            <View style={styles.inputComponent}>
              <InputField item={dateText} setItem={setDateText} submitItem={handleSubmit} padType={padType} setPadType={setPadType} />
              <TouchableWithoutFeedback onPress={addTime}>
                <View style={styles.finishBtn}>
                  <Icon name={'alarm-outline'} size={30} color={colors.defaultText} />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleSubmit}>
                <View style={styles.finishBtn}>
                  <Icon name={'checkmark'} size={30} color={colors.defaultText} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        }
        <Modal backdropTransitionOutTiming={0} isVisible={isModalVisible} style={styles.modalStyle} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text numberOfLines={1} style={styles.modalText(30, 20)}>{editItem.time + ' - ' + editItem.text}</Text>
          </View>
          <TouchableOpacity style={styles.modalBox} onPress={handleEditEvent}>
            <Text style={styles.modalText(25, 5)}>Redigér</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalBox} onPress={() => handleDeleteEvent(editItem.id)}>
            <Text style={styles.modalText(25, 5)}>Slet</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      </View>
    </DefaultPage>
  );
}

const calendarTheme = {
  backgroundColor: colors.statusBar,
  calendarBackground: colors.statusBar,
  textSectionTitleColor: '#b6c1cd',
  textSectionTitleDisabledColor: '#d9e1e8',
  selectedDayBackgroundColor: '#ffffff',
  selectedDayTextColor: 'pink',
  todayTextColor: colors.dark,
  dayTextColor: colors.defaultText,
  textDisabledColor: colors.defaultBg,
  dotColor: colors.accent,
  selectedDotColor: 'black',
  arrowColor: colors.accent,
  disabledArrowColor: '#d9e1e8',
  monthTextColor: colors.defaultText,
  indicatorColor: 'yellow',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16
}

const monthArray = [
  'Januar',
  'Februar',
  'Marts',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'December'
]