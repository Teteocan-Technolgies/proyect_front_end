import api from "../axios";

export default {

    login(credentials){
        return api.post('/auth/login', credentials);
    },

    logout(credentials){
        return api.post('/auth/logout');
    },
    register(credentials){
        return api.post('/auth/register', credentials);
    }
}