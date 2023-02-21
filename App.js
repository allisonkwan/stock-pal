import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import style from './App.module.css';
import { MyLineChart } from './components/MyLineChart';

export default function App() {

  const testData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [830, 762, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 29]
      },
    ],
  };
  const currStockPrice = 151.23;
  const radioButtonsData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '1D',
      value: '1D',
    },
    {
      id: '2',
      label: '1W',
      value: '1W',
    },
    {
      id: '3',
      label: '1M',
      value: '1M',
    },
    {
      id: '4',
      label: '3M',
      value: '3M',
    },
    {
      id: '5',
      label: '1Y',
      value: '1Y',
    },
    {
      id: '6',
      label: '5Y',
      value: '5Y',
    },
  ];
  const [radioButtons, setRadioButtons] = useState('1D'); //pass in our data to this state. This will store the current user's choice
  const setValue = (value) => {
    var newArray = value.filter((item) => item.selected === true); //get the items that are selected
    setRadioButtons(newArray[0].value); //set the selected value in this Hook
  };

  return (
    <SafeAreaView style={style.container}>
      <View>
        <StatusBar style="auto" />
        <Text>APPL</Text>
        <Text>${currStockPrice}</Text>

        <MyLineChart data={testData} />
        <View>
          <RadioGroup
            radioButtons={radioButtonsData}
            onPress={(value) => setValue(value)}
            containerStyle={style.radio}
            layout='row'
          />
          <Text>You selected: {radioButtons}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}