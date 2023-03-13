import 'react-native-gesture-handler';
import React from 'react';
import styles from './Styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import SingleStock from './SingleStock';

const Stack = createStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
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