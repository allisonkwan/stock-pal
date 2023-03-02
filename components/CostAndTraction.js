import { View, Text } from 'react-native'
import React from 'react'
import styles from "../Styles";

export function CostAndTraction({data} ) {
    console.log(data[0])
    return (
        <View style={styles.costAndTractionContainer}>
            <View>
                <View style={styles.descriptionAndValue}>
                    <Text style={styles.light}>{data[0]}'s Average Cost</Text>
                    <Text>${data[2]}</Text>
                </View>
                <View style={styles.descriptionAndValue}>
                    <Text style={styles.light}>{data[0]}'s Total Traction</Text>
                    <Text>{data[4]} Searches/Mentions</Text>
                </View>
            </View>
            <View>
                <View style={styles.descriptionAndValue}>
                    <Text style={styles.light}>This {data[1]}'s Average Cost</Text>
                    <Text>${data[3]}</Text>
                </View>
                <View style={styles.descriptionAndValue}>
                    <Text style={styles.light}>This {data[1]}'s Total Traction</Text>
                    <Text>{data[5]} Searches/Mentions</Text>
                </View>
            </View>
        </View>
    )
}