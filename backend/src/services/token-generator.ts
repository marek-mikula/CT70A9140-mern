import jwt from 'jsonwebtoken'

class TokenGenerator {
    public generate(id: string): string {
        return jwt.sign({ id }, process.env.JWT_SECRET || '', {
            expiresIn: '30d'
        })
    }
}

const tokenGenerator = new TokenGenerator()

export default tokenGenerator
