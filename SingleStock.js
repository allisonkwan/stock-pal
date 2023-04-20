import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import styles from './Styles';
import { MyLineChart } from './components/MyLineChart';
import { SearchBar } from '@rneui/themed';
import { DataPoint } from "./components/DataPoint";
//import * as finhub from './node_modules/finnhub';

export default function App() {
  const datapoint0 = new DataPoint("Feb 00, 00:00", 830, 100.01, 277, 277, 277);
  const datapoint1 = new DataPoint("Feb 01, 01:00", 762, 111.11, 254, 254, 254);
  const datapoint2 = new DataPoint("Feb 02, 02:00", 810, 222.22, 270, 270, 270);
  const datapoint3 = new DataPoint("Feb 03, 03:00", 700, 333.33, 233, 233, 233);
  const datapoint4 = new DataPoint("Feb 04, 04:00", 723, 444.44, 241, 241, 241);
  const datapoint5 = new DataPoint("Feb 05, 05:00", 493, 555.55, 164, 164, 164);
  const datapoint6 = new DataPoint("Feb 06, 06:00", 677, 666.66, 225, 225, 225);
  const datapoint7 = new DataPoint("Feb 07, 07:00", 641, 777.77, 213, 213, 213);
  const datapoint8 = new DataPoint("Feb 08, 08:00", 509, 888.88, 169, 169, 169);
  const datapoint9 = new DataPoint("Feb 09, 09:00", 213, 999.99, 71, 71, 71);
  const datapoint10 = new DataPoint("Feb 10, 10:00", 198, 101.10, 66, 66, 66);
  const datapoint11 = new DataPoint("Feb 11, 11:00", 29, 110.11, 9, 9, 9);

  const masterDataPoints = [datapoint0, datapoint1, datapoint2, datapoint3, datapoint4, datapoint5, datapoint6, datapoint7, datapoint8, datapoint9, datapoint10, datapoint11];

  const [search, setSearch] = useState('AAPL'); // dynamic value which is updated as user types each letter in search bar
  const updateSearch = (search) => {
    setSearch(search);
  };
  const [stock, setStock] = useState('AAPL'); // the final value, updated when user hits "return" on mobile keyboard

  const [testData, setTestData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [datapoint0, datapoint1, datapoint2, datapoint3, datapoint4, datapoint5, datapoint6, datapoint7,
          datapoint8, datapoint9, datapoint10, datapoint11],
        ticker: stock
      },
    ],
  });

  const [dataPoints, setDataPoints] = useState([]);

  function filterChart(time, dataPoints) { 
    switch (time) {
    case '1D':
      setTestData({
        labels: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
        datasets: [
          {
            data: dataPoints,
            totalPeriod: 'Day',
            intervalSize: 'Hour',
            ticker: stock
          },
        ],
      });
      return;
    case '1W':
      setTestData({ 
        labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        datasets: [
          {
            data: dataPoints,
            totalPeriod: 'Week',
            intervalSize: 'Day',
            ticker: stock
          },
        ],
      });
      return;
    case '1M':
      setTestData({
        labels: ['Jan 1', 'Jan 10', 'Jan 20', 'Jan 30'],
        datasets: [
          {
            data: [datapoint0, datapoint1, datapoint2, datapoint3],
            totalPeriod: 'Month',
            intervalSize: 'Week',
            ticker: stock
          },
        ],
      });
      return;
    case '3M':
      setTestData({
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          {
            data: [datapoint0, datapoint1, datapoint2],
            totalPeriod: '3 Month',
            intervalSize: 'Month',
            ticker: stock
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
              datapoint8, datapoint9, datapoint10, datapoint11],
            totalPeriod: 'Year',
            intervalSize: 'Month',
            ticker: stock
          },
        ],
      });
      return;
    }
  }

  function ApiRequest(stockTicker, multiplier, timespan, from, to) {
    //var api = new ApiRequest(data);
    let apiRequest = new XMLHttpRequest();
    //console.log('hello')
    let polygon_api_key = "oHBzULapO1eRflaBEVlNkpED4qs9pFd0"
    let polygon_rest_baseurl = "https://api.polygon.io/v2/"
    let request_url = polygon_rest_baseurl + 'aggs/ticker/' + stockTicker + '/range/1/' + timespan + '/' + from + '/' + to + '?adjusted=true&sort=asc&limit=120&apiKey=' + polygon_api_key
    console.log(request_url)
    apiRequest.open("GET", request_url)
    apiRequest.send();
    apiRequest.onload = function () {
      dat = JSON.parse(this.response)
      //console.log(dat);
      //console.log(dat.results[0]);
      //console.log(dat.results[0].vw);
      //averageCost[0] = dat.results[0].vw;
      setAverageCost(dat.results[0].vw);
    }
    return;
  }
