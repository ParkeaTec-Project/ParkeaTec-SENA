import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    ImageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%',
    },

    form: {
        width: '100%',
        height: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 15,
    },

    formText: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },

    formRegisterText: {
        fontStyle: 'italic',
        color: '#0D6EFD',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        fontWeight: 'bold',
        marginLeft: 10,
    },

    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '15%',
    },

    logoImage: {
        width: 100,
        height: 100,
    },

    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
    },

});


export default homeStyles