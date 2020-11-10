import axios, {AxiosResponse} from 'axios'
import {IActivity} from "../app/models/activity";


axios.defaults.baseURL = '/api/v1'

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