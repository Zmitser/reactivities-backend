// @flow
import * as React from 'react';
import {Button, Header, Image, Item, ItemContent, ItemGroup, Segment, SegmentGroup} from "semantic-ui-react";
import {IActivity} from "../../../app/models/activity";
import {observer} from "mobx-react-lite";

type Props = {
    activity: IActivity
};

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
}

const ActivityDetailedHeader = ({activity}: Props) => {
    return (
        <SegmentGroup>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/images/categories/${activity.category}.jpg`} fluid style={activityImageStyle}/>
                <Segment basic style={activityImageTextStyle}>
                    <ItemGroup>
                        <Item>
                            <ItemContent>
                                <Header size='huge'
                                        content={activity.title}
                                        style={{color: 'white'}}/>
                                <p>{activity.date}</p>
                                <p>Hosted by <strong>Swagger.json</strong></p>
                            </ItemContent>
                        </Item>
                    </ItemGroup>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button color='orange' floated='right'>Manage Event</Button>
            </Segment>
        </SegmentGroup>
    );
};

export default observer(ActivityDetailedHeader)