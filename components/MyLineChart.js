import { View, Dimensions, Text } from 'react-native'
import React, { useState } from 'react'
import { LineChart } from 'react-native-chart-kit'
import styles from "../Styles";
import {CostAndTraction} from "./CostAndTraction";
import {MentionsBreakdown} from "./MentionsBreakdown";

export function MyLineChart({ data }) {
    const dataValues = getDataValues(data);
    const totalPeriod = data.datasets[0].totalPeriod;
    const intervalSize = data.datasets[0].intervalSize;
    const timestamps = dataValues.datasets[0].timestamp;
    const values = dataValues.datasets[0].data;
    const costs = dataValues.datasets[0].cost;
    const googleDatas = dataValues.datasets[0].googleData
    const redditDatas = dataValues.datasets[0].redditData
    const twitterDatas = dataValues.datasets[0].twitterData
    const maxIndex = dataValues.labels.length - 1 ;
    const averageCost = calculateAverage(costs);
    const totalTraction = calculateSum(values);

    const [timestamp, setTimestamp] = useState(timestamps[maxIndex]);
    const [value, setValue] = useState(values[maxIndex]);
    const [cost, setCost] = useState(costs[maxIndex]);
    const [googleData, setGoogleData] = useState(googleDatas[maxIndex]);
    const [redditData, setRedditData] = useState(redditDatas[maxIndex]);
    const [twitterData, setTwitterData] = useState(twitterDatas[maxIndex]);

    return (
        <View>
            <LineChart
                onDataPointClick={
                    (data) => {
                        const dataPointIndex = data.index;
                        setTimestamp(timestamps[dataPointIndex]);
                        setValue(values[dataPointIndex]);
                        setCost(costs[dataPointIndex]);
                        setGoogleData(googleDatas[dataPointIndex]);
                        setRedditData(redditDatas[dataPointIndex]);
                        setTwitterData(twitterDatas[dataPointIndex]);
                    }
                }
                data={dataValues}
                width={Dimensions.get('window').width}
                height={200}
                chartConfig={{
                    backgroundGradientFrom: 'darkblue',
                    backgroundGradientTo: 'blue',
                    color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
                }}
            />
            <Text style={styles.dataPointTimestamp}>{timestamp}</Text>
            <CostAndTraction data={[totalPeriod, intervalSize, averageCost, cost, totalTraction, value]} />
            <View>
                <MentionsBreakdown data={[intervalSize, googleData, redditData, twitterData]} />
            </View>
        </View>
    )
}

function getDataValues(data) {
    const dataPoints = data.datasets[0].data;
    const dataValues = [];
    dataPoints.forEach(dataPoint => dataValues.push(dataPoint.value));
    const timestamps = [];
    dataPoints.forEach(dataPoint => timestamps.push(dataPoint.timestamp));
    const costs = [];
    dataPoints.forEach(dataPoint => costs.push(dataPoint.cost));
    const googleDatas = [];
    dataPoints.forEach(dataPoint => googleDatas.push(dataPoint.googleData));
    const redditDatas = [];
    dataPoints.forEach(dataPoint => redditDatas.push(dataPoint.redditData));
    const twitterDatas = [];
    dataPoints.forEach(dataPoint => twitterDatas.push(dataPoint.twitterData));

    const cleanedData = {
        labels: data.labels,
        datasets: [{
            data: dataValues,
            timestamp: timestamps,
            cost: costs,
            googleData: googleDatas,
            redditData: redditDatas,
            twitterData: twitterDatas
        }]
    }
    return cleanedData;
}

function calculateAverage(list) {
    const sum = calculateSum(list);
    const avg = sum / list.length;
    return Math.round(avg * 100) / 100;
}

function calculateSum(list) {
    let sum = 0;
    list.forEach(num => sum += num);
    return sum;
}