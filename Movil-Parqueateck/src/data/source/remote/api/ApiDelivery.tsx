import axios from "axios";

const ApiDelivery2 = axios.create({
    baseURL: 'http://10.1.193.237:3001/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

const ApiDelivery = axios.create({
    baseURL: 'http://10.1.193.237:4000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// export const login = async () => {
//     const response = await ApiDelivery.post('/login');
//     return response.data;
// }

export const getProduct = async () => {
    const response = await ApiDelivery.get('/users');
    return response.data;
};

// export const getProductById = async (id) => {
//     const response = await ApiDelivery2.get(`/products/${id}`);
//     return response.data;
// };

export const getProductById = async (id) => {
    const response = await ApiDelivery.get(`/user/${id}`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await ApiDelivery.post('/user', product);
    return response.data;
};

// export const createProduct = async (product) => {
//     const response = await ApiDelivery2.post('/products/create', product);
//     return response.data;
// };

// export const updateProduct = async (id, product) => {
//     const response = await ApiDelivery2.put(`/products/update/${id}`, product);
//     return response.data;
// };

export const updateProduct = async (id, product) => {
    const response = await ApiDelivery.put(`/userUpdate/${id}`, product);
    return response.data;
};

// export const deleteProduct = async (id) => {
//     const response = await ApiDelivery2.delete(`/products/${id}`);
//     return response.data;
// };

export const deleteProduct = async (id) => {
    const response = await ApiDelivery.delete(`/userDelete/${id}`);
    return response.data;
};

export {ApiDelivery};