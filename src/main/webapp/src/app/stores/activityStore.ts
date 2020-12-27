import {action, computed, configure, makeObservable, observable} from "mobx";
import {IActivity} from "../models/activity";
import agent from "../../api/agent";
import {history} from '../../index'
import {RootStore} from "./rootStore";


configure({enforceActions: "always"})

export default class ActivityStore {
    rootStore: RootStore;

    @observable activityRegistry = new Map<string | undefined, IActivity>()
    @observable selectedActivity: IActivity | undefined | null = null
    @observable loadingInitial = false
    @observable submitting = false

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate([...this.activityRegistry.values()])
    }


    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(((a, b) => a.date.getTime() - b.date.getTime()));
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity]
            return activities
        }, {} as { [key: string]: IActivity[] }))
    }

    @action loadActivities = async () => {
        try {
            this.loadingInitial = true
            const activities = await agent.Activities.list()
            activities.forEach((activity: IActivity) => {
                activity.date = new Date(activity.date)
                this.activityRegistry.set(activity.id, activity)
            })
        } catch (error) {
            console.log(error)
        } finally {
            this.loadingInitial = false
        }
    }

    @action loadActivity = async (id: string) => {
        const activity = this.activityRegistry.get(id);
        if (activity) {
            this.selectedActivity = activity
            return activity
        } else {
            this.loadingInitial = true
            try {
                const activity = await agent.Activities.details(id)
                activity.date = new Date(activity.date)
                this.selectedActivity = activity
                this.activityRegistry.set(activity.id, activity)
                return activity
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
            history.push(`/activities/${preparedActivity?.id}`)
        } catch (e) {
            console.log(e)
        } finally {
            this.submitting = false
        }

    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true
        try {
            await agent.Activities.edit(activity)
            this.activityRegistry.set(activity.id, activity)
            this.selectedActivity = activity
            history.push(`/activities/${activity.id}`)
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

    constructor(rootStore:RootStore) {
        this.rootStore = rootStore
        makeObservable(this)
    }
}