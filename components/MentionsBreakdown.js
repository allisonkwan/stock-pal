import { View, Text, Image, TouchableHighlight, Linking} from 'react-native'
import React from 'react'
import styles from "../Styles";

export function MentionsBreakdown({data}) {
    const googleNewsURL = 'https://news.google.com/search?q=' + data[4] + '%20stock'
    return (
        <View style={styles.mentionsBreakdown}>
            <Text style={{fontSize: 18}}>This {data[0]}'s Breakdown</Text>
            <View style={styles.platformBreakdown}>
                <View style={styles.logoAndName}>
                    <TouchableHighlight
                        onPress={()=> Linking.openURL(googleNewsURL)}>
                        <Image
                            source={require("../assets/external-link-icon.png")}
                            style={{width:20, height:20, marginRight: 10}} />
                    </TouchableHighlight>
                    <Image source={require("../assets/google-icon.png")}style={{width:35, height:41}} />
                    <Text style={{fontSize: 16, color: 'gray', fontWeight: "200", paddingLeft: 20}}>Google</Text>
                </View>
                <Text style={{fontSize: 16, fontWeight: "200", paddingRight:20}}>{data[1]}</Text>
            </View>
            <View style={styles.platformBreakdown}>
                <View style={styles.logoAndName}>
                    <Image source={require("../assets/reddit-icon.png")}style={{width:39, height:41}} />
                    <Text style={{fontSize: 16, color: 'gray', fontWeight: "200", paddingLeft: 20}}>Reddit</Text>
                </View>
                <Text style={{fontSize: 16, fontWeight: "200", paddingRight:20}}>{data[2]}</Text>
            </View>
            <View style={styles.platformBreakdown}>
                <View style={styles.logoAndName}>
                    <Image source={require("../assets/twitter-icon.png")}style={{width:39, height:37}} />
                    <Text style={{fontSize: 16, color: 'gray', fontWeight: "200", paddingLeft: 20}}>Twitter</Text>
                </View>
                <Text style={{fontSize: 16, fontWeight: "200", paddingRight:20}}>{data[3]}</Text>
            </View>
        </View>
    )
}