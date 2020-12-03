import axios, {AxiosResponse} from 'axios'
import {IActivity} from "../app/models/activity";
import {history} from "../index";
import {toast} from "react-toastify";


axios.defaults.baseURL = '/api/v1'
axios.interceptors.response.use(undefined, error => {
    const status = error.response.status;

    if ((error.message === 'Network error' && !error.response) || window.navigator.onLine) {
        toast.error('Network error - make sure API is running!')
    }

    if (status === 404) {
        history.push('/notfound')
    }

    if (status === 500) {
        toast.error('Server Error - check the terminal for more info!')
    }
    throw error

})

const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Activities = {
    list: () => requests.get("/activities"),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post("/activities", activity),
    edit: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string | undefined) => requests.delete(`/activities/${id}`)
}

export default {
    Activities
}