import axios from "axios";

export function query_posts(callback) {
    axios.get(import.meta.env.VITE_API_URL + '/blog/list.php').then((resp) => {
        callback(resp.data.payload);
    });
}

export function fetch_post(id, callback) {
    axios.get(import.meta.env.VITE_API_URL + '/blog/fetch.php?id=' + id).then((resp) => {
        callback(resp.data.payload);
    });
}

export function add_edit_post(payload, callback) {
    axios.put(import.meta.env.VITE_API_URL + '/blog/edit.php', payload, {withCredentials: true}).then((resp) => {
        callback(true, null);
    }).catch((err) => {
        callback(false, err.response.data.message);
    });
}