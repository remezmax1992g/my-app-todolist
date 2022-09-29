import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "8a3ca6c1-dfb0-48cf-8608-08d82687d761"
    }
})

export const authAPI = {
    login(data: LoginParamsType){
        return instance.post<ResponseAuthType<{userID?: number}>>("auth/login", data)
    },
    logout(){
        return instance.delete<ResponseAuthType>("auth/login")
    },
    getIsInitialized(){
        return instance.get<ResponseAuthType<{id: number, email:string, login: string}>>("auth/me")
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type ResponseAuthType<D = {}> = {
    data: D
    messages: Array<string>
    resultCode: number
}