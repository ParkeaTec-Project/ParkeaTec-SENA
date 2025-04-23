import React, { useState } from 'react'
import { ApiDelivery } from '../../../data/source/remote/api/ApiDelivery';
import { RegisterAuthUseCase } from '../../../domain/useCases/auth/RegisterAuth';

const RegisterViewModel = () => {
  const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        id_documento: '',
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
        correo: '',
        password: '',
        centro_formacion: '',
        ficha_aprendiz: '',
        // firma_usuario: null,
        // foto_documento: null,
        // foto_carnet: null,
        id_tipo_documento: '',
        rol_id: ''
    });
    const onChange = (property: string, value: any) => {
        setValues({...values, [property]:(value)});
    }
    const register = async () => {
       try{
        if(!isValidForm()){
        const  response  = await RegisterAuthUseCase(values);
        console.log('Result ' + JSON.stringify(response));
        }
       
       } catch (error){
        console.log('Error ' + error);
       }
    }
    const isValidForm = () : boolean => {
      if(values.id_documento === '') {
        setErrorMessage('El documento es requerido');
        return true;
      }

      if(values.nombre === ''){
        setErrorMessage('El nombre es requerido');
        return true;
      }

      if(values.apellido === ''){
        setErrorMessage('El apellido es requerido');
        return true;
      }
      if(values.telefono === ''){
        setErrorMessage('El numero de telefono es requerido');
        return true;
      }
      if(values.correo === ''){
        setErrorMessage('El email es requerido');
        return true;
      }
      
      if(values.password === ''){
        setErrorMessage('La contraseña es requerida');
        return true;
      }
      if(values.centro_formacion === ''){
        setErrorMessage('La confirmación de contraseña es requerida');
        return true;
      }
      if(values.ficha_aprendiz === ''){
        setErrorMessage('La ficha aprendiz es requerida');
        return true;
      }
      if(values.id_tipo_documento === ''){
        setErrorMessage('El tipo de documento es requerido');
        return true;
      }
      if(values.rol_id === ''){
        setErrorMessage('El rol es requerido');
        return true;
      }
      return false;
    }
  return {
    ...values,
    onChange,
    register,
    errorMessage
  }

}

export default RegisterViewModel;