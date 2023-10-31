import { StyleSheet, Text, TextInput, View } from 'react-native';

import { secondaryColor, white } from '../constants/Colors';

interface IInputProps {
    label: string;
    placeholder: string;
    type: 'text' | 'numeric';
    onChange: () => void;
    onBlur: () => void;
    value: string | number;
}

export default function Input({ label, type, placeholder, onBlur, onChange, value }: IInputProps) {
    return (
        <View style={styles.container}>

            <TextInput style={styles.input} placeholder={placeholder} inputMode={type} value={value.toString()} onChangeText={onChange} onBlur={onBlur} />
            <Text style={styles.text}>{label}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '85%',
        position: 'relative'
    },
    input: {
        flex: 1,
        borderWidth: 2,
        borderColor: secondaryColor,
        borderRadius: 8,
        height: 45,
        paddingLeft: 10,
        fontWeight: '600',
    },
    text: {
        position: 'absolute',
        top: "-20%",
        left: 10,
        paddingHorizontal: 8,
        backgroundColor: white,
        fontWeight: '500',
    }
})