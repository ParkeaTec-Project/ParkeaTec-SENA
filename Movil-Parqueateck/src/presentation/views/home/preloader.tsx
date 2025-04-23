import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export const Preloader = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../../../assets/car.json')}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'white',
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    animation: {
        width: 200,
        height: 200,
    },
});
