import React from 'react'
import { useEffect,useState } from 'react';
import { useContext } from 'react';
import {auth , provider} from '../firebase'

export const AuthContext = React.createContext();

export function useAuth()
{
    return useContext(AuthContext)
}

export function AuthProvider({ children })
{
    const [currentUser, setCurrentUser] = useState();
    const[loading,setLoading] = useState(true);

    function login(email,password)
    {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout()
    {
        return auth.signOut();
    }

    function register(email,password)
    {
        return auth.createUserWithEmailAndPassword(email,password);
    }

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false);  
        })

        return unsubscribe
    },[])

    const value = {
        currentUser,
        logout,
        login,
        register
    }
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
    


