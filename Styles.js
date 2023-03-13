import { StyleSheet, Dimensions } from 'react-native';

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
    mentionsBreakdown: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10
    },
    platformBreakdown: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-evenly',
        padding: 10
    },
    logoAndName: {
        flexDirection: 'row',
        alignItems: "center",
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
    },
    boldText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        color: '#596775'
    },
    traction: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-evenly',
        marginVertical: 10,
        marginHorizontal: 5,
        backgroundColor: '#bbd8f7'
    },
    tableHeader: {
        height: 50,
        alignContent: 'center',
        backgroundColor: '#ffe0f0'
    },
    tableText: {
        margin: 10
    }
});