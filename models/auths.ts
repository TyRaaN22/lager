import config from "../config/config.json";
import storage from "./storage";

const authModel = {
    loggedIn: async function loggedIn(email: string, password: string) {
        const tokenAndDate = storage.readToken();
        const twentyFourHours = 1000*60*60*24;
        const notExpired = (new Date().getTime() - tokenAndDate.date) < twentyFourHours;


        return tokenAndDate.token && notExpired;
    },

    register: async function register(email: string, password:string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password
        };

        const response = await fetch(`${config.base_url}/auth/register`,
        {
            method:"POST",
            body:JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        });
        const result = await response.json();

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger",
            };
        }

        return {
            title: "Registrering",
            message: result.data.message,
            type: "success",
        } 
    },

    login: async function login(email:string, password:string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password
        };

        const response = await fetch(`${config.base_url}/auth/login`,
        {
            method:"POST",
            body:JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        });
        const result = await response.json();

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger",
            };
        }

        await storage.storeToken(result.data.token);
        return {
            title: "Inloggning",
            message: result.data.message,
            type: "success"
        }
    },

    logout: async function logout() {
        await storage.deleteToken();
    }

};

export default authModel;