import React from 'react'
import { useState, useEffect } from 'react';
import { getProduct, createProduct, updateProduct, deleteProduct, getProductById } from '../../../../data/source/remote/api/ApiDelivery';
import { RemoveUserLocalUseCase } from "../../../../domain/useCases/userLocal/removeUserLocal";

interface Product {
    id_documento: number;
    nombre: string;
    apellido: string;
    telefono: number;
    direccion: string;
    correo_electronico: string;
    contraseña: string;
    centro_formacion: string;
    id_tipo_documento: string;
    rol_id: string;
    rol: string;
    name: string
    price: number;
}

const ProfileInfoViewModel = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [id_documento, setId_documento] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [foto_usuario, setFoto_usuario] = useState('');
    const [centro_formacion, setCentro_formacion] = useState('');
    const [id_tipo_documento, setId_Tipo_documento] = useState('');
    const [rol_id, setRol] = useState('');
    const [searchId, setSearchId] = useState('')
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchedProduct, setSearchedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getProduct();
        setProducts(data.usuarios);
        console.log("productos:", data.usuarios);
    };
    

    const handleAddProduct = async () => {
        const response = await createProduct({ id_documento, nombre, apellido, telefono, direccion, correo, password, centro_formacion, id_tipo_documento, 
            rol_id });
        const newProduct = response.crearUsuario;
        setProducts([...products, newProduct]);
        setId_documento('')
        setNombre('');
        setApellido('');
        setTelefono('');
        setDireccion('');
        setCorreo('');
        setPassword('');
        setCentro_formacion('');
        setId_Tipo_documento('')
        setRol('');
    };

    const handleUpdateProduct = async () => {
        if (selectedProductId !== null) {
            console.log("usuario seleccionado:", selectedProductId);
            const response = await updateProduct(selectedProductId, { nombre, correo, password, rol_id });
            // const updatedProduct = {
            //     nombre: response.nombre,
            //     correo: response.correo,
            //     password: response.password,
            //     rol_id: response.rol_id
            // };
            // setProducts(products.map(product => product.id_documento === selectedProductId ? updatedProduct : product));
            const updatedProduct = products.map(product => {
                if (product.id_documento === selectedProductId) {
                    return {
                        ...product,
                        nombre: response.nombre,
                        correo_electronico: response.correo,
                        password: response.password,
                        rol_id: response.rol_id
                    };
                }
                return product
            });
            setProducts(updatedProduct);
            setSelectedProductId(null);
            setNombre('');
            setCorreo('');
            setPassword('');
            setRol('');
        }
    };
    

    const handleDeleteProduct = async (id: number) => {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id_documento !== id));
    };

    const handleSearchProduct = async () => {
        const response = await getProductById(parseInt(searchId));
        console.log("usuario consultado", response);
        const product = response.usuario[0];
        setSearchedProduct(product);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    
    const removeSession = async () => {
        await RemoveUserLocalUseCase();
    }
    return {
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
    }
}


export default ProfileInfoViewModel;
