// @flow
import * as React from 'react';
import {Button, Form, FormGroup, Grid, GridColumn, Segment} from "semantic-ui-react";
import {ActivityFormValues, IActivity} from "../../../app/models/activity";
import {useEffect, useState} from "react";
import ActivityStore from "../../../app/stores/activityStore";
import {useContext} from "react";
import {observer} from "mobx-react-lite";
import {RouteComponentProps, useHistory} from "react-router-dom";
import {Form as FinalForm, Field} from "react-final-form"
import {TextInput} from "../../../app/common/form/TextInput";
import {TextAreaInput} from "../../../app/common/form/TextAreaInput";
import {SelectInput} from "../../../app/common/form/SelectInput";
import {category} from "../../../app/common/options/categoryOptions";
import {DateInput} from "../../../app/common/form/DateInput";
import {combineDateTime} from "../../../app/common/util/util";
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from "revalidate"


const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message: "Description needs to be at least 5 characters"})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
})


type DetailParams = {
    id: string | undefined
}

const ActivityForm = ({match}: RouteComponentProps<DetailParams>) => {

    const {push} = useHistory()

    const {submitting, loadActivity, createActivity, editActivity} = useContext(ActivityStore)

    const [selectedActivity, setSelectedActivity] = useState(new ActivityFormValues())

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (match.params.id) {
            setLoading(true)
            loadActivity(match.params.id)
                .then((activity) => setSelectedActivity(new ActivityFormValues(activity)))
                .finally(() => setLoading(false))
        }
    }, [match.params.id, loadActivity])


    const handleFinalFormSubmit = (values: any) => {
        const dateTime = combineDateTime(values.date, values.time);
        const {date, time, ...selectedActivity} = values
        selectedActivity.date = dateTime
        if (selectedActivity.id) {
            editActivity(selectedActivity)
        } else {
            const preparedActivity: IActivity = {...selectedActivity, id: mongoObjectId()}
            createActivity(preparedActivity)
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
                    <FinalForm validate={validate} initialValues={selectedActivity} onSubmit={handleFinalFormSubmit}
                               render={({handleSubmit, invalid, pristine}) => (
                                   <Form onSubmit={handleSubmit} loading={loading}>
                                       <Field name='title'
                                              value={selectedActivity.title}
                                              component={TextInput}
                                              placeholder='Title'/>
                                       <Field component={TextAreaInput}
                                              name='description'
                                              rows={3}
                                              value={selectedActivity.description}
                                              placeholder='Description'/>
                                       <Field component={SelectInput}
                                              options={category}
                                              name='category'
                                              value={selectedActivity.category}
                                              placeholder='Category'/>
                                       <FormGroup widths='equal'>
                                           <Field component={DateInput}
                                                  name='date'
                                                  date
                                                  value={selectedActivity.date}
                                                  placeholder='Date'/>
                                           <Field component={DateInput}
                                                  name='time'
                                                  time
                                                  value={selectedActivity.time}
                                                  placeholder='Time'/>
                                       </FormGroup>
                                       <Field component={TextInput}
                                              name='city'
                                              value={selectedActivity.city}
                                              placeholder='City'/>
                                       <Field component={TextInput}
                                              name='venue'
                                              value={selectedActivity.venue}
                                              placeholder='Venue'/>
                                       <Button disabled={loading || invalid || pristine}
                                               loading={submitting} floated='right' positive
                                               type='submit'
                                               content='Submit'/>
                                       <Button disabled={loading}
                                               onClick={selectedActivity.id
                                                   ? () => push(`/activities/${selectedActivity.id}`)
                                                   : () => push('/activities')
                                               }
                                               floated='right'
                                               type='button'
                                               content='Cancel'/>
                                   </Form>
                               )}/>
                </Segment>
            </GridColumn>
        </Grid>
    );
};

export default observer(ActivityForm)
