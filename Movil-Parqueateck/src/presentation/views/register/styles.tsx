import { StyleSheet } from "react-native";

const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEF3FF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    ImageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%',
    },

    form: {
        width: '100%',
        height: '70%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderRadius: 25,
        padding: 10,
        
    },

    formText: {
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center',
        top: '1%',

    },

    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '5%',
        alignItems: 'center'
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

export default registerStyles