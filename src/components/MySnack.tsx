
import {  Snackbar } from 'react-native-paper';
import {  Text } from 'react-native';

interface IMyScnackProps {
    text:string;
    type: 'SUCCESS' | 'ERROR';
    onDismiss: () => void;
    visible: boolean
}

export default function MySnack({onDismiss,text, type, visible  } :IMyScnackProps){

    return <Snackbar  visible={visible} onDismiss={onDismiss} style={{
        backgroundColor: type === "ERROR" ? '#C00' : "#0C0"
    }}>
        <Text>{text}</Text>
    </Snackbar>

}