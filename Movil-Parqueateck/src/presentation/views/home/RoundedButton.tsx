import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import LinearGradient from 'react-native-linear-gradient'; // o 'expo-linear-gradient'

interface Props {
    text: string;
    onPress: () => void;
    iconName?: string;
}

export const RoundedButton = ({ text, onPress, iconName }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
    <View style={[styles.gradient, { backgroundColor: '#ACFFB7' }]}>
        <View style={styles.content}>
            {iconName && (
                <Icon name={iconName} size={20} color="#0F1626" style={styles.icon} />
            )}
            <Text style={styles.text}>{text}</Text>
        </View>
    </View>
</TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    buttonWrapper: {
        width: '100%',
        borderRadius: 30,
        overflow: 'hidden',
    },
    gradient: {
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 25,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 10,
    },
    text: {
        color: '#0F1626',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
