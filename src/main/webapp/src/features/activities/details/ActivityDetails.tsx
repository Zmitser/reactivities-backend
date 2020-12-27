// @flow
import * as React from 'react';
import {Grid, GridColumn} from "semantic-ui-react";
import {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {RouteComponentProps} from 'react-router-dom';
import {Loading} from "../../../app/layout/Loading";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import {ActivityDetailedInfo} from "./ActivityDetailedInfo";
import {ActivityDetailedChat} from "./ActivityDetailedChat";
import {ActivityDetailedSidebar} from "./ActivityDetailedSidebar";
import {RootStoreContext} from "../../../app/stores/rootStore";

type DetailParams = {
    id: string
}

const ActivityDetails = ({match, history}: RouteComponentProps<DetailParams>) => {
    const {activityStore} = useContext(RootStoreContext)
    const {selectedActivity, loadActivity} = activityStore

    useEffect(() => {
        loadActivity(match.params.id)

    }, [loadActivity, match.params.id, history])

    if (!selectedActivity) {
        return <Loading content='Loading activity...'/>
    }

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityDetailedHeader activity={selectedActivity}/>
                <ActivityDetailedInfo activity={selectedActivity}/>
                <ActivityDetailedChat/>
            </GridColumn>
            <GridColumn width={6}>
                <ActivityDetailedSidebar/>
            </GridColumn>
        </Grid>
    );
};
export default observer(ActivityDetails)