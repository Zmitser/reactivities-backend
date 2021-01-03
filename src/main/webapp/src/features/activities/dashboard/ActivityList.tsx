// @flow
import * as React from 'react';
import {Item, Label} from 'semantic-ui-react';
import {IActivity} from "../../../app/models/activity";
import {useContext, Fragment} from "react";
import {observer} from "mobx-react-lite";
import {ActivityListItem} from "./ActivityListItem";
import {RootStoreContext} from "../../../app/stores/rootStore";
import {format} from 'react-widgets-date-fns'


const ActivityList = () => {
    const {activityStore} = useContext(RootStoreContext)
    const {activitiesByDate} = activityStore
    return (
        <>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {format(group, 'eeee do MMMM')}
                    </Label>
                    <Item.Group divided>
                        {
                            activities.map((activity: IActivity) => (
                                <ActivityListItem key={activity.id} activity={activity}/>
                            ))
                        }
                    </Item.Group>
                </Fragment>

            ))}
        </>
    )
};
export default observer(ActivityList)