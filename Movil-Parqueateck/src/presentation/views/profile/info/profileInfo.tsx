import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RootStackParamList } from "../../../../../App";
import useViewModel from './viewModel';
import Modal from 'react-native-modal';
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";

interface Props extends StackScreenProps<RootStackParamList, 'ProfileInfoScreen'> { };

export const ProfileInfoScreen = ({ navigation, route }: Props) => {
    const {
        products,
        id_documento,
        nombre, 
        apellido,
        telefono,
        direccion,
        correo, 
        password,
        centro_formacion,
        id_tipo_documento,
        rol_id,
        name,
        price,
        searchId,
        selectedProductId,
        isModalVisible,
        searchedProduct,
        setId_documento,
        setNombre,
        setApellido,
        setTelefono,
        setDireccion,
        setCorreo,
        setPassword,
        setCentro_formacion,
        setId_Tipo_documento,
        setRol,
        setName,
        setPrice,
        setSearchId,
        setSelectedProductId,
        toggleModal,
        handleAddProduct,
        handleUpdateProduct,
        handleDeleteProduct,
        handleSearchProduct,
        removeSession
    } = useViewModel();
    console.log("productos", products)
    console.log("usuario seleccionado", selectedProductId);
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonClose}
                    onPress={() => {
                        removeSession();
                        navigation.navigate('HomeScreen');
                    }}>
                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
                <Text style={styles.title}>Usuarios</Text>
                {/* <ScrollView></ScrollView> */}
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id_documento.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.productContainer}>
                            <Text style={styles.productText}>{item.nombre} - {item.rol} - {item.correo_electronico}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => {
                                    setNombre(item.nombre);
                                    setCorreo(item.correo_electronico);
                                    setPassword(item.contraseña);
                                    setRol(item.rol_id.toString());
                                    setSelectedProductId(item.id_documento);
                                }}>
                                    <Text style={styles.buttonText}>Modificar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonDelete} onPress={() => handleDeleteProduct(item.id_documento)}>
                                    <Text style={styles.buttonText}>Eliminar</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}
                />
            <View style={styles.form}>
                <ScrollView>
                <TextInput
                style={styles.input}
                placeholder="Nro Documento"
                value={id_documento}
                onChangeText={setId_documento}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="apellido"
                value={apellido}
                onChangeText={setApellido}
            />
            <TextInput
                style={styles.input}
                placeholder="telefono"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Direccion"
                value={direccion}
                onChangeText={setDireccion}
            />
            <TextInput
                style={styles.input}
                placeholder="correo"
                value={correo}
                onChangeText={setCorreo}
            />
            <TextInput
                style={styles.input}
                placeholder="contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="centro formacion"
                value={centro_formacion}
                onChangeText={setCentro_formacion}
            />
            <Picker
                selectedValue={id_tipo_documento}
                onValueChange={(itemValue) => setId_Tipo_documento(itemValue)}
            >
                <Picker.Item label="Selecciona tu documento" value="" />
                <Picker.Item label="Cedula de ciudadania" value="1" />
                <Picker.Item label="Cedula de extranjeria" value="2" />
                <Picker.Item label="Tarjeta de identidad" value="3" />
            </Picker>
            <Picker 
                selectedValue={rol_id}
                onValueChange={(itemValue) => setRol(itemValue)}
            >
                <Picker.Item label="Selecciona tu rol" value="" />
                <Picker.Item label="Administrador" value="1" />
                <Picker.Item label="Vigilante" value="2" />
                <Picker.Item label="Usuario" value="3" />
            </Picker>
                </ScrollView>
            
            </View>
            
            <TouchableOpacity style={styles.addButton} onPress={selectedProductId ? handleUpdateProduct : handleAddProduct}>
                <Text style={styles.addButtonText}>{selectedProductId ? "Editar Usuario" : "Crear Usuario"}</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Numero de ID"
                value={searchId}
                onChangeText={setSearchId}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearchProduct}>
                <Text style={styles.searchButtonText}>Buscar Usuario</Text>
            </TouchableOpacity>
            {searchedProduct && (
                <View style={styles.productContainer}>
                    <Text style={styles.productText}> Usuario Buscado: {searchedProduct.nombre} - {searchedProduct.correo_electronico}</Text>
                </View>
            )}
            <TouchableOpacity style={styles.reportButton} onPress={toggleModal}>
                <Text style={styles.reportButtonText}>Generar Reporte</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Reporte de Usuarios</Text>
                    {products.map(product => (
                        <Text key={product.id_documento} style={styles.modalText}>{product.nombre} - {product.correo_electronico}</Text>
                    ))}
                    <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
};
export default ProfileInfoScreen;