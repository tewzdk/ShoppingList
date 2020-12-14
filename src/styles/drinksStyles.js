import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../assets/colors';
const circleSize = 250;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingVertical: 20
  },
  counterContainer: function(color){
    return {
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: color,
      width: circleSize,
      height: circleSize,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 10,
    }
  },
  elevatedContainer: {
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 11
  },
  btnContainer: {
    flexDirection: 'column',
    paddingTop: 20
  }, 
  titleContainer: {
    alignItems: 'center'
  },
  btn: function (bgColor){
    return {
      backgroundColor: bgColor,
      padding: 10,
      elevation: 5,
      borderRadius: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
      height: 40
    }
  },
  btnText: {
    fontSize: 20,
    color: 'white'
  },
  btnTextRemove: {
    fontSize: 10,
    color: 'white',
    fontFamily: 'monospace'

  },
  counterText: {
    fontSize: 90,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: ''
  },
  counterTextTitle: {
    fontSize: 20,
    color: 'brown',
    fontWeight: 'bold',
    fontFamily: ''
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'center',
    color: colors.accent
  },
  subtitleText: {
    fontSize: 17,
    fontFamily: 'monospace',
    textAlign: 'center',
    color: colors.defaultText
  }

});