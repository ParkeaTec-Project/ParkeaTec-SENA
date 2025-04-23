import { ResponseApiDelivery } from "../../data/source/remote/models/responseApiDelivery";
import { User } from "../entities/user";
export interface AuthRepository {
    login(email: string, password: string): Promise<ResponseApiDelivery>;
    register(user: User): Promise<ResponseApiDelivery>;
}