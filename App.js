import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MyLineChart } from './components/MyLineChart';

export default function App() {

  const testData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [830, 762, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 29]
      },
    ],
  };
  const currStockPrice = 151.23;

  return (
    <View style={styles.container}>
      <Text>APPL</Text>
      <Text>${currStockPrice}</Text>
      <StatusBar style="auto" />
      <MyLineChart data={testData} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});