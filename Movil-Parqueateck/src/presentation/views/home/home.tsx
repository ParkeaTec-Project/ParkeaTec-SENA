import React, { useEffect, useState } from 'react';
import { View, Image, Text, ToastAndroid, TouchableOpacity } from 'react-native';

import { CustomTextInput } from './CustomTextInput';
import { RoundedButton } from './RoundedButton';
import { Preloader } from './preloader';
import styles from './styles';
import useViewModel from './viewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'> {}

export const HomeScreen = ({ navigation }: Props) => {
    const { email, password, errorMessage, user, onChange, login } = useViewModel();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (errorMessage !== '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (user?.id !== null && user?.id !== undefined) {
            console.log("user", user);
          navigation.replace('ProfileInfoScreen');
        }
      }, [user])
    

    if (isLoading) return <Preloader />;

    return (
        <View style={styles.container}>
            {/* <Image
                source={require('../../../../assets/plus.png')}
                style={styles.backgroundImage}
            /> */}

            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../../assets/logo_movil.png')}
                    style={styles.logoImage}
                />
                <Text style={styles.logoText}>ParkeaTec</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.formText}>INGRESA A TU CUENTA</Text>

                <CustomTextInput
                iconName="email-outline"
                placeholder="Correo electrónico"
                keyboardType="email-address"
                property="email"
                onChangeText={onChange}
                value={email}
            />

            <CustomTextInput
                iconName="lock-outline"
                placeholder="Contraseña"
                keyboardType="default"
                property="password"
                onChangeText={onChange}
                value={password}
                secureTextEntry
            />

            <View style={{ marginTop: 30, width: '100%' }}>
                <RoundedButton text="ENTRAR" iconName="login" onPress={() => login()} />
            </View>


                <View style={styles.formRegister}>
                    <Text style={{ color: '#ccc' }}>¿No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.formRegisterText}>Regístrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

