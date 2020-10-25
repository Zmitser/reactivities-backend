// @flow
import * as React from 'react';
import {Button, Container, Menu} from "semantic-ui-react";

type Props = {
    openActivity: () => void
};

export function NavBar({openActivity}: Props) {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src='/assets/images/logo.png' alt='Logo'
                         style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item
                    name='Activities'
                />
                <Menu.Item>
                    <Button onClick={openActivity} positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}