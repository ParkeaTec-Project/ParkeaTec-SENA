import { User } from "../entities/user";

export interface UserLocalRepository{
    save(user: User): void;
    getUser(): Promise<User>;
    remove(): Promise<void>;
}