import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

type Props = StackScreenProps<RootStackParamList, 'GenerateQRScreen'>;

export const GenerateQRScreen = ({ route }: Props) => {
    const { product } = route.params;

    // Verifica si el producto existe
    if (!product) {
        Alert.alert("Error", "Producto no encontrado.");
        return null;
    }

    // Convirtiendo el producto a una cadena JSON
    const qrValue = JSON.stringify(product);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Código QR del Producto</Text>
            <Text style={styles.subtitle}>{product.name} - ${product.price}</Text>
            <QRCode value={qrValue} size={250} />
        </View>
    );
};

export default GenerateQRScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
    },
});