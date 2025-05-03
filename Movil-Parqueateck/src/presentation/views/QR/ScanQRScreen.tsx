import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

type Props = StackScreenProps<RootStackParamList, 'ScanQRScreen'>;

export const ScanQRScreen = ({ route }: Props) => {
    const { products } = route.params;

    const [scanned, setScanned] = useState(false);

    const handleBarCodeRead = ({ data }: { data: string }) => {
        if (scanned) return;
        setScanned(true);

        try {
            const parsed = JSON.parse(data);
            const found = products.find(p => p.id === parsed.id);

            if (found) {
                Alert.alert("Producto encontrado", `Nombre: ${found.name}\nPrecio: $${found.price}`);
            } else {
                Alert.alert("No encontrado", "Este producto no existe en la base de datos.");
            }
        } catch (e) {
            Alert.alert("Error", "El código QR no es válido.");
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                style={styles.camera}
                onBarCodeRead={handleBarCodeRead}
                captureAudio={false}
                type={RNCamera.Constants.Type.back}
                androidCameraPermissionOptions={{
                    title: "Permiso de cámara",
                    message: "La app necesita usar la cámara para escanear códigos QR.",
                    buttonPositive: "Aceptar",
                    buttonNegative: "Cancelar",
                }}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Escanea un código QR</Text>
                </View>
            </RNCamera>
        </View>
    );
};

export default ScanQRScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    textContainer: {
        position: 'absolute',
        top: 50,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
        borderRadius: 10,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
});
