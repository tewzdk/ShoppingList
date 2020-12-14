import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, ImageBackground, LogBox, FlatList, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import Fuse from 'fuse.js';

import { shoppingListState, hintListState } from '../redux/slices/groceriesSlice'
import {
  addToShoppingList, 
  deleteFromShoppingList, 
  removeFromShoppingList, 
  backToShoppingList, 
  updateShoppingListItem
} from '../services/GroceriesHandler';
import { userState } from '../redux/slices/userSlice'
import { styles } from '../styles/homeStyles';
import DefaultPage from '../components/DefaultPage';
import { colors as myColors } from '../assets/colors';
import bg from '../images/bg.jpg'

LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

export default function Home() {
  const user = useSelector(userState);
  const shoppingList = useSelector(shoppingListState);
  const hintList = useSelector(hintListState);
  const [filteredHints, setFilteredHints] = useState([]);
  const [showHints, setShowHints] = useState(false);
  const [item, setItem] = useState('');
  const [color, setColor] = useState('green');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [editItem, setEditItem] = useState({
    amount: 0,
    author: user.name,
    category: '',
    color: '',
    name: '',
    purpose: '',
    active: false
  });
  const [colors, setColors] = useState(defaultColors)
  const [addVisible, setAddVisible] = useState(false);

  /**
   * Component with onpress set default color
   * @param {String} color 
   */
  const ColorComponent = ({ color }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setColor(color);
          setColors({ ...defaultColors, [color]: { selected: true } });
        }}
        style={styles.colorBtn(color, colors[color].selected)}
      >
      </TouchableOpacity>
    );
  }

  /**
   * Opens the form
   */
  function AddBtn() {
    setAddVisible(true);
  }

  /**
   * Creates item object
   * Either updates or creates new item in shopping list
   */
  function submitItem() {
    if (item.length > 0) {
      const name = item.split(':')[0];
      const amount = item.split(':').length > 1 ? item.split(':')[1] : '';
      if (isUpdate) {
        const tempEditItem = { ...editItem, amount: amount, color: color, name: name }
        updateShoppingListItem(tempEditItem)

      } else {
        //IF ITEM ALREADY LISTED ADD QUANITY TEXT TOGETHER FROM PREVIOUS
        // AND UPDATE INSTEAD OF CREATING DUPLICATE
        const foundExistingItem = shoppingList.find((existingItem) => existingItem.name.trim() === name.trim());
        
        if (foundExistingItem) {
          const tempEditItem = { ...editItem, amount: foundExistingItem.amount + ' og ' + amount.trim(), color: color, name: name, id: foundExistingItem.id }
          updateShoppingListItem(tempEditItem)
        } else {
          addToShoppingList({
            amount: amount.trim(),
            author: user.name,
            color: color.trim(),
            name: name.trim(),
            active: true
          })
        }
      }
    }
    Keyboard.dismiss();
  }

  /**
   * Function for add quantity button
   * separating item name from quantity
   */
  function addQuantity() {
    const hasColon = item.indexOf(":") === -1 && item.length >= 1;
    hasColon && setItem(item + ' : ');
  }

  /**
   * Deletes item from firebase
   * @param {String} id 
   */
  function deleteItem(id) {
    setModalVisible(false);
    deleteFromShoppingList(id);
  }

  /**
   * Close modal and formats data
   * to be edited in inputfield
   * timeout to make sure that modal has been closed
   * before opening keyboard
   * @param {String} id 
   */
  function handleEditItem(id) {
    setModalVisible(false);
    const tempItem = editItem.amount ? editItem.name + ' : ' + editItem.amount : editItem.name;
    setIsUpdate(true);
    setItem(tempItem)
    setColors({ ...colors, [editItem.color]: { selected: true } })
    setColor(editItem.color)
    setTimeout(() => {
      setAddVisible(true);
    }, 500)
  }


  /**
   * Set input text to text from hint list
   * @param {String} hint 
   */
  function handleHintPress(hint) {
    setItem(hint + ' : ');
    setShowHints(false);
  }

  /**
   * Sets the current item to selected
   * and opens modal
   * @param {*} i 
   */
  function handleOpenItemModify(i) {
    setEditItem(i);
    setModalVisible(true)
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setItem('')
        setAddVisible(false);
        setIsUpdate(false);
        setShowHints(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [])

  return (
    <DefaultPage>
    <View style={styles.flexContainer}>
      <View style={styles.flatlistContainer} >
        <ImageBackground source={bg} imageStyle={styles.bgImageStyle} style={styles.bgStyle}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.topList}>
            <FlatList
              scrollEnabled={false}
              nestedScrollEnabled={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(listItem, index) => index.toString()}
              data={shoppingList.filter((shoppingItem) => shoppingItem.active === true)} //Filters the list by only active items
              renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => removeFromShoppingList(item.id)}
                      onLongPress={() => handleOpenItemModify(item)}
                      style={styles.rowBtn}
                    >
                      <View style={styles.defaultRowContainer}>
                        <View style={styles.colorTab(item.color)} />
                        <Text style={styles.rowText}>{item.name}</Text>
                      </View>
                      <Text style={styles.rowText}>{item.amount}</Text>
                    </TouchableOpacity>
                  );
              }}
            />
          </View>

          <View style={styles.bottomList}>
            <FlatList
              scrollEnabled={false}
              nestedScrollEnabled={false}
              showsVerticalScrollIndicator={false}
              style={{flexGrow: 0}}
              keyExtractor={(listItem, index) => index.toString()}
              data={shoppingList.filter((shoppingItem) => shoppingItem.active === false)} //Filters the list by only inactive items
              renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => backToShoppingList(item.id)}
                      onLongPress={() => handleOpenItemModify(item)}
                      style={styles.rowBtn}
                    >
                      <View style={styles.defaultRowContainer}>
                        <View style={styles.colorTab(item.color)} />
                        <Text style={styles.inactiveRowText}>{item.name}</Text>
                      </View>
                      <Text style={styles.inactiveRowText}>{item.amount}</Text>
                    </TouchableOpacity>
                  );
              }}
            />
            <View />
          </View>
          </ScrollView>
        </ImageBackground>
        {
          !addVisible &&
          <TouchableOpacity
            style={styles.addBtn}
            onPress={AddBtn}
          >
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        }
      </View >
      {addVisible &&
        <View style={styles.addComponent}>
          {showHints 
          ? <View style={styles.hintContainer}>
              {filteredHints.map((hint, index) => {
                if (hint.item.length > 10 ? hint.score < 0.7 : hint.score < 0.3) {
                  const start = hint.matches[0].indices[0][0]
                  const end = hint.matches[0].indices[0][1]+1
                  const frontString = hint.item.slice(0,start)
                  const matchingString = hint.item.slice(start,end);
                  const endString = hint.item.slice(end,hint.item.length)

                  return (
                    <TouchableOpacity key={index.toString()} style={styles.hintButton} onPress={() =>handleHintPress(hint.item)}>
                      <Text style={styles.hintText('white')}>{frontString}</Text>
                      <Text style={styles.hintText(myColors.accent)}>{matchingString}</Text>
                      <Text style={styles.hintText('white')}>{endString}</Text>
                    </TouchableOpacity>
                  )
                }
              })}
            </View>
          : <View style={styles.colorComponent}>
            <View style={styles.rowContainer}>
              <ColorComponent color='green' />
              <ColorComponent color='red' />
              <ColorComponent color='blue' />
              <ColorComponent color='yellow' />
            </View>
            <View style={styles.rowContainer}>
              <ColorComponent color='pink' />
              <ColorComponent color='orange' />
              <ColorComponent color='cyan' />
              <ColorComponent color='lightblue' />
            </View>
          </View>
          }
          <View style={styles.inputComponent}>
            <MyForm item={item} setItem={setItem} submitItem={submitItem} hintList={hintList} setFilteredHints={setFilteredHints} setShowHints={setShowHints} />
            <TouchableWithoutFeedback onPress={addQuantity}>
              <View style={styles.finishBtn}>
                <Text style={styles.addNumberText}>
                  : 123
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={submitItem}>
              <View style={styles.finishBtn}>
                <Icon name={'checkmark'} size={30} color={myColors.defaultText} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      }
      <Modal backdropTransitionOutTiming={0} isVisible={isModalVisible} style={styles.modalStyle} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText(30, 20)}>{editItem.name}</Text>
          </View>
          <TouchableOpacity style={styles.modalBox} onPress={() => handleEditItem()}>
            <Text style={styles.modalText(25, 5)}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalBox} onPress={() => deleteItem(editItem.id)}>
            <Text style={styles.modalText(25, 5)}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    </DefaultPage>
  )
}

