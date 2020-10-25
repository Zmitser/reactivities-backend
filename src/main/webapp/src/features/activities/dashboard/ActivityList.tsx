// @flow
import * as React from 'react';
import {Button, Item, Label, Segment} from 'semantic-ui-react';
import {IActivity} from "../../../app/models/activity";

type Props = {
    activities: IActivity[]
    selectActivity: (id: string | null | undefined) => void
    deleteActivity: (id: string | null | undefined) => void
};

export function ActivityList({activities, selectActivity, deleteActivity}: Props) {
    return (
        <Segment clearing>
            <Item.Group divided>
                {
                    activities.map((activity: IActivity) => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => selectActivity(activity.id)}
                                            floated='right'
                                            content='View'
                                            color='blue'/>
                                    <Button onClick={() => deleteActivity(activity.id)}
                                            floated='right'
                                            content='Delete'
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