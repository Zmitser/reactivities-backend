// @flow
import * as React from 'react';
import {Button, ButtonGroup, Card, Image} from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Link, RouteComponentProps} from 'react-router-dom';
import {Loading} from "../../../app/layout/Loading";

type DetailParams = {
    id: string
}

const ActivityDetails = ({match, history}: RouteComponentProps<DetailParams>) => {
    const {selectedActivity, loadActivity, loadingInitial} = useContext(ActivityStore)

    useEffect(() => {
        loadActivity(match.params.id)

    }, [loadActivity, match.params.id, selectedActivity])

    if (loadingInitial || !selectedActivity) {
        return <Loading content='Loading activity...'/>
    }
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
                    <Button as={Link} to={`/manage/${selectedActivity?.id}`} basic color='blue' content='Edit'/>
                    <Button onClick={() => history.push('/activities')} basic color='yellow' content='cancel'/>
                </ButtonGroup>
            </Card.Content>
        </Card>
    );
};
export default observer(ActivityDetails)