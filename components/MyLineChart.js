import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit'

export function MyLineChart({ data }) {
    return (
        <View>
            <LineChart
                data={data}
                width={Dimensions.get('window').width}
                height={200}
                yAxisLabel={'$'}
                chartConfig={{
                    backgroundGradientFrom: 'darkblue',
                    backgroundGradientTo: 'blue',
                    color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
                }}
            />
        </View>
    )
}