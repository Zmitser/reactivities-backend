// @flow
import * as React from 'react';
import {Item, Label} from 'semantic-ui-react';
import {IActivity} from "../../../app/models/activity";
import ActivityStore from "../../../app/stores/activityStore";
import {useContext, Fragment} from "react";
import {observer} from "mobx-react-lite";
import {ActivityListItem} from "./ActivityListItem";


const ActivityList = () => {
    const {activitiesByDate} = useContext(ActivityStore)
    return (
        <>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {group}
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