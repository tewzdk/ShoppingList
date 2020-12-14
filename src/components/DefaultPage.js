import React from 'react';
import { View, StatusBar, StyleSheet, ImageBackground } from 'react-native';
import { colors } from '../assets/colors'
import { styles } from '../styles/globalStyles'
export default function DefaultPage(props) {
  const { children, backgroundImg } = props;
  return(
    <ImageBackground source={backgroundImg} imageStyle={styles.bgImageStyle} style={styles.bgStyle}>

    <View style={styles.container(backgroundImg ? true : false)}>
        <StatusBar backgroundColor={colors.statusBar}/>
        {children}
    </View>
    </ImageBackground>
  );
}

