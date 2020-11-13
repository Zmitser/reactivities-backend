// @flow
import * as React from 'react';
import {Button, Icon, Item, ItemGroup, ItemImage, Segment, SegmentGroup} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {IActivity} from "../../../app/models/activity";

type Props = {
    activity: IActivity
};


export function ActivityListItem({activity}: Props) {
    return (
        <SegmentGroup>
            <Segment>
                <ItemGroup>
                    <Item key={activity.id}>
                        <ItemImage size='tiny' circular src='/assets/images/user.png'/>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Description>
                                Hosted By Swagger.json
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <Icon name='clock'/> {activity.date}
                <Icon name='marker'/> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link}
                        to={`/activities/${activity.id}`}
                        floated='right'
                        content='View'
                        color='blue'/>
            </Segment>
        </SegmentGroup>
    );
};