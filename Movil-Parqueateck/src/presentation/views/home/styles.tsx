import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEF3FF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    form: {
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 25,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    formText: {
        color: '#0F1626',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#F4F4F4',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },

    formRegisterText: {
        color: '#0F1626',
        fontWeight: 'bold',
        marginLeft: 8,
        borderBottomColor: '#0F1626',
        borderBottomWidth: 1,
    },

    ImageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%',
    },

    logoContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },

    logoImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },

    logoText: {
        color: '#0F1626',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    userIconContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    
    userIcon: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        tintColor: '#0F1626', // puedes quitar esto si es imagen a color
    },
    
});

export default homeStyles;
