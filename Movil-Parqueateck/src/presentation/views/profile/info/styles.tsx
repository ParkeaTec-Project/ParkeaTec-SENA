import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
    container: {
        flex: 10,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    form: {
        height: '40%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    productContainer: {
        height: 150,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productText: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#198754',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonDelete: {
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: '#dc3545'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#198754',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonClose: {
        justifyContent: 'center', 
        backgroundColor: '#e16c11',
        borderRadius: 6,
        padding: 6,
        marginBlockStart: 10   
    },
    searchButton: {
        backgroundColor: '#FF9800',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    reportButton: {
        backgroundColor: '#9C27B0',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    reportButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
})

export default profileStyles;