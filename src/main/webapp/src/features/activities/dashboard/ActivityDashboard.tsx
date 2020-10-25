// @flow
import * as React from 'react';
import {Grid, GridColumn} from "semantic-ui-react";
import {IActivity} from "../../../app/models/activity";
import {ActivityList} from "./ActivityList";
import {ActivityDetails} from "../details/ActivityDetails";
import {ActivityForm} from "../form/ActivityForm";

type Props = {
    activities: IActivity[],
    selectActivity: (id: string | null | undefined) => void,
    selectedActivity: IActivity,
    editMode: boolean,
    setEditMode: (editMode: boolean) => void
    setSelectedActivity: (activity: IActivity | null) => void
    createActivity: (activity: IActivity) => void
    editActivity: (activity: IActivity) => void
    deleteActivity: (id: string | null | undefined) => void
};

export function ActivityDashboard(
    {
        activities,
        selectActivity,
        selectedActivity,
        editMode,
        setEditMode,
        setSelectedActivity,
        createActivity,
        editActivity,
        deleteActivity
    }: Props) {
    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList deleteActivity={deleteActivity} selectActivity={selectActivity} activities={activities}/>
            </GridColumn>
            <GridColumn width={6}>
                {selectedActivity && !editMode &&
                <ActivityDetails
                    setEditMode={setEditMode}
                    selectedActivity={selectedActivity!}
                    setActivity={setSelectedActivity}/>}
                {editMode &&
                <ActivityForm key={(selectedActivity && selectedActivity.id) || 0} setEditMode={setEditMode}
                              selectedActivity={selectedActivity!}
                              createActivity={createActivity}
                              editActivity={editActivity}/>}
            </GridColumn>
        </Grid>
    );
};