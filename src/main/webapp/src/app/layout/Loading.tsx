// @flow
import * as React from 'react';
import {Dimmer, Loader} from "semantic-ui-react";

type Props = {
    inverted?: boolean
    content?: string
};

export function Loading({inverted = true, content}: Props) {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    );
};