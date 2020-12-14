import React, { useEffect, useCallback, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

import { setCurrentUser, onGoogleSignOut } from '../services/FirebaseHandler';
import { getShoppingList, getHintList } from '../services/GroceriesHandler';
import { colors } from '../assets/colors'
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Drinks from '../screens/Drinks';
import Calendar from '../screens/Calendar';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();

export default function Auth() {
  const [loggedIn, setLoggedIn] = useState(false); 
  const [initialized, setInitialized] = useState(false);

  /**
   * useCallback function to set the state of the current logged in user
   */
  const changeLoginState = useCallback(
    (googleUser) => {
      if (googleUser) {
        setLoggedIn(true)
        setCurrentUser(googleUser)
      } else {
        setLoggedIn(false)
      }
    },
    [setLoggedIn],
  );
  
  /**
   * Listener for changing authentication state
   */
  useEffect(() => {
    auth().onAuthStateChanged(changeLoginState);
  }, [changeLoginState]);

  /**
   * Firebase onsnapshotlisteners
   */
  useEffect(() => {
    let unsubscribe = () => {};
    let unsubscribeHints = () => {};

    getHintList((func) => {
      unsubscribeHints = func;
    });

    getShoppingList((func) => {
      unsubscribe = func;
    });
    return () => {
      unsubscribe();
      unsubscribeHints();
    }
  },[loggedIn])

  /**
   * Signed in navigation
   */
  function signedIn() {
    return(
      <>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Madliste') {
              iconName = focused ? 'receipt' : 'receipt-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-sharp';
            }  else if (route.name === 'Mine drinks') {
              iconName = focused ? 'beer' : 'beer-outline';
            } else if(route.name ==='Kalender') {
              iconName = focused ? 'calendar' : 'calendar-outline'
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: colors.defaultText,
          activeBackgroundColor: colors.statusBar,
          inactiveBackgroundColor: colors.statusBar,
          style: {
            borderTopColor: 'translucent'
          }
        }}
      >
        <Tab.Screen name="Madliste" component={Home} />
        <Tab.Screen name="Kalender" component={Calendar} />
        <Tab.Screen name="Mine drinks" component={Drinks} />
        <Tab.Screen name="Settings" component={Settings} />

      </Tab.Navigator>
    </NavigationContainer>
    
    </>
    )
  }

  /**
   * Signed out pages
   */
  function signedOut() {
    return(
      <Login/>
    )
  }


return <>{loggedIn ? signedIn() : signedOut()}</>;
}