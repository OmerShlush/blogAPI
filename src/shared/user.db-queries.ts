import { UserInterface } from "../interfaces/user.interface";
import { User } from "../entity/user.entity";
import { AppDataSource } from "./data-source";


const addUser = async (user: UserInterface) => {
    const newUser = AppDataSource.getRepository(User).create({
        ...user,
        email: (user.email).toLowerCase()
    })
    return newUser;
}

const getUser = async (email: string) => {
    const user = await AppDataSource.getRepository(User).findOneBy({email: email});
    if(user) return user;
    return false;
}

export { addUser, getUser };