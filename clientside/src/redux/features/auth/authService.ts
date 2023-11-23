import axios  from 'axios';
import registrationData from "../../../interfaces/registrationData"
import toastNotify from "../../../Helpers/toastNotify";
import loginData from "../../../interfaces/loginInterface";


export const validateEmail = async (email: string) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

export const registerUser = async (userData: registrationData) => {
    try {
        const response = await axios.post("https://blogxiteapi.onrender.com/api/user/register", userData, { withCredentials: true })
        if (response.statusText === "Created") {
            toastNotify("Registration is successful", "success")
        }        
        return response.data;
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return toastNotify(message, "error")
    }
}


export const loginUser = async (userData: loginData) => {
    try {
        const response = await axios.post("https://blogxiteapi.onrender.com/api/user/login", userData, { withCredentials: true })
        if (response.statusText === "OK" || response.status === 200) {
            toastNotify("Login is successful", "success")
        }
        return response.data;
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return toastNotify(message, "error")
    }
}


export const updateUser = async (userData: any) => {
    try {
        const response = await axios.patch("https://blogxiteapi.onrender.com/api/user/updateuser", userData, { withCredentials: true })
        if (response.statusText === "OK" || response.status === 200) {
            toastNotify("User Profile Updated", "success")
        }
        return response.data;
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return toastNotify(message, "error")
    }
}


export const logoutUser = async () => {
    try {
        const response = await axios.get("https://blogxiteapi.onrender.com/api/user/logout")
        if (response.statusText === "OK" || response.status === 200) {
            toastNotify("Logout is successful", "success")
        }
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return toastNotify(message, "error")
    }
}





export const forgotPassword = async (userData: any) => {
    try {
        const response = await axios.post("https://blogxiteapi.onrender.com/api/user/forgotpassword", userData,)
        if (response.statusText === "OK" || response.status === 200) {
            toastNotify("Password Change Successful!!!", "success")
        }
        return response.data;
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return toastNotify(message, "error")
    }
}



export const changePassword = async (userData: any) => {
    try {
        const response = await axios.patch("https://blogxiteapi.onrender.com/api/user/changepassword", userData,)
        if (response.statusText === "OK" || response.status === 200) {
            toastNotify(response.data.message, "success")
        }
        return response.data;
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return toastNotify(message, "error")
    }
}


export const loginStatus = async () => {
    try {
        const response = await axios.get("https://blogxiteapi.onrender.com/api/user/loggedin")
        if (response.statusText === "OK" || response.status === 200) {
            toastNotify(response.data.message, "success")
        }
        return response.data;
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return toastNotify(message, "error")
    }
}


export const resetPassword = async (userData: any, resetToken: any) => {
    try {
        const response = await axios.put(`https://blogxiteapi.onrender.com/api/user/resetpassword/${resetToken}`, userData, { withCredentials: true })
        if (response.statusText === "OK" || response.status === 200) {
            toastNotify(response.data.message, "success")
        }
        return response.data;
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return toastNotify(message, "error")
    }
}



export const getProfile = async () => {
    try {
        const response = await axios.get("https://blogxiteapi.onrender.com/api/user/getuser")
        if (response.statusText === "OK" || response.status === 200) {
            toastNotify(response.data.message, "success")
        }
        return response.data;
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return toastNotify(message, "error")
    }
}