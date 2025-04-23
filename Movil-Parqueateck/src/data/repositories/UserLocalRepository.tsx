import { User } from "../../domain/entities/user";
import { UserLocalRepository } from '../../domain/repositories/UserLocalRepository';
import { LocalStorage } from "../source/local/LocalStorage";

export class UserLocalRepositoryImp implements UserLocalRepository {
    async save(user: User): Promise<void> {
        const { save } = LocalStorage();
        console.log("save", save)
        await save('user', JSON.stringify(user));
    }

    async getUser(): Promise<User> {
        const { getItem } = LocalStorage();
        const data = await getItem('user');
        const user: User = JSON.parse(data as any);
        return user;
    }

    async remove(): Promise<void> {
        const { remove } = LocalStorage();
        await remove('user');
    }
}