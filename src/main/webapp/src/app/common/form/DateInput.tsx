// @flow
import * as React from 'react';

import {FieldRenderProps} from "react-final-form";
import {FormField, FormFieldProps, Label} from "semantic-ui-react";
import {DateTimePicker} from "react-widgets";

type Props = FieldRenderProps<Date, HTMLInputElement> & FormFieldProps & {};

export function DateInput({
                              input,
                              width,
                              date = false,
                              time = false,
                              placeholder,
                              meta: {touched, error},
                          }: Props) {
    return (
        <FormField error={touched && !!error} width={width}>
            <DateTimePicker placeholder={placeholder}
                            value={input.value || null}
                            date={date}
                            time={time}
                            onBlur={input.onBlur}
                            onKeyDown={(e) => e.preventDefault()}
                            onChange={input.onChange}

            />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </FormField>
    );
};