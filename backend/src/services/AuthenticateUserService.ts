// Receber code(string)
// Recuperar acess_token no github
// Recuperar info do user
// Verificar se o usuario existe no DB
// // SIM == GERAR TOKEN
// // NAO == CRIA no DB, gera um token
// RETORNAR TOKEN COM AS INFOS DO USUARIO LOGADO
import axios from "axios"
import { IAccessTokenResponse } from "../interfaces/IAccessTokenResponse"
import { IUserResponse } from "../interfaces/IUserResponse"
import prismaClient from "../prisma"
import { sign } from 'jsonwebtoken'

class AuthenticateUserService {
    async execute(code: string) {
        const url ="https://github.com/login/oauth/access_token"

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        })
        
        const {data: userData} = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`,
            },
        })

        const { login, id, avatar_url, name} = userData

        const user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if(!user) {
            await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        const token = sign({
            user: {
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id
            }
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: "1d"
        })

        return {token, user}
    }
}


export { AuthenticateUserService }