import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import styles from './Styles';
import { MyLineChart } from './components/MyLineChart';

export default function App() {

  const [testData, setTestData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [830, 762, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 29]
      },
    ],
  });
  function filterChart(time) {
    switch (time) {
      case '1D':
        setTestData({
          labels: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
          datasets: [
            {
              data: [830, 762, 810, 700, 723]
            },
          ],
        });
        return;
      case '1W':
        setTestData({
          labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
          datasets: [
            {
              data: [830, 762, 810, 700, 723, 493, 677]
            },
          ],
        });
        return;
      case '1M':
        setTestData({
          labels: ['Jan 1', 'Jan 10', 'Jan 20', 'Jan 30'],
          datasets: [
            {
              data: [509, 213, 335, 805]
            },
          ],
        });
        return;
      case '3M':
        setTestData({
          labels: ['Jan', 'Feb', 'Mar'],
          datasets: [
            {
              data: [509, 213, 335]
            },
          ],
        });
        return;
      case '1Y':
        setTestData({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              data: [830, 762, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 29]
            },
          ],
        });
        return;
    }
  }
  const stockName = 'APPL';
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
  ];
  const [radioButtons, setRadioButtons] = useState('1Y'); //pass in our data to this state. This will store the current user's choice
  const setValue = (value) => {
    var newArray = value.filter((item) => item.selected === true); //get the items that are selected
    setRadioButtons(newArray[0].value); //set the selected value in this Hook
  };

  useEffect(() => {
    filterChart(radioButtons);
  }, [radioButtons]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <StatusBar style="auto" />
        <Text style={styles.title}>{stockName}</Text>
        <Text style={styles.title}>${currStockPrice}</Text>

        <MyLineChart data={testData} />
        <View>
          <RadioGroup
            radioButtons={radioButtonsData}
            onPress={(value) => {
              setValue(value);
            }}
            containerStyle={styles.radio}
            layout='row'
          />
          <Text>You selected: {radioButtons}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}