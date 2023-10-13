import { createContext, ReactNode, useState, useEffect } from 'react'
import { api } from '../services/apiClient'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { toast } from 'react-toastify'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try {
        destroyCookie(undefined, '@tasklist.token')
        Router.push('/')
    } catch (error) {
        console.log('Erro ao deslogar');       
    }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user; //boolean 

    useEffect(() => {
        const { '@tasklist.token': token} = parseCookies()

        if(token){
            api.get('/me').then(response => {
                const { id, name, email } = response.data

                setUser({id, name, email})
            })
            .catch(() => {
                signOut()
            })
        }

    }, [])

    async function signIn({email, password}: SignInProps){
        try {
            const response = await api.post('/login', {email, password})
            
            const {id, name, token} = response.data
            setCookie(undefined, '@tasklist.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })

            setUser({id, name, email})
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            Router.push('/painel')

        } catch (error) {
            console.log('Erro ao acessar: ', error)
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try {
            const response = api.post('/signup', {name, email, password})
            toast.success('Conta criada com sucesso')
            Router.push('/')
        } catch (error) {
            toast.error('Erro ao tentar se cadastrar');    
            console.log('Erro cadastro: ', error)     
        }
    }

    return(
       <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
          {children}
       </AuthContext.Provider> 
    )
}