/*
  function GoogleApiRequest(stock, from_date, to_date) {
    let apiRequest = new XMLHttpRequest();
    //console.log('hello')
    let api_key = "cghr399r01qr8eo2mftgcghr399r01qr8eo2mfu0"
    //https://finnhub.io/api/v1/stock/social-sentiment?symbol=GME&from=2022-10-10&to=2022-10-16&token=cghr399r01qr8eo2mftgcghr399r01qr8eo2mfu0
    let rest_baseurl = "https://finnhub.io/api/v1/stock/social-sentiment?";
    let request_url = rest_baseurl + 'symbol=' + stock + '&from=' + from_date + '&to=' + to_date + '&token=' + api_key;
    //let request_url = "https://finnhub.io/api/v1/stock/social-sentiment?symbol=AAPL&token=cghr399r01qr8eo2mftgcghr399r01qr8eo2mfu0"
    console.log(request_url)
    apiRequest.open("GET", request_url)
    apiRequest.send();
    apiRequest.onload = function () {
      dat = JSON.parse(this.response)
      console.log(dat);
      console.log(dat.twitter);
      //console.log(dat.results[0].vw);
      //averageCost[0] = dat.results[0].vw;
      //setAverageCost(dat.results[0].vw);
    }
    

    //const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    //api_key.apiKey = "cghr399r01qr8eo2mftgcghr399r01qr8eo2mfu0" // Replace this
    //const finnhubClient = new finnhub.DefaultApi()
    //finnhubClient.socialSentiment('GME', (error, data, response) => {
    //  console.log(data);
    //});
    return;
  }*/

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
  const [mentionsData, setMentionsData] = useState([1, 2, 3, 4, 5]);

  function updateDataPoints(mentionsData, masterDataPoints) {
    if (radioButtons == '1D') {
    const today = new Date();
    const ytd = new Date(today);
    today.setDate(today.getDate() - 1);
    ytd.setDate(today.getDate() - 1);
    let today_string = today.toISOString().split('T')[0];
    let ytd_string = ytd.toISOString().split('T')[0];

    // fetch reddit mention graph data points
    let apiRequest = new XMLHttpRequest();
    let api_key = "cghr399r01qr8eo2mftgcghr399r01qr8eo2mfu0"
    let rest_baseurl = "https://finnhub.io/api/v1/stock/social-sentiment?";
    let request_url = rest_baseurl + 'symbol=' + stock + '&from=' + ytd_string + '&to=' + ytd_string + '&token=' + api_key;
    apiRequest.open("GET", request_url)
    apiRequest.send();
    apiRequest.onload = function () {
      dat = JSON.parse(this.response)
      console.log(dat);
      //console.log(dat.reddit[0].atTime);
      
      let point0 = 0;
      let point1 = 0;
      let point2 = 0;
      let point3 = 0;
      let point4 = 0;
      let first_time = ytd_string + ' 09:00:00';
      let second_time = ytd_string + ' 11:00:00';
      let third_time = ytd_string + ' 13:00:00';
      let fourth_time = ytd_string + ' 15:00:00';
      let fifth_time = ytd_string + ' 17:00:00';

        //console.log(dat.reddit[0].atTime)
        //console.log(ytd_string);

      // aggregate and calculate actual points
      for (let i = 0; i < dat.reddit.length; i++)
      {
        if(dat.reddit[i].atTime < first_time) {
          point0 = point0 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < second_time) {
          point1 = point1 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < third_time) {
          point2 = point2 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < fourth_time) {
          point3 = point3 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < fifth_time) {
          point4 = point4 + dat.reddit[i].mention;
        } 
      }
      
      console.log(point0);
      console.log(point1);
      console.log(point2);
      console.log(point3);
      console.log(point4);
      setMentionsData([point0, point1, point2, point3, point4]);
    }
    // stock price call
    //ApiRequest('AAPL', '1', 'week', last_week_string, today_string);
  } else if (radioButtons == '1W') {
    const today = new Date();
    const last_week = new Date(today);
    last_week.setDate(today.getDate() - 7);
    let today_string = today.toISOString().split('T')[0];
    let last_week_string = last_week.toISOString().split('T')[0];
    console.log(last_week_string)
    
    // fetch reddit mention graph data points
    let apiRequest = new XMLHttpRequest();
    let api_key = "cghr399r01qr8eo2mftgcghr399r01qr8eo2mfu0"
    let rest_baseurl = "https://finnhub.io/api/v1/stock/social-sentiment?";
    let request_url = rest_baseurl + 'symbol=' + stock + '&from=' + last_week_string + '&to=' + today_string + '&token=' + api_key;
    apiRequest.open("GET", request_url)
    apiRequest.send();
    apiRequest.onload = function () {
      dat = JSON.parse(this.response)
      console.log(dat);
      console.log(request_url);
      
      let point0 = 0;
      let point1 = 0;
      let point2 = 0;
      let point3 = 0;
      let point4 = 0;
      let point5 = 0;
      let point6 = 0;

      let first_time = new Date(today);
      first_time.setDate(today.getDate() - 6);
      let temp1 = first_time.toISOString().split('T')[0];
      
      let second_time = new Date(today);
      second_time.setDate(today.getDate() - 5);
      let temp2 = second_time.toISOString().split('T')[0];

      let third_time = new Date(today);
      third_time.setDate(today.getDate() - 4);
      let temp3 = third_time.toISOString().split('T')[0];

      let fourth_time = new Date(today);
      fourth_time.setDate(today.getDate() - 3);
      let temp4 = fourth_time.toISOString().split('T')[0];
      
      let fifth_time = new Date(today);
      fifth_time.setDate(today.getDate() - 2);
      let temp5 = fifth_time.toISOString().split('T')[0];
      
      let sixth_time = new Date(today);
      sixth_time.setDate(today.getDate() - 1);
      let temp6 = sixth_time.toISOString().split('T')[0];

      // aggregate and calculate actual points
      for (let i = 0; i < dat.reddit.length; i++)
      {
        //console.log(dat.reddit[i].atTime)
        //console.log(first_time)
        let temp = dat.reddit[i].atTime;
        let temp_here = temp.substring(0,10)

        if(temp_here == temp1) {
          point0 = point0 + dat.reddit[i].mention;
        } else if (temp_here == temp2) {
          point1 = point1 + dat.reddit[i].mention;
        } else if (temp_here == temp3) {
          point2 = point2 + dat.reddit[i].mention;
        } else if (temp_here == temp4) {
          point3 = point3 + dat.reddit[i].mention;
        } else if (temp_here == temp5) {
          point4 = point4 + dat.reddit[i].mention;
        } else if (temp_here == temp6) {
          point5 = point5 + dat.reddit[i].mention;
        } else {
          point6 = point6 + dat.reddit[i].mention;
        } 
      }
      
      console.log(point0);
      console.log(point1);
      console.log(point2);
      console.log(point3);
      console.log(point4);
      console.log(point5);
      console.log(point6);
      setMentionsData([point0, point1, point2, point3, point4, point5, point6]);
    // stock price call
    //ApiRequest('AAPL', '1', 'week', last_week_string, today_string);
    }
  } else if (radioButtons == '1M') {
    const today = new Date();
    const last_month = new Date(today);
    last_month.setMonth(today.getMonth() - 1);
    let today_string = today.toISOString().split('T')[0];
    let last_month_string = last_month.toISOString().split('T')[0];
    console.log(last_month_string)

    // fetch reddit mention graph data points
    let apiRequest = new XMLHttpRequest();
    let api_key = "cghr399r01qr8eo2mftgcghr399r01qr8eo2mfu0"
    let rest_baseurl = "https://finnhub.io/api/v1/stock/social-sentiment?";
    let request_url = rest_baseurl + 'symbol=' + stock + '&from=' + last_month_string + '&to=' + today_string + '&token=' + api_key;
    apiRequest.open("GET", request_url)
    apiRequest.send();
    apiRequest.onload = function () {
      dat = JSON.parse(this.response)
      console.log(dat);
      console.log(request_url);
      
      let point0 = 0;
      let point1 = 0;
      let point2 = 0;
      let point3 = 0;

      let first_time = new Date(today);
      first_time.setDate(today.getDate() - 21);
      let temp1 = first_time.toISOString().split('T')[0];
      temp1 = temp1 + ' 00:00:00';

      let second_time = new Date(today);
      second_time.setDate(today.getDate() - 14);
      let temp2 = second_time.toISOString().split('T')[0];
      temp2 = temp2 + ' 00:00:00';

      let third_time = new Date(today);
      third_time.setDate(today.getDate() - 7);
      let temp3 = third_time.toISOString().split('T')[0];
      temp3 = temp3 + ' 00:00:00';

      // aggregate and calculate actual points
      for (let i = 0; i < dat.reddit.length; i++)
      {
        let temp = new Date(dat.reddit[i].atTime);
        let temp_here = temp.toISOString().split('T')[0];

        if(dat.reddit[i].atTime < temp1) {
          point0 = point0 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp2) {
          point1 = point1 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp3) {
          point2 = point2 + dat.reddit[i].mention;
        } else {
          console.log(dat.reddit[i].atTime)
          point3 = point3 + dat.reddit[i].mention;
        }
      }
      
      console.log(point0);
      console.log(point1);
      console.log(point2);
      console.log(point3);
      setMentionsData([point0, point1, point2, point3]);
    }
    //ApiRequest('AAPL','7', 'day',last_month_string,today_string);
  } else if (radioButtons == '3M') {
    const today = new Date();
    const three_month = new Date(today);
    three_month.setMonth(today.getMonth() - 3);
    let today_string = today.toISOString().split('T')[0];
    let three_month_string = three_month.toISOString().split('T')[0];
    console.log(three_month_string)

    // fetch reddit mention graph data points
    let apiRequest = new XMLHttpRequest();
    let api_key = "cghr399r01qr8eo2mftgcghr399r01qr8eo2mfu0"
    let rest_baseurl = "https://finnhub.io/api/v1/stock/social-sentiment?";
    let request_url = rest_baseurl + 'symbol=' + stock + '&from=' + three_month_string + '&to=' + today_string + '&token=' + api_key;
    apiRequest.open("GET", request_url)
    apiRequest.send();
    apiRequest.onload = function () {
      dat = JSON.parse(this.response)
      console.log(dat);
      console.log(request_url);
      
      let point0 = 0;
      let point1 = 0;
      let point2 = 0;

      let first_time = new Date(today);
      first_time.setDate(today.getDate() - 60);
      let temp1 = first_time.toISOString().split('T')[0];
      temp1 = temp1 + ' 00:00:00';

      let second_time = new Date(today);
      second_time.setDate(today.getDate() - 30);
      let temp2 = second_time.toISOString().split('T')[0];
      temp2 = temp2 + ' 09:00:00';

      // aggregate and calculate actual points
      for (let i = 0; i < dat.reddit.length; i++)
      {
        let temp = new Date(dat.reddit[i].atTime);
        let temp_here = temp.toISOString().split('T')[0];

        if(dat.reddit[i].atTime < temp1) {
          point0 = point0 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp2) {
          point1 = point1 + dat.reddit[i].mention;
        } else {
          point2 = point2 + dat.reddit[i].mention;
        } 
      }
      console.log(temp1)
      console.log(temp2)
      console.log(point0);
      console.log(point1);
      console.log(point2);
      setMentionsData([point0, point1, point2]);
    }

    // stock price call
    //ApiRequest('AAPL','3', 'month',three_month_string,today_string);
  } else if (radioButtons == '1Y') {
    const today = new Date();
    const last_year = new Date(today);

    last_year.setFullYear(today.getFullYear() - 1);
    //console.log(today.getFullYear()-1)
    let today_string = today.toISOString().split('T')[0];
    let last_year_string = last_year.toISOString().split('T')[0];
    console.log(last_year_string)

    // fetch reddit mention graph data points
    let apiRequest = new XMLHttpRequest();
    let api_key = "cghr399r01qr8eo2mftgcghr399r01qr8eo2mfu0"
    let rest_baseurl = "https://finnhub.io/api/v1/stock/social-sentiment?";
    let request_url = rest_baseurl + 'symbol=' + stock + '&from=' + last_year_string + '&to=' + today_string + '&token=' + api_key;
    apiRequest.open("GET", request_url)
    apiRequest.send();
    apiRequest.onload = function () {
      dat = JSON.parse(this.response)
      console.log(dat);
      console.log(request_url);
      
      let point0 = 0;
      let point1 = 0;
      let point2 = 0;
      let point3 = 0;
      let point4 = 0;
      let point5 = 0;
      let point6 = 0;
      let point7 = 0;
      let point8 = 0;
      let point9 = 0;
      let point10 = 0;
      let point11 = 0;

      let first_time = new Date(today);
      first_time.setDate(today.getDate() - 330);
      let temp1 = first_time.toISOString().split('T')[0];
      temp1 = temp1 + ' 00:00:00';

      let second_time = new Date(today);
      second_time.setDate(today.getDate() - 300);
      let temp2 = second_time.toISOString().split('T')[0];
      temp2 = temp2 + ' 09:00:00';

      let third_time = new Date(today);
      third_time.setDate(today.getDate() - 270);
      let temp3 = third_time.toISOString().split('T')[0];
      temp3 = temp3 + ' 00:00:00';

      let fourth_time = new Date(today);
      fourth_time.setDate(today.getDate() - 240);
      let temp4 = fourth_time.toISOString().split('T')[0];
      temp4 = temp4 + ' 00:00:00';

      let fifth_time = new Date(today);
      fifth_time.setDate(today.getDate() - 210);
      let temp5 = fifth_time.toISOString().split('T')[0];
      temp5 = temp5 + ' 00:00:00';

      let sixth_time = new Date(today);
      sixth_time.setDate(today.getDate() - 180);
      let temp6 = sixth_time.toISOString().split('T')[0];
      temp6 = temp6 + ' 00:00:00';

      let seventh_time = new Date(today);
      seventh_time.setDate(today.getDate() - 150);
      let temp7 = seventh_time.toISOString().split('T')[0];
      temp7 = temp7 + ' 00:00:00';

      let eighth_time = new Date(today);
      eighth_time.setDate(today.getDate() - 120);
      let temp8 = eighth_time.toISOString().split('T')[0];
      temp8 = temp8 + ' 00:00:00';

      let ninth_time = new Date(today);
      ninth_time.setDate(today.getDate() - 90);
      let temp9 = ninth_time.toISOString().split('T')[0];
      temp9 = temp9 + ' 00:00:00';

      let tenth_time = new Date(today);
      tenth_time.setDate(today.getDate() - 60);
      let temp10 = tenth_time.toISOString().split('T')[0];
      temp10 = temp10 + ' 00:00:00';

      let eleventh_time = new Date(today);
      ninth_time.setDate(today.getDate() - 30);
      let temp11 = eleventh_time.toISOString().split('T')[0];
      temp11 = temp11 + ' 00:00:00';

      // aggregate and calculate actual points
      for (let i = 0; i < dat.reddit.length; i++)
      {
        let temp = new Date(dat.reddit[i].atTime);
        let temp_here = temp.toISOString().split('T')[0];

        if(dat.reddit[i].atTime < temp1) {
          point0 = point0 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp2) {
          point1 = point1 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp3) {
          point2 = point2 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp4) {
          point3 = point3 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp5) {
          point4 = point4 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp6) {
          point5 = point5 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp7) {
          point6 = point6 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp8) {
          point7 = point7 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp9) {
          point8 = point8 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp10) {
          point9 = point9 + dat.reddit[i].mention;
        } else if (dat.reddit[i].atTime < temp11) {
          point10 = point10 + dat.reddit[i].mention;
        } else {
          point11 = point11 + dat.reddit[i].mention;
        } 
      }
      console.log(point0);
      console.log(point1);
      console.log(point2);
      console.log(point3);
      console.log(point4);
      console.log(point5);
      console.log(point6);
      console.log(point7);
      console.log(point8);
      console.log(point9);
      console.log(point10);
      console.log(point11);
      setMentionsData([point0, point1, point2, point3, point4, point5, point6, point7, point8, point9, point10, point11]);
    }
    // stock price call
    //ApiRequest('AAPL','1', 'year',last_year_string,today_string);
  }
  const dataPointsTemp = [];
  for (let i = 0; i < mentionsData.length; i++) {
    dataPointsTemp.push(new DataPoint(masterDataPoints[i].timestamp, mentionsData[i], masterDataPoints[i].cost, masterDataPoints[i].googleData, masterDataPoints[i].redditData, masterDataPoints[i].twitterData));
  } 
  setDataPoints(dataPointsTemp);
 }

  useEffect(() => {
    updateDataPoints(mentionsData, masterDataPoints);
    filterChart(radioButtons, dataPoints);
  }, [radioButtons]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          onSubmitEditing={() => setStock(search)}
          value={search}
        />
        <Text style={styles.title}>{stock}</Text>
        <Text style={styles.title}>${currStockPrice}</Text>
        <View>
          <Text style={{alignSelf: 'flex-end'}}>You selected: {radioButtons}</Text>
          <RadioGroup
              radioButtons={radioButtonsData}
              onPress={(value) => {
                setValue(value);
              }}
              containerStyle={styles.radio}
              layout='row'
          />
        </View>
        <MyLineChart data={testData} />
      </ScrollView>
    </SafeAreaView>
  );
}