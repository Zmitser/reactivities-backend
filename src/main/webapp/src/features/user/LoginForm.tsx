// @flow
import * as React from 'react';
import {Form as FinalForm, Field} from 'react-final-form'
import {Button, Form, Header} from "semantic-ui-react";
import {TextInput} from "../../app/common/form/TextInput";
import {useContext} from "react";
import {RootStoreContext} from "../../app/stores/rootStore";
import {IUserFormValues} from "../../app/models/user";
import {FORM_ERROR} from 'final-form'
import {combineValidators, isRequired} from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
})

export function LoginForm() {
    const {userStore} = useContext(RootStoreContext)
    const {login} = userStore
    return (
        <FinalForm validate={validate} onSubmit={
            (values: IUserFormValues) => login(values).catch(error => ({
                [FORM_ERROR]: error
            }))
        }
                   render={({handleSubmit, submitting, form, submitError, pristine, invalid, dirtySinceLastSubmit}) => (
                       <>
                           <Header as='h2' content='Login to Reactivities' color='teal'/>
                           <Form onSubmit={handleSubmit} error>
                               <Field name='email' component={TextInput} placeholder='Email'/>
                               <Field name='password'
                                      component={TextInput}
                                      placeholder='Password'
                                      type='password'/>
                               {submitError && !dirtySinceLastSubmit &&
                               <ErrorMessage error={submitError} text='Invalid email or password' /> }
                               <Button disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                                       color='teal'
                                       fluid
                                       loading={submitting}
                                       content='Login'/>
                           </Form>
                       </>
                   )}
        />
    );
}