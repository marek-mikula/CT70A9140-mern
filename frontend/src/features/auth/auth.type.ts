export interface RegisterData {
    name: string
    email: string
    password: string
}

export interface LoginData {
    email: string
    password: string
}

export interface User {
    id: string
    name: string
    email: string
}

export interface UserWithToken extends User {
    token: string
}
