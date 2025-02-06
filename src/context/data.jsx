import React,{createContext,useContext,useState,useEffect} from "react";
import { useJwt } from "react-jwt";
const dataToken=createContext({
   isLoggedIn:false,
    setLoggedIn:()=>{},
    decodedToken:"",
    isExpired:false

});
export const useData=() => useContext(dataToken);
export default function DataTokenProvider({children}){
    const token=window.sessionStorage.getItem("_token")
    const { decodedToken, isExpired } = useJwt(token);
    const [isLoggedIn,setLoggedIn]=useState(false);
    console.log(token)
    useEffect(()=>{
      if(token){
        setLoggedIn(true)
      }else{
        setLoggedIn(false)
      }
    },[token])
    const value={
        isLoggedIn,
        token,
        setLoggedIn,
        decodedToken,
        isExpired
    }
return <dataToken.Provider value={value}>
    {children}
</dataToken.Provider>
}