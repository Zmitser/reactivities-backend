// @flow
import * as React from 'react';
import {FieldRenderProps} from "react-final-form";
import {FormField, FormFieldProps, Label} from "semantic-ui-react";

type Props = FieldRenderProps<string, HTMLTextAreaElement> & FormFieldProps & {};

export function TextAreaInput({input, width, rows, placeholder, meta: {touched, error}}: Props) {
    return (
        <FormField error={touched && !!error}  width={width}>
            <textarea {...input} rows={rows} placeholder={placeholder} />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </FormField>
    );
};