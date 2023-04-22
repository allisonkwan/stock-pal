import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, Button, StyleSheet,TouchableOpacity, Switch  } from 'react-native';
import styles from './Styles';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Card, Title } from 'react-native-paper';
import { MentionsBreakdown } from "./components/MentionsBreakdown";
import { auth, db } from './firebase'
import {ref, onValue, set } from 'firebase/database'
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({navigation}) {
    // const initialEnable = () => {
    //     const userId = (auth.currentUser?.email).split('@')[0]
    //     const dbRef = ref(db, "UserEmailNotifPreference/" + userId);
    //     let initialEnable = false
    //     onValue(dbRef, (snapshot) => {
    //         const data = snapshot.val();
    //
    //         if (data.emailNotif == 0) {
    //             initialEnable = false;
    //         } else {
    //             initialEnable = true;
    //         }
    //     });
    //
    //     return initialEnable;
    // }

    const [isEnabled, setIsEnabled] = useState(0);

    useEffect(() => {
        const userId = (auth.currentUser?.email).split('@')[0]
        const dbRef = ref(db, "UserEmailNotifPreference/" + userId);
        let initialEnable = false
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();

            if (data.emailNotif == 0) {
                setIsEnabled(false);
            } else {
                setIsEnabled(true);
            }
        });
    }, [isEnabled])

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        const userId = (auth.currentUser?.email).split('@')[0]
        if (isEnabled == true) {
            set(ref(db, "UserEmailNotifPreference/" + userId), {
                email: auth.currentUser?.email,
                emailNotif: 0
            })
        } else {
            set(ref(db, "UserEmailNotifPreference/" + userId), {
                email: auth.currentUser?.email,
                emailNotif: 1
            })
        }
    }
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate("Authentication")
            })
            .catch(error => alert(error.message))
    }
    const tableData = {
        HeadTable: ['Stock', 'Price'],
        DataTable: [
            ['AAPL', '$108.23'],
            ['MSFT', '$265.91'],
            ['TSLA', '$194.51']
        ]
    }

    return (
      <ScrollView>
        <Card style={styles.traction}>
            <Card.Content style={styles.descriptionAndValue}>
                <Title>Daily Highest Traction: AAPL</Title>
                <MentionsBreakdown data={['Hour', 9, 9, 9, 'AAPL']} />
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
        <Text>Receive email notifications at {auth.currentUser?.email}</Text>
          <View>
              <Switch
                  trackColor={{true: '#00D100', false: '#767577'}}
                  thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
              />
          </View>
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