// @flow
import * as React from 'react';
import {Button, ButtonGroup, Card, Image} from "semantic-ui-react";
import {IActivity} from "../../../app/models/activity";

type Props = {
    selectedActivity: IActivity
    setEditMode: (editMode: boolean) => void
    setActivity: (activity: IActivity | null) => void
};

export function ActivityDetails({selectedActivity, setEditMode, setActivity}: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/images/categories/${selectedActivity?.category}.jpg`} wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{selectedActivity?.title}</Card.Header>
                <Card.Meta>
                    <span>{selectedActivity?.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity?.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit'/>
                    <Button onClick={() => setActivity(null)} basic color='yellow' content='cancel'/>
                </ButtonGroup>
            </Card.Content>
        </Card>
    );
};