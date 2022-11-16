import { prisma } from "../../../database/prismaClient";
import { hash } from "bcrypt"



interface ICreatedClient{
    username: string;
    password: string
}


export class CreateClientUseCase{
    async execute({ username, password} : ICreatedClient) {
        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: "insensitive",
                }
            }
        })
        if(clientExist) {
            throw new Error("Client already exists");
            
        }

        const hashPassword = await hash(password, 10);

        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword,
            },
        })
        return client;
    }
}