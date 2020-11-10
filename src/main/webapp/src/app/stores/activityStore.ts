import {action, computed, configure, makeObservable, observable} from "mobx";
import {createContext} from "react";
import {IActivity} from "../models/activity";
import agent from "../../api/agent";

configure({enforceActions: "always"})

class ActivityStore {
    @observable activityRegistry = new Map<string | undefined, IActivity>()
    @observable selectedActivity: IActivity | undefined | null = null
    @observable loadingInitial = false
    @observable submitting = false

    @computed get activitiesByDate() {
        return [...this.activityRegistry.values()].sort(((a, b) => Date.parse(a.date) - Date.parse(b.date)))
    }

    @action loadActivities = async () => {
        try {
            this.loadingInitial = true
            const activities = await agent.Activities.list()
            activities.forEach((activity: IActivity) => this.activityRegistry.set(activity.id, activity))
        } catch (error) {
            console.log(error)
        } finally {
            this.loadingInitial = false
        }
    }

    @action loadActivity = async (id: string) => {
        const activity = this.activityRegistry.get(id);
        console.log('dasdsad', activity)
        if (activity) {
            this.selectedActivity = activity
        }
        else {
            this.loadingInitial = true
            try {
                this.selectedActivity = await agent.Activities.details(id)
            } catch (error) {
                console.log(error)
            } finally {
                this.loadingInitial = false
            }
        }
    }

    @action clearActivity = () => {
        this.selectedActivity = null
    }

    @action createActivity = async (preparedActivity: IActivity) => {
        try {
            this.submitting = true
            await agent.Activities.create(preparedActivity)
            this.activityRegistry.set(preparedActivity.id, preparedActivity)
            this.selectedActivity = preparedActivity
        } catch (e) {
            console.log(e)
        } finally {
            this.submitting = false
        }

    }

    @action editActivity = async (activity: IActivity) => {
        console.log('fdsfdsfdsfdsfds')
        this.submitting = true
        try {
            await agent.Activities.edit(activity)
            this.activityRegistry.set(activity.id, activity)
            this.selectedActivity = activity
        } catch (e) {
            console.log(e)
        } finally {
            this.submitting = false
        }
    }

    @action deleteActivity = async (id: string | undefined) => {
        this.submitting = true
        try {
            await agent.Activities.delete(id)
            this.activityRegistry.delete(id)
        } catch (e) {
            console.log(e)
        } finally {
            this.submitting = false
        }
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined
    }

    constructor() {
        makeObservable(this)
    }
}

export default createContext(new ActivityStore())