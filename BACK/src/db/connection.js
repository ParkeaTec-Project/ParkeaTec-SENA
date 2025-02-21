import mysql2 from "mysql2";

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ParkeaTec'
});

connection.connect((err) => {
    if(err) {
        console.error("Error con la conexion a la base de datos");
        return;
    }
    console.log("Conectado a la base de datos")
});

export default connection;