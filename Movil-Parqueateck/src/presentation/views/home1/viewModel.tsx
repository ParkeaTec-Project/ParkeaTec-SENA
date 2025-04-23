import React, { useEffect, useState } from "react";
import { loginAuthCase } from "../../../domain/useCases/auth/Login.Auth";
import { SaveUserLocalUseCase } from "../../../domain/useCases/userLocal/saveUserLocal";
import { GetUserLocalUseCase } from "../../../domain/useCases/userLocal/getUserLocal";
import { useUserLocal } from "../../hooks/useUserLocal";


const HomeViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const { user, getUserSession } = useUserLocal();
    console.log('Usuario: ' + JSON.stringify(user));

    useEffect(() => {
        getUserSession();
    }, []);

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const login = async () => {
        if (isValidForm()) {
            const response = await loginAuthCase(values.email, values.password);
            console.log('Respuesta: ' + JSON.stringify(response));
            if (!response.success) {
                setErrorMessage(response.message);
            } else {
                await SaveUserLocalUseCase(response.data);
                getUserSession();
            }
        }
    };

    const isValidForm = () => {
        if (values.email === '') {
            setErrorMessage('El email es requerido');
            return false;
        }

        if (values.password === '') {
            setErrorMessage('La contraseña es requerida');
            return false;
        }
        return true;
    }

    return {
        ...values,
        user,
        onChange,
        login,
        errorMessage
    }
}

export default HomeViewModel;