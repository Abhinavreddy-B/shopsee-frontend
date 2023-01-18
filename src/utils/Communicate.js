import axios from "axios"

const baseUrl = 'http://10.1.135.24:5000'

let token = null

const resetToken = () => {
    token = null
    return 
}

const setToken = (user) => {
    if(user === null){
        token = null
        return
    }
    token = `Bearer ${user.token}`
}


const getAllItems = async () => {
    const res = await axios.get(`${baseUrl}/api/items`)
    return res.data
}

const signIn = async (credentials,type) => {
    const res = await axios.post(`http://10.1.135.24:5000/api/${type}/login`,credentials)
    return res.data
}

const signUp = async (credentials, type) => {
    const res = await axios.post(`http://10.1.135.24:5000/api/${type}/signup`,credentials)
    return res.data
}

const addnewItem = async (item) => {
    const config = {
        headers: { Authorization: token }
    };
    const res = await axios.post('http://10.1.135.24:5000/api/items',item,config)
    return res.data
}

const ServerMethods = {resetToken,setToken, getAllItems,signIn,addnewItem,signUp}

export default ServerMethods