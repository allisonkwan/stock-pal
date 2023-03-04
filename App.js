import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import styles from './Styles';
import { MyLineChart } from './components/MyLineChart';
import { CostAndTraction } from "./components/CostAndTraction";
import {MentionsBreakdown} from "./components/MentionsBreakdown";

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
  
  let averageCost = new Array(1);
  function ApiRequest( stockTicker, multiplier, timespan, from, to ) {
    //var api = new ApiRequest(data);
    let apiRequest = new XMLHttpRequest();
    console.log('hello')
    let polygon_api_key = "oHBzULapO1eRflaBEVlNkpED4qs9pFd0"
    let polygon_rest_baseurl = "https://api.polygon.io/v2/"
    let request_url = polygon_rest_baseurl+'aggs/ticker/'+stockTicker+'/range/1/'+timespan+'/'+from+'/'+to+'?adjusted=true&sort=asc&limit=120&apiKey='+polygon_api_key
    console.log(request_url)
    apiRequest.open("GET", request_url)
    apiRequest.send();
    apiRequest.onload = function() {
        dat = JSON.parse(this.response)
        console.log(dat);
        console.log(dat.results[0]);
        console.log(dat.results[0].vw);
        averageCost[0] = dat.results[0].vw;
    }
    return;
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

  if (radioButtons == '1D') {
    const today = new Date();
    const ytd =  new Date(today);
    today.setDate(today.getDate()-1);
    ytd.setDate(today.getDate()-1);
    let today_string = today.toISOString().split('T')[0];
    let ytd_string = ytd.toISOString().split('T')[0];
    //console.log(ytd_string);
    //ApiRequest('AAPL', '1', 'day',ytd_string,today_string);
  } else if (radioButtons == '1W') {
    const today = new Date();
    const last_week =  new Date(today);
    last_week.setDate(today.getDate()-7);
    let today_string = today.toISOString().split('T')[0];
    let last_week_string = last_week.toISOString().split('T')[0];
    console.log(last_week_string)
    ApiRequest('AAPL','1', 'week',last_week_string,today_string);
  } else if (radioButtons == '1M') {
    const today = new Date();
    const last_month =  new Date(today);
    last_month.setMonth(today.getMonth()-1);
    let today_string = today.toISOString().split('T')[0];
    let last_month_string = last_month.toISOString().split('T')[0];
    console.log(last_month_string)
    //ApiRequest('AAPL','7', 'day',last_month_string,today_string);
  } else if (radioButtons == '3M') {
    const today = new Date();
    const three_month =  new Date(today);
    three_month.setMonth(today.getMonth()-3);
    let today_string = today.toISOString().split('T')[0];
    let three_month_string = three_month.toISOString().split('T')[0];
    console.log(three_month_string)
    //ApiRequest('AAPL','3', 'month',three_month_string,today_string);
  } else if (radioButtons == '1Y') {
    const today = new Date();
    const last_year =  new Date(today);
    
    last_year.setFullYear(today.getFullYear()-1);
    //console.log(today.getFullYear()-1)
    let today_string = today.toISOString().split('T')[0];
    let last_year_string = last_year.toISOString().split('T')[0];
    console.log(last_year_string)
    //ApiRequest('AAPL','1', 'year',last_year_string,today_string);
  }
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
          <Text style={styles.dataPointTimestamp}>Feb 11, 4:00 PM</Text>
          <CostAndTraction data={['Today', 'Hour', averageCost, 153.65, "2M", "79K"]} />
          <MentionsBreakdown data={['Hour', 70000]} />
        </View>
      </View>
    </SafeAreaView>
  );
}