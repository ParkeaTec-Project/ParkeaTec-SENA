import { UserLocalRepositoryImp } from "../../../data/repositories/UserLocalRepository";
import { User } from "../../entities/user";

const { remove } = new UserLocalRepositoryImp();

export const RemoveUserLocalUseCase = async () => {
    return await remove();
}