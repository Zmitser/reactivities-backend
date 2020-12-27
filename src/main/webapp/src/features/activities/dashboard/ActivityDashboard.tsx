// @flow
import * as React from 'react';
import {Grid, GridColumn} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Loading} from "../../../app/layout/Loading";
import {RootStoreContext} from "../../../app/stores/rootStore";


const ActivityDashboard = () => {
    const {activityStore} = useContext(RootStoreContext);

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