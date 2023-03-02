import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    descriptionAndValue: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    costAndTractionContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    radio: {
        display: 'flex',
        alignItems: 'left',
        width: '100%',
        wordWrap: 'break-word'
    },
    title: {
        fontSize: 32,
        color: 'red'
    },
    dataPointTimestamp: {
        fontSize: 32,
        color: 'black'
    },
    light: {
        fontSize: 14,
        color: 'gray',
        fontWeight: "200"
    }
});