import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {IUser, IUserFormValues} from "../models/user";
import agent from "../../api/agent";
import {RootStore} from "./rootStore";
import {history} from '../../index'

export default class UserStore {
    rootStore: RootStore;
    @observable user: IUser | null = null

    @computed get isLoggedIn() {
        return !!this.user
    }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user
            })
            console.log(this.user)
            history.push('/activities')
        } catch (error) {
            throw error
        }
    }


    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }
}