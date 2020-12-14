import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../assets/colors';

export const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center'
  },
  middleContainer: {
    flex: 1,

  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  priceContainer: {
    alignItems: 'flex-end'
  },
  drinksTitle: {
    fontSize: 20,
    
  },
  drinksTable: {
    width: '95%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.dark,
    backgroundColor: colors.statusBar,

  },
  drinksRow: function(bottomWidth) {
    return {
      flexDirection: 'row',
      width: '100%',
      borderBottomWidth: bottomWidth,
      borderBottomColor: colors.defaultBg,
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 20
    }
  },
  monthTitle: {
    fontSize: 18,
    fontFamily: '',
    fontWeight: 'bold',
    color: colors.defaultText
  },
  text: {
    color: colors.defaultText
  },
  title: {
    color: colors.defaultText,
    fontSize: 40,
    paddingBottom: 10
  },
  monthContainer: {
    alignItems: 'center'
  },
  logoutBtn: {
    borderWidth: 1,
    borderRadius: 8,
    width: '60%',
    borderColor: colors.dark,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: colors.statusBar,
    alignItems: 'center',
    marginTop: 10
  },
  btnText: {
    fontSize: 20,
    color: colors.defaultText,
  },
  bottomText: {
    fontSize: 20,
    color: colors.accent,
  },
  bottomTitleText: {
    fontSize: 15,
    color: colors.defaultText,
  },
  

});