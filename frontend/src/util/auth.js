import { redirect } from "react-router-dom";

export function getAuthToken() {
    const token = localStorage.getItem('token');
    return token;
}

export function loader() {
    return getAuthToken();
};

export function checkAuthLoader(){
    const token = getAuthToken();
    if(!token){
        console.log("Token is not valid!");
        return redirect("/auth");
    }

    return null;
}