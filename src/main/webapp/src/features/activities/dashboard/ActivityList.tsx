// @flow
import * as React from 'react';
import {Button, Item, Label, Segment} from 'semantic-ui-react';
import {IActivity} from "../../../app/models/activity";
import ActivityStore from "../../../app/stores/activityStore";
import {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";


const ActivityList = () => {
    const {activitiesByDate, deleteActivity, submitting} = useContext(ActivityStore)
    return (
        <Segment clearing>
            <Item.Group divided>
                {
                    activitiesByDate.map((activity: IActivity) => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button as={Link}
                                            to={`/activities/${activity.id}`}
                                            floated='right'
                                            content='View'
                                            color='blue'/>
                                    <Button onClick={() => deleteActivity(activity.id)}
                                            floated='right'
                                            content='Delete'
                                            name={activity.id}
                                            loading={submitting}
                                            color='red'/>
                                    <Label basic content={activity.category}/>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
            </Item.Group>
        </Segment>
    );
};
export default observer(ActivityList)