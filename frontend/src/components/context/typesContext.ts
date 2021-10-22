import { ReactNode } from 'react';

type User = {
    id: string,
    name?: string,
    login: string,
    avatar_url: string
}

type AuthContextData = {
    user: User | null,
    signInUrl: string,
    signOut: () => void
}


type AuthProviderType = {
    children: ReactNode;
}

type AuthResponse = {
    token: string,
    user: User
}
export type {
    AuthContextData,
    AuthProviderType,
    AuthResponse,
    User
}