export const uploadConfigs = {
    usuario: {
        type: 'multiple',
        fields: [
            { name: 'foto_usuario', maxCount: 1 },
            { name: 'firma_usuario', maxCount: 1 },
            { name: 'foto_documento', maxCount: 1 },
            { name: 'foto_carnet', maxCount: 1 }
        ],
        folder: 'users'
    },
    vehiculo: {
        type: 'multiple',
        fields: [
            { name: 'foto_placa_vehiculo', maxCount: 1 },
            { name: 'foto_serial', maxCount: 1 },
            { name: 'foto_vehiculo', maxCount: 1 },
            { name: 'foto_licencia_conducir', maxCount: 1 },
            { name: 'foto_tarjeta_propiedad', maxCount: 1 },
            { name: 'foto_soat', maxCount: 1 },
            { name: 'foto_tecnomecanica', maxCount: 1 },

            //Usuario
            { name: 'firma_usuario', maxCount: 1 },
            { name: 'foto_documento', maxCount: 1 },
            { name: 'foto_carnet', maxCount: 1 },
        ],
        folder: 'vehicles'
    }, 
    vehiculoSingle: {
        type: 'single',
        fieldName: 'foto_vehiculo',
        folder: 'vehicles'
    },
    usuarioSingle: {
        type: 'single',
        fieldName: 'foto_usuario',
        folder: 'users'
    }
};