import { signOut } from "next-auth/react";
import { removeToken } from "./cookieUtils";


export function endSession(){
    removeToken();
    signOut()
}
