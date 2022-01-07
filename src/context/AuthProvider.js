import React, { useState, useEffect, createContext } from "react"
import { auth } from "../firebase/config"
import { useNavigate } from "react-router-dom"


export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
   const [user, setUser] = useState({})
   const navigate = useNavigate()
   useEffect(() => {
      const unsubscribed = auth.onAuthStateChanged(user => {
         if (user) {
            const { displayName, email, uid, photoURL } = user
            setUser({ displayName, email, uid, photoURL })
            return navigate('/chatroom')
         }
         return navigate('/login')
      })
      return () => {
         unsubscribed();
      };
   }, [navigate])
   return (
      <AuthContext.Provider value={{ user }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider