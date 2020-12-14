import React, { useRef, useEffect, useState } from 'react';
import { TextInput} from 'react-native';
import { styles } from '../styles/homeStyles'

export const InputField = ({ item, setItem, submitItem, padType, setPadType }) => {

  const textInput = useRef(null);
  useEffect(() => {
    textInput.current.focus();
  }, []);

  /**
   * Set padtype from default to numeric
   * depending on colon placed
   * @param {String} text 
   */
  function handleSetKeyboard(text) {
    const oldMessageString = item.split(':')[0];
    const newMessageString = text.split(':')[0];
    const hasColon = text.includes(":") && text.length >= 1 && oldMessageString.trim() === newMessageString.trim();
    hasColon ? handleChangeNumeric(text) : handleChangeDefault(text);
  }

  /**
   * Changes padtype to numeric.
   * Makes sure that a correct time is set after colon
   * @param {String} text 
   */
  function handleChangeNumeric(text) {
    let hourreg = /^[0-2]+$/;
    let lasthourreg = /^[0-4]+$/;
    let numreg = /^[0-9]+$/;
    let minutereg = /^[0-5]+$/;

    setPadType('numeric');
    if (text.indexOf(':') === text.length-1) {
      if (item.endsWith(': ')) {
        
        setItem(text)
      } else {
        setItem(text.trim()+' ');
      }
    } else {
      const tempString = text.split(':')[1].trim();
      if (tempString.length === 1) {
        hourreg.test(tempString) && setItem(text)
      } else if (tempString.length === 2) {
        if (item.endsWith('.')) {
          setItem(text)
        } else {
          const secondLastDigit = tempString[tempString.length-2]
          if (secondLastDigit === '2') {
            const lastDigit = tempString[tempString.length-1]
            if (lastDigit === '4') {
              setItem(text + '.00');
            } else {
              lasthourreg.test(tempString) && setItem(text + '.');
            }
          } else {
            numreg.test(tempString) && setItem(text + '.')
          }
        }
      } else if(tempString.length === 4) {
        const lastDigit = tempString[tempString.length-1]
        minutereg.test(lastDigit) && setItem(text)
      } else if(tempString.length === 5) {
        const lastDigit = tempString[tempString.length-1]
        numreg.test(lastDigit) && setItem(text)
      } else if(tempString.length === 6) {

      } else {
        setItem(text)
      }
    }
    
  }

  /**
   * Changes the padtype to default
   * @param {String} text 
   */
  function handleChangeDefault(text) {
    setPadType('default');
    setItem(text)
  }

  return (
    <TextInput
      ref={textInput}
      style={styles.addTextInput}
      value={item}
      keyboardType={padType}
      onChangeText={(text) => handleSetKeyboard(text)}
      onSubmitEditing={submitItem}
    />
  );
};