import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../assets/colors'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flexContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',

    justifyContent: 'center'
  },
  bottomContainer: {
    height: 15,
    width: '100%',
    backgroundColor: colors.statusBar,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  loginBtn: {
    width: 250,
    height: 50
  },
  titleText: {
    fontFamily: '',
    fontSize: 30,
    color: colors.defaultText,
    paddingBottom: 20,
    paddingHorizontal: 20,
    textAlign: 'center'
  },
  text: {
    color: colors.defaultText,
    paddingHorizontal: 50,
    textAlign: 'center'

  },
  image: {
    width: 200,
    height: 270,
  },
  

});