import {View, Dimensions} from 'react-native'
import React, { useState } from 'react'
import { LineChart } from 'react-native-chart-kit'
import Svg, {Rect, Text as TextSVG} from "react-native-svg";

export function MyLineChart({ data }) {
    const dataValues = getDataValues(data);
    let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })

    return (
            <LineChart
                data={dataValues}
                width={Dimensions.get('window').width}
                height={200}
                yAxisLabel={'$'}
                chartConfig={{
                    backgroundGradientFrom: 'darkblue',
                    backgroundGradientTo: 'blue',
                    color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
                }}

                decorator={() => {
                    return tooltipPos.visible ? <View>
                        <Svg>
                            <Rect x={tooltipPos.x - 15}
                                  y={tooltipPos.y + 10}
                                  width="40"
                                  height="30"
                                  fill="black" />
                            <TextSVG
                                x={tooltipPos.x + 5}
                                y={tooltipPos.y + 30}
                                fill="white"
                                fontSize="16"
                                fontWeight="bold"
                                textAnchor="middle">
                                {tooltipPos.value}
                            </TextSVG>
                        </Svg>
                    </View> : null
                }}

                onDataPointClick={(data) => {

                    let isSamePoint = (tooltipPos.x === data.x
                        && tooltipPos.y === data.y)

                    isSamePoint ? setTooltipPos((previousState) => {
                            return {
                                ...previousState,
                                value: data.value,
                                visible: !previousState.visible
                            }
                        })
                        :
                        setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });

                }}
            />
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