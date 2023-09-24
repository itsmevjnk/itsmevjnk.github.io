import axios from 'axios';
import {ref} from 'vue';
export const logged_in = ref(false);

export function verify_login(callback) {
    axios.get(import.meta.env.VITE_API_URL + '/auth/verify.php', {withCredentials: true}).then((resp) => {
        callback(resp.data.payload.valid);
    });
}
verify_login((result) => logged_in.value = result);

export function login(user, password, callback) {
    axios.post(import.meta.env.VITE_API_URL + '/auth/login.php', {
        user: user,
        password: password
    }, {withCredentials: true}).then((resp) => {
        callback(true, resp.data.message);
    }).catch((err) => {
        callback(false, err.response.data.message);
    })
}

export function register(user, password, callback) {
    axios.post(import.meta.env.VITE_API_URL + '/auth/register.php', {
        user: user,
        password: password
    }, {withCredentials: true}).then((resp) => {
        callback(true, resp.data.message);
    }).catch((err) => {
        callback(false, err.response.data.message);
    })
}

export function logout(callback) {
    axios.delete(import.meta.env.VITE_API_URL + '/auth/logout.php', {withCredentials: true}).then((resp) => {
        callback();
    });
}