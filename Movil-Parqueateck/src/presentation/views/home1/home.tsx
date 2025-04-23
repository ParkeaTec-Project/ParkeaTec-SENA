import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button, ToastAndroid, Touchable, TouchableOpacity } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import useViewModel from './viewModel';
import { CustomTextInput } from '../../components/CusatomTextInput';
import styles from './styles';

interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'>{};

export const HomeScreen = ({ navigation, route }: Props) => {

  const { email, password, errorMessage, user, onChange, login } = useViewModel();

  //const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  console.log("usuario prueba", user);
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


    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/parkeatec_movil.png')}
                style={styles.ImageBackground}
            />
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../../assets/logo_movil.png')}
                    style={styles.logoImage}
                />
                <Text style={styles.logoText}>ParkeaTec</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.formText}>INGRESAR</Text>
                <CustomTextInput
                    image={require('../../../../assets/email.png')}
                    placeholder='Correo Electronico'
                    keyboardType='email-address'
                    property='email'
                    onChangeText={onChange}
                    value={email}
                />

                <CustomTextInput
                    image={require('../../../../assets/password.png')}
                    placeholder='Contraseña'
                    keyboardType='default'
                    property='password'
                    onChangeText={onChange}
                    value={password}
                    secureTextEntry={true}
                />

                <View style={{ marginTop: 30 }}>
                    <RoundedButton text='ENTRAR' onPress={() => login()}
                    />
                </View>
                <View style={styles.formRegister}>
                    <Text>¿No tienes cuenta ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.formRegisterText}>Registrate</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </View>

    );
}

