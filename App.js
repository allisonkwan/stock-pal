import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import styles from './Styles';
import { MyLineChart } from './components/MyLineChart';
import { CostAndTraction } from "./components/CostAndTraction";
import {MentionsBreakdown} from "./components/MentionsBreakdown";
import {DataPoint} from "./components/DataPoint";

export default function App() {
  const datapoint0 = new DataPoint("Feb 00, 00:00", 830);
  const datapoint1 = new DataPoint("Feb 01, 01:00", 762);
  const datapoint2 = new DataPoint("Feb 02, 02:00", 810);
  const datapoint3 = new DataPoint("Feb 03, 03:00", 700);
  const datapoint4 = new DataPoint("Feb 04, 04:00", 723);
  const datapoint5 = new DataPoint("Feb 05, 05:00", 493);
  const datapoint6 = new DataPoint("Feb 06, 06:00", 677);
  const datapoint7 = new DataPoint("Feb 07, 07:00", 641);
  const datapoint8 = new DataPoint("Feb 08, 08:00", 509);
  const datapoint9 = new DataPoint("Feb 09, 09:00", 213);
  const datapoint10 = new DataPoint("Feb 10, 10:00", 198);
  const datapoint11 = new DataPoint("Feb 11, 11:00", 29);

  const [testData, setTestData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [datapoint0, datapoint1, datapoint2, datapoint3, datapoint4, datapoint5, datapoint6, datapoint7,
          datapoint8, datapoint9, datapoint10, datapoint11]
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
              data: [datapoint0, datapoint1, datapoint2, datapoint3, datapoint4]
            },
          ],
        });
        return;
      case '1W':
        setTestData({
          labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
          datasets: [
            {
              data: [datapoint0, datapoint1, datapoint2, datapoint3, datapoint4, datapoint5, datapoint6]
            },
          ],
        });
        return;
      case '1M':
        setTestData({
          labels: ['Jan 1', 'Jan 10', 'Jan 20', 'Jan 30'],
          datasets: [
            {
              data: [datapoint0, datapoint1, datapoint2, datapoint3]
            },
          ],
        });
        return;
      case '3M':
        setTestData({
          labels: ['Jan', 'Feb', 'Mar'],
          datasets: [
            {
              data: [datapoint0, datapoint1, datapoint2]
            },
          ],
        });
        return;
      case '1Y':
        setTestData({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              data: [datapoint0, datapoint1, datapoint2, datapoint3, datapoint4, datapoint5, datapoint6, datapoint7,
                datapoint8, datapoint9, datapoint10, datapoint11]
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
        <View>
          <Text style={styles.dataPointTimestamp}>{timestamp}</Text>
          <CostAndTraction data={['Today', 'Hour', 151.53, 153.65, "2M", "79K"]} />
          <MentionsBreakdown data={['Hour', 70000]} />
        </View>
      </View>
    </SafeAreaView>
  );
}

let timestamp = "Feb 11, 4:00 PM";
export function updateTimeStamp(newTimestamp) {
  timestamp = newTimestamp;
}