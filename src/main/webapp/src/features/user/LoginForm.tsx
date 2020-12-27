// @flow
import * as React from 'react';
import {Form as FinalForm, Field} from 'react-final-form'
import {Button, Form, Label} from "semantic-ui-react";
import {TextInput} from "../../app/common/form/TextInput";
import {useContext} from "react";
import {RootStoreContext} from "../../app/stores/rootStore";
import {IUserFormValues} from "../../app/models/user";
import {FORM_ERROR} from 'final-form'
import {combineValidators, isRequired} from "revalidate";

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
                       <Form onSubmit={handleSubmit}>
                           <Field name='email' component={TextInput} placeholder='Email'/>
                           <Field name='password'
                                  component={TextInput}
                                  placeholder='Password'
                                  type='password'/>
                           {submitError && !dirtySinceLastSubmit && <Label color='red' basic content={submitError.statusText}/>}
                           <Button disabled={invalid && !dirtySinceLastSubmit || pristine} positive loading={submitting} content='Login'/>
                           <pre>{JSON.stringify(form.getState(), null, 2)}</pre>
                       </Form>
                   )}
        />
    );
}