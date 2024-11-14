import connection from "../db/connection.js";
import bcrypt from "bcrypt";

class user {
    constructor() {

    }

    static async obtenerUsuarios() {
        const query = 'SELECT * FROM usuario';

        try {
            const [result] = await connection.promise().query(query);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default user;