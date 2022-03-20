import React, {useEffect, useState } from "react";
import {Route , Redirect} from 'react-router-dom';
import {auth} from "./../../Fire Base/firebase";

function PrivateRoute ({component: RouteComponent , ...rest}){
    const[user , setUser] = useState(null);
    const[frender , setFrender] = useState(false)
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
            setFrender(true)
            console.log(user , "usssssssssssss")
        })
    } , [])

        if(frender){
                return(
                    <Route {...rest} render={(routeProps) => !user ? <Redirect to="/login" /> : <RouteComponent {...routeProps}/> } />
                )
        } else {
            return null
        }
            
}

export default PrivateRoute;