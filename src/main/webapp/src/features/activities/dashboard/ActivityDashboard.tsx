// @flow
import * as React from 'react';
import {Grid, GridColumn} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Loading} from "../../../app/layout/Loading";
import {RootStoreContext} from "../../../app/stores/rootStore";


const ActivityDashboard = () => {
    const {loadActivities, loadingInitial} = useContext(RootStoreContext).activityStore;

    useEffect(() => {
        loadActivities()
    }, [loadActivities])

    if (loadingInitial) return <Loading content='Loading activities...'/>
    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList/>
            </GridColumn>
        </Grid>
    );
};

export default observer(ActivityDashboard)