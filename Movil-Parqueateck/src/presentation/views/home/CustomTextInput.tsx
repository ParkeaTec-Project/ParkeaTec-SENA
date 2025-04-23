import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    placeholder: string;
    keyboardType: any;
    property: string;
    onChangeText: (property: string, value: any) => void;
    value: string;
    secureTextEntry?: boolean;
    iconName: string; // 👈 Esta línea es importante
}

export const CustomTextInput = ({
    placeholder,
    keyboardType,
    property,
    onChangeText,
    value,
    secureTextEntry = false,
    iconName
}: Props) => {
    return (
        <View style={styles.container}>
            <Icon name={iconName} size={22} color="#00fff7" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#ccc"
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={(text) => onChangeText(property, text)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: '#00fff7',
        borderRadius: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#000000',
        fontSize: 16,
    },
});
