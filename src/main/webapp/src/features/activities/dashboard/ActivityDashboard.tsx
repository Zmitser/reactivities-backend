// @flow
import * as React from 'react';
import {Grid, GridColumn} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Loading} from "../../../app/layout/Loading";
import ActivityStore from "../../../app/stores/activityStore";


const ActivityDashboard = () => {
    const activityStore = useContext(ActivityStore);

    useEffect(() => {
        activityStore.loadActivities()
    }, [activityStore])

    if (activityStore.loadingInitial) return <Loading content='Loading activities...'/>
    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList/>
            </GridColumn>
        </Grid>
    );
};

export default observer(ActivityDashboard)