// @flow
import * as React from 'react';
import {FieldRenderProps} from "react-final-form";
import {FormField, FormFieldProps, Label} from "semantic-ui-react";

type Props = FieldRenderProps<string, HTMLInputElement> & FormFieldProps & {};

export function TextInput({input, width, type, placeholder, meta: {touched, error}}: Props) {
    return (
        <FormField error={touched && !!error} type={type} width={width}>
            <input {...input} placeholder={placeholder} />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </FormField>
    );
};