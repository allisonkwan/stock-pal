import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>This is the home screen.</Text>
        <Button
          title="View Stock Details"
          onPress={() =>
            this.props.navigation.navigate('Stock Details')
          }
        />
      </View>
    );
  }
}

// ...

export default HomeScreen;