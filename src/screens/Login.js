import React from 'react';
import {View, Text} from 'react-native';
import { onGoogleButtonPress} from '../services/FirebaseHandler';
import {GoogleSigninButton} from '@react-native-community/google-signin';

import bg from '../images/bg.jpg';
import { styles } from '../styles/loginStyles'
import DefaultPage from '../components/DefaultPage';
export default function Home() {

  
  return (
    <DefaultPage backgroundImg={bg}>
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titleText}>Velkommen til Shoppinglisten</Text>
        <Text style={styles.text}>Denne app giver adgang til en shoppingliste, kalender og personlig tæller</Text>

      </View>
      <View style={styles.flexContainer}>
        <GoogleSigninButton
          style={styles.loginBtn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => onGoogleButtonPress()}
        />
      </View>
      <View style={styles.bottomContainer}>

      </View>
    </View>
    </DefaultPage>
  )
}