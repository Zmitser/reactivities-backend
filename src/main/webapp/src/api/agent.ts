import axios, {AxiosResponse} from 'axios'
import {IActivity} from "../app/models/activity";
import {history} from "../index";
import {toast} from "react-toastify";
import {IUser, IUserFormValues} from "../app/models/user";


axios.defaults.baseURL = '/api/v1'

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

axios.interceptors.response.use(undefined, error => {
    const status = error.response.status;

    if (!window.navigator.onLine) {
        toast.error('Network error - make sure API is running!')
    }

    if (status === 404) {
        history.push('/notfound')
    }

    if (status === 500) {
        toast.error('Server Error - check the terminal for more info!')
    }
    throw error.response
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

const User = {
    current: (): Promise<IUser> => requests.get('/users/current'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post('/users/authenticate', user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post('/users/register', user)
}

export default {
    Activities,
    User
}