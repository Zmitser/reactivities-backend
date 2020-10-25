import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios'
import 'semantic-ui-css/semantic.min.css'
import {Container} from "semantic-ui-react";
import {IActivity} from "../models/activity";
import {NavBar} from "../../features/nav/NavBar";
import {ActivityDashboard} from "../../features/activities/dashboard/ActivityDashboard";


function App() {

    const [activities, setActivities] = useState<IActivity[]>([])
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null | undefined>(null)
    const [editMode, setEditMode] = useState<boolean>(false)

    const handleSelectActivity = (id: string | null | undefined) => {
        let find: IActivity | undefined = activities.find((activity: IActivity) => activity.id === id);
        setSelectedActivity(find)
        setEditMode(false)
    }

    const handleOpenActivity = () => {
        setSelectedActivity(null)
        setEditMode(true)
    }

    const handleCreateActivity = (activity: IActivity) => {
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setEditMode(false)
    }
    const handleEditActivity = (activity: IActivity) => {
        setActivities([...activities.filter((a: IActivity) => a.id !== activity.id), activity])
        setSelectedActivity(activity)
        setEditMode(false)
    }

    const handleDelete = (id: string | null | undefined) => {
        setActivities([...activities.filter((a: IActivity) => a.id !== id)])
    }


    useEffect(() => {
        axios.get<IActivity[]>('/api/v1/activities')
            .then((response: AxiosResponse<IActivity[]>) => setActivities(response.data))
    }, [])

    return (
        <>
            <NavBar openActivity={handleOpenActivity}/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard selectedActivity={selectedActivity!}
                                   selectActivity={handleSelectActivity}
                                   editMode={editMode}
                                   setEditMode={setEditMode}
                                   activities={activities}
                                   createActivity={handleCreateActivity}
                                   editActivity={handleEditActivity}
                                   deleteActivity={handleDelete}
                                   setSelectedActivity={setSelectedActivity}/>
            </Container>
        </>
    );

}


export default App;
