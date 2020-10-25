// @flow
import * as React from 'react';
import {Button, Form, FormField, FormInput, Segment, TextArea} from "semantic-ui-react";
import {IActivity} from "../../../app/models/activity";
import {ChangeEvent, FormEvent, useState} from "react";

type Props = {
    setEditMode: (mode: boolean) => void
    selectedActivity: IActivity
    createActivity: (activity: IActivity) => void
    editActivity: (activity: IActivity) => void
};

export function ActivityForm({setEditMode, selectedActivity: initialFormState, createActivity, editActivity}: Props) {
    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState
        } else {
            return {
                id: null,
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }

    }

    const [activity, setActivity] = useState<IActivity>(initializeForm)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        activity.id ? editActivity(activity) : createActivity(activity)
        console.log(activity)
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <FormField onChange={handleInputChange} name='title' control={FormInput} value={activity.title}
                           placeholder='Title'/>
                <FormField onChange={handleInputChange} control={TextArea} name='description'
                           value={activity.description}
                           placeholder='Description'/>
                <FormField onChange={handleInputChange} control={FormInput} name='category' value={activity.category}
                           placeholder='Category'/>
                <FormField onChange={handleInputChange} control={FormInput} name='date' value={activity.date}
                           type='datetime-local' placeholder='Date'/>
                <FormField onChange={handleInputChange} control={FormInput} name='city' value={activity.city}
                           placeholder='City'/>
                <FormField onChange={handleInputChange} control={FormInput} name='venue' value={activity.venue}
                           placeholder='Venue'/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    );
};