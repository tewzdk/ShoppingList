import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';

import { onGoogleSignOut } from '../services/FirebaseHandler';
import { snapshotHistory, updateHistory, deletePaidHistory } from '../services/DrinksHandler'
import { setNewUserName } from '../services/FirebaseHandler';
import { userState } from '../redux/slices/userSlice'
import { colors as myColors } from '../assets/colors';
import { historyState } from '../redux/slices/drinksSlice'
import { styles } from '../styles/settingsStyles';
import { styles as globalStyles } from '../styles/globalStyles';
import DefaultPage from '../components/DefaultPage';

export default function Settings() {

  const SODA_PRICE = 5;
  const user = useSelector(userState);
  const history = useSelector(historyState)
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [changeNameVisible, setChangeNameVisible] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    let unsubscribe = () => { };

    snapshotHistory((func) => {
      unsubscribe = func;
    });

    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setName('');
        setChangeNameVisible(false)
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [])

  /**
   * 
   */
  const OptionModal =() => {
    return (
      <Modal backdropTransitionOutTiming={0} isVisible={isModalVisible} style={globalStyles.modalStyle} onBackdropPress={() => setModalVisible(false)}>
      <View style={globalStyles.modalContainer}>
        <View style={globalStyles.modalBox(1)}>
          <Text numberOfLines={1} style={globalStyles.modalText(30, 20)}>{history.length > 0 && monthArray[history[selectedIndex].month] + ' - ' + history[selectedIndex].year}</Text>
        </View>
        {
          history[selectedIndex] && history[selectedIndex].amount - history[selectedIndex].paid !== 0 &&
          <TouchableOpacity style={styles.modalBox}>
            <Text style={globalStyles.modalText(25, 5)} onPress={handleUpdateMonth}>Betal</Text>
          </TouchableOpacity>
        }
        {
          history[selectedIndex] && history[selectedIndex].paid > 0 &&
          <TouchableOpacity style={globalStyles.modalBox} onPress={handleRemovePaid}>
            <Text style={globalStyles.modalText(25, 5)}>Fortryd</Text>
          </TouchableOpacity>
        }
      </View>
    </Modal>
    )
  };

  /**
   * Function called when month has been pressed
   * Opens modal with options to pay for drinks
   * Or undo
   * @param {Number} index 
   */
  function handleItemPressed(index) {
    setSelectedIndex(index)
    setModalVisible(true)
  }

  /**
   * Firebase function to update database
   */
  function handleUpdateMonth() {
    setModalVisible(false);
    updateHistory(history[selectedIndex]);
  }

  /**
   * Removes paid items from databse
   */
  function handleRemovePaid() {
    setModalVisible(false);
    deletePaidHistory(history[selectedIndex]);
  }

  /**
   * Changes the name if any changes has been made
   */
  function handleChangeName() {
    if (name.trim() !== user.name.trim()) {
      setNewUserName(name.trim())
    }
    Keyboard.dismiss()
  }


  return (
    <DefaultPage>
      <View style={styles.flexContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Sodavand historik</Text>
          <View style={styles.drinksTable}>
            {
              history.map((item, index) => {
                return (
                  <TouchableOpacity key={index.toString()} onPress={() => handleItemPressed(index)}>
                    <View style={styles.monthContainer}>
                      <Text style={styles.monthTitle}>{monthArray[item.month]}</Text>
                    </View>
                    <View style={styles.drinksRow(history.length === index + 1 ? 0 : 1)} key={index.toString()}>
                      <Text style={styles.text}>{`Antal genstande: ${item.amount}`}</Text>
                      <View style={styles.priceContainer}>
                        {
                          item.paid > 0 &&
                          <Text style={styles.text}>{`Har betalt: ${item.paid * SODA_PRICE} kr.`}</Text>
                        }
                        {
                          item.amount - item.paid !== 0 &&
                          <Text style={styles.text}>{
                            item.paid === 0
                              ? `I alt udestående: ${item.amount * SODA_PRICE - item.paid * SODA_PRICE} kr.`
                              : `Mangler at betale: ${item.amount * SODA_PRICE - item.paid * SODA_PRICE} kr.`
                          }</Text>
                        }
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </View>
        <View style={styles.flexContainer}>
        </View>
        <View style={styles.bottomContainer}>
        <Text style={styles.bottomTitleText}>Logget in som</Text>
          <Text style={styles.bottomText}>{user.name}</Text>
          <TouchableOpacity
            onPress={() => setChangeNameVisible(true)}
            style={styles.logoutBtn}
          >
            <Text style={styles.btnText}>
              Skift navn
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onGoogleSignOut()}
            style={styles.logoutBtn}
          >
            <Text style={styles.btnText}>
              Logout
          </Text>
          </TouchableOpacity>

        </View>
        {
          changeNameVisible &&
          <View style={globalStyles.inputContainer}>
            <View style={globalStyles.inputComponent}>
              <NameForm item={name} setItem={setName} submitItem={handleChangeName} />
              <TouchableWithoutFeedback onPress={handleChangeName}>
              <View style={globalStyles.finishBtn}>
                <Icon name={'checkmark'} size={30} color={myColors.defaultText} />
              </View>
            </TouchableWithoutFeedback>
            </View>
          </View>
        }
        <OptionModal />
      </View>
    </DefaultPage>
  )
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

/**
 * TextInput will be focused when shown
 * @param {Object} item 
 * @param {Function} setItem 
 * @param {Function} submitItem 
 */
const NameForm = ({ item, setItem, submitItem }) => {
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  return (
    <TextInput
      ref={textInput}
      style={globalStyles.textInput}
      value={item}
      onChangeText={(text) => setItem(text)}
      onSubmitEditing={submitItem}
    />
  );
};