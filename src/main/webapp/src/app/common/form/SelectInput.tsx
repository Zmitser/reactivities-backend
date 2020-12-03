// @flow
import * as React from 'react';
import {FieldRenderProps} from "react-final-form";
import {FormField, FormFieldProps, Label, Select} from "semantic-ui-react";

type Props = FieldRenderProps<string, HTMLSelectElement> & FormFieldProps & {};

export function SelectInput({input, width, options, placeholder, meta: {touched, error}}: Props) {
    return (
        <FormField error={touched && !!error} width={width}>
            <Select options={options}
                    onChange={(e, data) => input.onChange(data.value)}
                    placeholder={placeholder}
                    value={input.value}/>
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </FormField>
    );
};