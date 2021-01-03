import React from 'react'
import {Message} from 'semantic-ui-react'
import {AxiosResponse} from "axios";

type Props = {
    error: AxiosResponse,
    text?: string
}

const ErrorMessage = ({error, text}: Props) => (
    <Message error>
        <Message.Header>{error.statusText}</Message.Header>
        {error.data && Object.keys(error.data.violations).length > 0 && (
            <Message.List>
                {error.data.violations.map((err: { field: string, message: string }, i: number) => (
                    <Message.Item key={i}>{`${err.field} ${err.message}`}</Message.Item>
                ))}
            </Message.List>
        )}
        {text && <Message.Content>{text}</Message.Content>}
    </Message>
)

export default ErrorMessage