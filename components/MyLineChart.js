import { View, Dimensions, Text } from 'react-native'
import React, { useState } from 'react'
import { LineChart } from 'react-native-chart-kit'
import styles from "../Styles";

export function MyLineChart({ data }) {
    const dataValues = getDataValues(data);
    const [timestamp, setTimestamp] = useState('Feb 11, 4:00 PM');
    return (
        <View>
            <LineChart
                onDataPointClick={
                    (data) => {
                        //console.log(data);
                        const dataPointIndex = data.index;
                        //const timestamp = data.dataset.timestamp[dataPointIndex];
                        setTimestamp(data.dataset.timestamp[dataPointIndex]);
                        //console.log(timestamp);
                        //updateTimeStamp(timestamp);
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
        </View>
    )
}

function getDataValues(data) {
    const dataPoints = data.datasets[0].data;
    const dataValues = [];
    dataPoints.forEach(dataPoint => dataValues.push(dataPoint.value));
    const timestamps = [];
    dataPoints.forEach(dataPoint => timestamps.push(dataPoint.timestamp));

    const cleanedData = {
        labels: data.labels,
        datasets: [{
            data: dataValues,
            timestamp: timestamps
        }]
    }
    return cleanedData;
}