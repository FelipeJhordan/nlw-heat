import { Request, Response } from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

class AuthenticateUserController {

    async handle(request: Request, response: Response) {
        const service = new AuthenticateUserService()
        const { code } = request.body
        try {

            const result = await service.execute(code)

            return response.json(result)
        } catch (e) {
            console.log("Erro:" + e)
            return response.status(500).send({ error: "Algo deu errado" })
        }
    }
}

export { AuthenticateUserController }