import React from 'react';
import { Text, View, ScrollView, Button, StyleSheet,TouchableOpacity  } from 'react-native';
import styles from './Styles';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Card, Title } from 'react-native-paper';
import { MentionsBreakdown } from "./components/MentionsBreakdown";
import { auth } from './firebase'
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({navigation}) {
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Authentication")
            })
            .catch(error => alert(error.message))
    }
    const tableData = {
        HeadTable: ['Stock', 'Price'],
        DataTable: [
            ['APPL', '$108.23'],
            ['MSFT', '$265.91'],
            ['TSLA', '$194.51']
        ]
    }

    return (
      <ScrollView>
        <Card style={styles.traction}>
            <Card.Content style={styles.descriptionAndValue}>
                <Title>Daily Highest Traction</Title>
                <MentionsBreakdown data={['Hour', 70000]} />
            </Card.Content>
            <Card.Actions>
            <Button
                title="View Stock Details"
                onPress={() =>
                    navigation.navigate('Stock Details')
                }
                />
            </Card.Actions>
        </Card>
        <Text style={styles.boldText}>Monitoring</Text>
        <View style={styles.container}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                <Row data={tableData.HeadTable} style={styles.tableHeader} textStyle={styles.tableText}/>
                <Rows data={tableData.DataTable} textStyle={styles.tableText}/>
            </Table>
        </View>
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity 
            onPress={handleSignOut}
            style={styles1.button}>
            <Text stylele={styles1.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    );
}

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },
    buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
    },
    buttonText: {
    color: 'white',
    fontWeight: '780',
    fontSize: 16,
    },
})