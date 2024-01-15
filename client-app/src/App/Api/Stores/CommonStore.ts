import { makeAutoObservable } from "mobx";
import { ServerError } from "../../Models/ServerError";

export default class CommonStore {
    Error : ServerError | null = null;

    constructor () {
        makeAutoObservable(this);
    }

    setServerError = (error : ServerError) => {
        this.Error = error;
    }
}