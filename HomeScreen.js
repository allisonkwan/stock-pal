import React from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import styles from './Styles';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Card, Title } from 'react-native-paper';
import { MentionsBreakdown } from "./components/MentionsBreakdown";

export default function HomeScreen({navigation}) {
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
      </ScrollView>
    );
}