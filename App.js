/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import HomePage from './src/modules/HomePage'


const App: () => React$Node = () => {
  return (
    <HomePage />
      
  );
};


export default App;
