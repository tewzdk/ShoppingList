import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import { useSelector } from 'react-redux';

import { handleAddDrink, handleRemoveDrink, snapshotDrinks, snapshotTotal } from '../services/DrinksHandler';
import { currentDrinksState, historyState } from '../redux/slices/drinksSlice';
import { userState } from '../redux/slices/userSlice';
import DefaultPage from '../components/DefaultPage';
import { styles } from '../styles/drinksStyles';
import drinksbg from '../images/sodacan3.png';

export default function Drinks() {
  const user = useSelector(userState);
  const history = useSelector(historyState);
  const drinks = useSelector(currentDrinksState);
  const [selectedBgColor, setSelectedBgColor] = useState(0);
  
  useEffect(() => {
    let unsubscribe = () => {};
    let unsubscribeTotal = () => {};

    snapshotDrinks((func) => {
      unsubscribe = func;
    });

    snapshotTotal((func) => {
      unsubscribeTotal = func;
    });

    return () => {
      unsubscribe();
      unsubscribeTotal();
    }
  },[]);

  function handleButtonClick() {
    handleAddDrink(user.uid);
    let newNumber = selectedBgColor
    while (selectedBgColor === newNumber) {
      newNumber = Math.floor(Math.random() * 7)
    }
    setSelectedBgColor(newNumber);
  }

  return (
    <DefaultPage>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Tæller til fælles drikkevarer</Text>
          <Text style={styles.subtitleText}>{`${drinks.total} drukket i alt i huset dette måned`}</Text>
        </View>
        <View style={styles.elevatedContainer}>
        <TouchableOpacity onPress={handleButtonClick}>
        <ImageBackground style={styles.counterContainer(colorArray[selectedBgColor])} source={drinksbg} imageStyle={{borderRadius: 20}}>

          <Text style={styles.counterText}>{drinks.mydrinks}</Text>
        </ImageBackground>
        </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn('black')}
            onPress={() => handleRemoveDrink(user.uid, history[history.length-1])}
          >
            <Text style={styles.btnTextRemove}>Hovsa slet lige én</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DefaultPage>
  )
}

const colorArray = [
  '#b3e8cc',
  '#8FED92',
  '#8fd2ed',
  '#bf2c9d',
  '#6fabad',
  '#eddb34',
  '#6581cf',
  '#b55b74',
  
]