import { UserLocalRepositoryImp } from "../../../data/repositories/UserLocalRepository";
import { User } from "../../entities/user";

const { save } = new UserLocalRepositoryImp();

export const SaveUserLocalUseCase = async (user: User) => {
    return await save(user);
}