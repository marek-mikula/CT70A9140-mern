import type {LoginData, RegisterData, UserWithToken} from "./auth.type.ts";

class AuthService {
    public async register(data: RegisterData): Promise<UserWithToken> {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        // registration error
        if (response.status === 400) {
            const data = await response.json() as {message: string}
            throw new Error(data.message)
        }

        // other errors
        if (response.status !== 201) {
            throw new Error('Registration request failed.')
        }

        const user = await response.json() as UserWithToken

        localStorage.setItem('user', JSON.stringify(user))

        return user
    }

    public async login(data: LoginData): Promise<UserWithToken> {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        // login error
        if (response.status === 400) {
            const data = await response.json() as {message: string}
            throw new Error(data.message)
        }

        // other errors
        if (response.status !== 200) {
            throw new Error('Login request failed.')
        }

        const user = await response.json() as UserWithToken

        localStorage.setItem('user', JSON.stringify(user))

        return user
    }

    public async logout(): Promise<void> {
        localStorage.removeItem('user')
    }

    public getStoredUser(): UserWithToken|null {
        const storageUser = localStorage.getItem('user')

        if (!storageUser) {
            return null
        }

        return JSON.parse(storageUser) as UserWithToken
    }
}

const authService = new AuthService()

export default authService
