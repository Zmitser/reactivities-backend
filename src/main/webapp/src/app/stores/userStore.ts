import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {IUser, IUserFormValues} from "../models/user";
import agent from "../../api/agent";
import {RootStore} from "./rootStore";
import {history} from '../../index'
import {toast} from "react-toastify";

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
            this.rootStore.commonStore.setToken(user.token)
            history.push('/activities')
            this.rootStore.modalStore.closeModal()
        } catch (error) {
            throw error
        }
    }

    @action register = async (values: IUserFormValues) => {
        try {
            await agent.User.register(values)
            toast.info('The register is successful. Now you can login')
            this.rootStore.modalStore.closeModal()
        } catch (error) {
            throw error
        }
    }

    @action getUser = async () => {
        try {
            const user = await agent.User.current()
            runInAction(() => {
                this.user = user;
            })
        } catch (e) {
            console.log(e)
        }
    }

    @action logout = () => {
        this.rootStore.commonStore.setToken(null)
        this.user = null
        history.push('/')
    }


    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }
}