"use client"
import { useState, createContext, useContext } from "react";

const AuthContext =  createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState()

    const value = {
        user,
        setUser
    }

    return (
        <AuthContext.Provider
        value={value}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);