import jwt, {type JwtPayload} from 'jsonwebtoken'

class TokenManager {
    public generate(id: string): string {
        return jwt.sign({ id }, process.env.JWT_SECRET || '', {
            expiresIn: '30d'
        })
    }

    public verify(token: string): JwtPayload {
        const payload = jwt.verify(token, process.env.JWT_SECRET || '')
        return payload as JwtPayload
    }
}

const tokenManager = new TokenManager()

export default tokenManager
