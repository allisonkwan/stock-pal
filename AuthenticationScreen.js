import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import { auth } from './firebase';
import { useNavigation } from '@react-navigation/core';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';
import {decode, encode, base64} from 'base-64';

if (!global.btoa) {  global.btoa = encode };

if (!global.atob) { global.atob = decode }; 

const AuthenticationScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const db = SQLite.openDatabase('test.db')
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState(undefined);
  const showNames = () => {
    return names.map((name, index) => {
      return (
        <View>
          <Text>{name.name}</Text>
        </View>
      )
    });
  }

  useEffect(() => {
    console.log('here');
    db.transaction(tx=> {
      tx.executeSql('CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT);')
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM names', null,
        (txObj, resultSet) => setNames(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
    setIsLoading(false);
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        navigation.navigate("Home")
      }
    })
    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log(user.email);
      db.transaction(tx => {
        tx.executeSql('INSERT INTO names (email) values (?);', auth.currentUser?.email,
          (txObj, resultSet) => {
            let existingNames = [...names];
            existingNames.push({id: resultSet.isertId, name: auth.currentUser?.email});
            setNames(existingNames);
            setCurrentName(undefined);
          },
          (txObj, error) => console.log(error)
        );
      });
    })
    .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email,password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in');
      return sendEmail(userCredentials);
    })
    .catch(error => alert(error.message))
  }

  const sendEmail = async (credentials) => {
    var http = new XMLHttpRequest();
    var url =
      "https://api.mailgun.net/v3/sandbox4b3c7f457d794e0583b72d380ea2559a.mailgun.org/messages";
    var params =
      "from=Mailgun Sandbox <aditiprakashm@sandbox4b3c7f457d794e0583b72d380ea2559a.mailgun.org>&"+
      "to=aditiprakashm@gmail.com&"+
      "subject=Hello&"+
      "text=Congratulations, you just sent an email with Mailgun!  You are truly awesome!";
    http.open("POST", url, true);
    http.setRequestHeader('Authorization', `Basic ${btoa(`api:89311a342986abdeea520a7061f22708-181449aa-01d1804a`)}`);
    http.onload = function() {
      console.log(this.responseText);
    };
    http.send(params);
  }
  // const sendEmail = async (credentials) => {
  //   const API_KEY = '89311a342986abdeea520a7061f22708-181449aa-01d1804a';
  //   const DOMAIN = 'sandbox4b3c7f457d794e0583b72d380ea2559a.mailgun.org';
  //   const API_URL = 'https://api.mailgun.net/v3/sandbox4b3c7f457d794e0583b72d380ea2559a.mailgun.org/messages';
  //   console.log("printing");
  //   console.log(credentials.user.email);
  //   console.log("done");
  //   const message = {
  //     from: 'StockPal <aditiprakashm@sandbox4b3c7f457d794e0583b72d380ea2559a.mailgun.org>',
  //     to: credentials.user.email,
  //     subject: 'Registration Confirmation',
  //     text: 'Thank you for registering in our app!'
  //   };
  
  //   return new Promise((resolve, reject) => {
  //     axios.post(API_URL, message, {
  //       auth: {
  //         username: 'api',
  //         password: API_KEY
  //       }
  //     })
  //       .then(response => {
  //         console.log('Email sent:', response.data);
  //         resolve(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error sending email:', error);
  //         reject(error);
  //       });
  //   });
  // };

  // const sendEmail = async () => {
  //   const API_KEY = '89311a342986abdeea520a7061f22708-181449aa-01d1804a';
  //   const DOMAIN = 'sandbox4b3c7f457d794e0583b72d380ea2559a.mailgun.org';
  //   const API_URL = `https://api.mailgun.net/v3/${DOMAIN}/messages`;
  //   const message = {
  //     from: 'StockPal <aditiprakashm@gmail.com>',
  //     to: userCredentials.user.email,
  //     subject: 'Registration Confirmation',
  //     text: 'Thank you for registering in our app!'
  //   };
  //   try {
  //   const response = await axios.post(API_URL, message, {
  //       auth: {
  //         username: 'api',
  //         password: API_KEY
  //       }
  //     });
  //     console.log('Email sent:', response.data);
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //   }
  // }
  return (
    
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input1}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input1}
          secureTextEntry/>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        {showNames()}
      </View>
      
    </KeyboardAvoidingView>
  )
}
export default AuthenticationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%',
  },
  input1: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
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
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '780',
    fontSize: 16,
  }
})