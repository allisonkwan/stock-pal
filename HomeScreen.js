import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from './Styles';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

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
      <View>
        <Text>Daily highest traction</Text>
        <Button
          title="View Stock Details"
          onPress={() =>
            navigation.navigate('Stock Details')
          }
        />
        <Text style={styles.boldText}>Monitoring</Text>
        <Table>
            <Row data={tableData.HeadTable} />
            <Rows data={tableData.DataTable} />
        </Table>
      </View>
    );
}