import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import Auth from './src/navigation/Auth';
import { Provider } from 'react-redux';
import store from './src/redux/store';
export default function App() {
  return (
    <Provider store={store}>
      <Auth/>
    </Provider>
  );
}
