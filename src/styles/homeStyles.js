import React from 'react';
import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { colors } from '../assets/colors';

export const styles = StyleSheet.create({

  flexContainer: {
    flex: 1
  },
  flatlistContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
  },
  bgImageStyle: {
    opacity: 0.5,
    borderRadius: 10
  },
  bgStyle: {
    backgroundColor: 'black',
    flex: 1,
    borderRadius: 11,
    width: '100%'
  },
  topList: {
    minHeight: 50,
    backgroundColor: colors.statusBar,
    opacity: 0.9,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10
  },
  bottomList: {
    flex: 1,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: colors.dark,
    opacity: 0.9,
    flexGrow: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  defaultRowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  rowBtn: {
    paddingVertical: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  addBtnText: {
    color: 'white',
    fontSize: 30,
  },
  rowText: {
    fontSize: 17,
    color: colors.defaultText
  },
  inactiveRowText: {
    fontSize: 17,
    color: colors.defaultText,
    textDecorationLine: 'line-through'
  },

  addComponent: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection:'column'
  },
  inputComponent: {
    width: '100%',
    height: 40,
    flex: 1,
    flexDirection:'row'
  },
  colorComponent: {
    height: 150,

    padding: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  addTextInput: {
    width: '60%',
    backgroundColor: colors.statusBar,
    color: colors.defaultText,
    paddingLeft: 10
  },
  addNumberText: {
    fontSize: 15,
    color: colors.defaultText,
  },
  colorTab: function(color) {
    return {
      width: 2,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      height: '100%',
      backgroundColor: color,
      marginRight: 10,

    }
  },
  colorBtn: function(color,selected) {
    const borderWidth = selected ? 2 : 0;
    return {
      backgroundColor: color,
      height: 60,
      width: 80,
      borderRadius: 10,
      borderWidth: borderWidth,
      borderColor: 'pink'
    }
  },
  finishBtn: {
    width: '20%',
    backgroundColor: colors.statusBar,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 100,
  },
  hintContainer: {
    paddingHorizontal: 30,
    paddingBottom: 10,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'

  },
  hintButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'gray',
    marginRight: 5,
    marginTop: 3,
    opacity: 0.8,
    flexDirection: 'row'
  },
  hintText: function(color) {
    return {
      fontSize: 20,
      color: color
    }
  },
  modalStyle: {
    margin: 0
  },
  modalContainer: {
    width: '100%', height: 200,
    backgroundColor: colors.defaultBg,
    alignItems: 'center',
    flexDirection: 'column',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    position: 'absolute',
    bottom: 0
  },
  modalBox: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.statusBar,
    alignItems: 'center'
  },
  modalTitleText: {

  },
  modalText: function(size, padding) {
    return {
      fontSize: size, 
      paddingVertical: padding,
      color: colors.defaultText
    }

  }

});