import React from 'react';
import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { colors } from '../assets/colors';

export const styles = StyleSheet.create({
  container: function(bg) {
    return {
      flex: 1, 
      backgroundColor: colors.defaultBg,
      opacity: bg ? 0.9 : 1
    }
  },
  bgStyle: {
    flex: 1,
  },
  modalStyle: {
    margin: 0
  },
  modalContainer: {
    width: '100%', 
    backgroundColor: colors.defaultBg,
    alignItems: 'center',
    flexDirection: 'column',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    position: 'absolute',
    bottom: 0,
    paddingBottom: 20
  },
  modalBox: function(borderWidth) {
    return {
      width: '100%',
      borderBottomWidth: borderWidth,
      borderColor: colors.statusBar,
      alignItems: 'center',
    }
  },
  modalTitleText: {

  },
  modalText: function(size, padding) {
    return {
      fontSize: size, 
      paddingHorizontal: 10,
      paddingVertical: padding,
      color: colors.defaultText
    }
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection:'column'
  },
  textInput: {
    width: '80%',
    backgroundColor: colors.statusBar,
    color: colors.defaultText,
    paddingLeft: 10
  },
  inputComponent: {
    width: '100%',
    height: 40,
    flex: 1,
    flexDirection:'row'
  },
  finishBtn: {
    width: '20%',
    backgroundColor: colors.statusBar,
    alignItems: 'center',
    justifyContent: 'center'
  },
});