/**
 * Displays text input
 * TextInput will be focused when shown
 * @param {Object} item 
 * @param {Function} setItem 
 * @param {Function} submitItem 
 * @param {Array} hintList 
 * @param {Function} setFilteredHints 
 * @param {Funtion} setShowHints 
 */
const MyForm = ({ item, setItem, submitItem, hintList, setFilteredHints, setShowHints }) => {
  const textInput = useRef(null);

  const fuse = new Fuse(hintList, {
    includeScore: true,
    includeMatches: true
  });

  useEffect(() => {
    textInput.current.focus();
  }, []);

  function handleHints(text) {
    const results = fuse.search(text);
    if (results.length > 0) {
      setFilteredHints(results)
      setShowHints(true)
    } else {
      setShowHints(false)
    }
    setItem(text);
  }

  return (
    <TextInput
      ref={textInput}
      style={styles.addTextInput}
      value={item}
      onChangeText={(text) => handleHints(text)}
      onSubmitEditing={submitItem}
    />
  );
};

const defaultColors = {
  green: {
    selected: false
  },
  red: {
    selected: false
  },
  blue: {
    selected: false
  },
  yellow: {
    selected: false
  },
  pink: {
    selected: false
  },
  orange: {
    selected: false
  },
  cyan: {
    selected: false
  },
  lightblue: {
    selected: false
  },
}