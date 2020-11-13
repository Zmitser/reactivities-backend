// @flow
import * as React from 'react';
import {Button, Form, FormField, FormInput, Grid, GridColumn, Segment, TextArea} from "semantic-ui-react";
import {IActivity} from "../../../app/models/activity";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import ActivityStore from "../../../app/stores/activityStore";
import {useContext} from "react";
import {observer} from "mobx-react-lite";
import {RouteComponentProps, useHistory} from "react-router-dom";

type DetailParams = {
    id: string | undefined
}

const ActivityForm = ({match, history}: RouteComponentProps<DetailParams>) => {

    const {push} = useHistory()

    const {createActivity, submitting, editActivity, selectedActivity: initialFormState, loadActivity, clearActivity} = useContext(ActivityStore)

    const [selectedActivity, setSelectedActivity] = useState<IActivity>({
            id: '',
            title: '',
            category: '',
            description: '',
            date: '',
            city: '',
            venue: ''
        }
    )

    useEffect(() => {
        if (match.params.id && selectedActivity.id?.length === 0) {
            loadActivity(match.params.id).then(() => initialFormState && setSelectedActivity(initialFormState))
        }

        return () => {
            clearActivity();
        }
    }, [match.params.id, loadActivity, clearActivity, initialFormState, selectedActivity.id])


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setSelectedActivity({...selectedActivity, [name]: value})
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (selectedActivity.id) {
            editActivity(selectedActivity).then(() => history.push(`/activities/${selectedActivity.id}`))
        } else {
            const preparedActivity: IActivity = {...selectedActivity, id: mongoObjectId()}
            createActivity(preparedActivity).then(() => history.push(`/activities/${preparedActivity?.id}`))
        }
    }

    const mongoObjectId = (): string => {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return `${timestamp}xxxxxxxxxxxxxxxx`.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)).toLowerCase();
    };
    return (
        <Grid>
            <GridColumn width={10}>
                <Segment clearing>
                    <Form onSubmit={handleSubmit}>
                        <FormField onChange={handleInputChange} name='title' control={FormInput} value={selectedActivity.title}
                                   placeholder='Title'/>
                        <FormField onChange={handleInputChange} control={TextArea} name='description'
                                   value={selectedActivity.description}
                                   placeholder='Description'/>
                        <FormField onChange={handleInputChange} control={FormInput} name='category'
                                   value={selectedActivity.category}
                                   placeholder='Category'/>
                        <FormField onChange={handleInputChange} control={FormInput} name='date' value={selectedActivity.date}
                                   type='datetime-local' placeholder='Date'/>
                        <FormField onChange={handleInputChange} control={FormInput} name='city' value={selectedActivity.city}
                                   placeholder='City'/>
                        <FormField onChange={handleInputChange} control={FormInput} name='venue' value={selectedActivity.venue}
                                   placeholder='Venue'/>
                        <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                        <Button onClick={() => push('/activities')} floated='right' type='button' content='Cancel'/>
                    </Form>
                </Segment>
            </GridColumn>
        </Grid>
    );
};

export default observer(ActivityForm)
