import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import {} from 


interface IAuthenticateClient{
    username: String;
    password: String;
}


export class AuthenticateClientUseCase {
    async execute({  username, password }: IAuthenticateClient) {
        // Receber username, password

        // Verificar se username cadastrado 
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if(!client) {
            throw new Error("Username or password invalid!")
        }
        // Verificar se senha corresponde ao username
        const passwordMath = await compare(password, client.password);

        if(!passwordMath) {
            if(!client) {
                throw new Error("Username or password invalid!")
            }
        }
        // Gerar o token
        const token = sign({username}, "4ffe35db90d94c6041fb8ddf7b44df29", {
            subject: client.id,
            expiresIn: "id"
        })

        return token
    }
}