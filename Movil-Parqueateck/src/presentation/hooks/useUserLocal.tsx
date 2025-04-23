import React, { useEffect, useState} from 'react';
import { GetUserLocalUseCase } from '../../domain/useCases/userLocal/getUserLocal';
import { User } from '../../domain/entities/user';

export const useUserLocal = () => {
    const [user, setUser] = useState<User>()
    useEffect(() => { //Permite efectos secundarios. obtiene el usuario de la sesión
        getUserSession();
    }, []);
    
    const getUserSession = async () => {
        const user = await GetUserLocalUseCase();
        setUser(user);
    }

    return {
        user,
        getUserSession
    }
}