import { View, Text } from 'react-native'
import React from 'react'
import styles from "../Styles";

export function CostAndTraction({data} ) {
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
                    <Text style={styles.light}></Text>
                    <Text></Text>
                </View>
                <View style={styles.descriptionAndValue}>
                    <Text style={styles.light}>This {data[1]}'s Total Traction</Text>
                    <Text>{data[5]} Searches/Mentions</Text>
                </View>
            </View>
        </View>
    )
}