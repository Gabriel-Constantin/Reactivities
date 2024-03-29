import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Activity } from "../Models/Activity";
import { toast } from "react-toastify";
import { history } from "../..";
import { store } from "./Stores/Store";

const sleepAmount = 1000;

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

axios.defaults.baseURL = "http://192.168.1.20:5000/api";

axios.interceptors.response.use(async response => {
    await sleep(sleepAmount);
    return response;
}, (error : AxiosError) => {
    const { data, status, config } : {data: any, status: number, config: InternalAxiosRequestConfig} = error.response!;
    switch (status) {
        case 400:
            if (typeof data === "string") {
                toast.error(data);
            }
            if (config.method === "get" && data.errors.hasOwnProperty("id")) {
                history.push("/not-found");
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in (data as any).errors) {
                    if (data.errors[ key ]) {
                        modalStateErrors.push(data.errors[ key ]);
                    }
                }
                throw modalStateErrors.flat();
            } 
            break;
        case 401:
            toast.error("Unauthorised");
            break;
        case 404:
            history.push("/not-found")
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push("/server-error")
            break;
    }
    return Promise.reject(error);
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => request.get<Activity[]>("/activities"),
    details: (id: string) => request.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => request.post<void>("/activities", activity),
    update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.del(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;