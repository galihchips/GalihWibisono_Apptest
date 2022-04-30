import React, {Component} from 'react';
import {View} from 'react-native';
import store from './App/store';
import {Provider} from 'react-redux';
import Main from './App/Main';
import Edit from './App/Main/Edit';
import Add from './App/Main/Add';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="add" component={Add} />
        <Stack.Screen name="edit" component={Edit} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
