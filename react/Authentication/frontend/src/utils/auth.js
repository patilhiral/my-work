import { redirect } from "react-router-dom";

export function getAuthToken(){
    const token = localStorage.getItem('token');
    if(!token){
        return
    }
    const tokenDuration = getTokenDuration();
    if(tokenDuration<0){
        return 'EXPIRED'
    }
    return token;
}
export function getTokenDuration(){
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now =new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function loader(){
    return getAuthToken();
}

export function checkAuthToken(){
    const token =getAuthToken();
    if(!token){
        return redirect('/auth');
    }
    return null;
}