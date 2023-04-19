import 'react-native-gesture-handler';
import React from 'react';
import styles from './Styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import SingleStock from './SingleStock';
import { StyleSheet, Text, View} from 'react-native'
import AuthenticationScreen from './AuthenticationScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Authentication">
          <Stack.Screen
            options={{title: 'Trade Joes'}}
            name="Authentication"
            component={AuthenticationScreen}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Stock Details"
            component={SingleStock}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
