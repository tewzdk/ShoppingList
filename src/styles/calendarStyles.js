import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../assets/colors';

export const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,

  },
  dayText: {
    color: colors.defaultText
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
  finishBtn: {
    width: '20%',
    backgroundColor: colors.statusBar,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addNumberText: {
    fontSize: 15,
    color: colors.defaultText,
  },
  eventTitle: {
    color: colors.defaultText,
    textAlign: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.statusBar,
    fontSize: 25,
    fontFamily: '',
  },
  eventLine: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.statusBar,
  },
  eventTopLine: {
    flexDirection: 'row',
  },
  eventTimeText: {
    paddingHorizontal: 10,
    color: colors.defaultText
  },
  eventText: {
    color: colors.defaultText,
    flexWrap: 'wrap',
  },
  authorText: {
    color: colors.accent,
  },
  textSeparator: {
    paddingRight: 10,
    color: colors.defaultText
  },
  noEventsText: {
    color: colors.defaultText
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
      paddingHorizontal: 10,
      paddingVertical: padding,
      color: colors.defaultText
    }

  }
});