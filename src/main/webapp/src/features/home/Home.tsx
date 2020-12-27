// @flow
import * as React from 'react';
import {Button, Container, Segment, Header, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";


export function Home() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/images/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Reactivities
                </Header>
                <Header as='h2' inverted content='Welcome to Reactivities' />
                <Button as={Link} to='/login' size='huge' inverted>
                    Login
                </Button>
            </Container>
        </Segment>
    );
};