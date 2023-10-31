import { StyleSheet, Text } from 'react-native';

export default function FormError({ error }: { error: string }) {
    return (
        <Text style={styles.error}>{error}</Text>
    )
}

const styles = StyleSheet.create({
    error: {
        color: '#CC0000',
        fontWeight: 'bold',
        width: "85%",
        textAlign: 'left'
    }
});