import axios from "axios";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import ServerMethods from "../utils/Communicate";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const {user,setUser} = useContext(UserContext)

    const signIn = async ({ userName, password },type) => {
        const credentials = {userName , password}
        const user = await ServerMethods.signIn(credentials,type)
        ServerMethods.setToken(user)
        await authStorage.setAccessToken(user)
        setUser(user)
        return user
    };

    return [signIn]
}

export default useSignIn