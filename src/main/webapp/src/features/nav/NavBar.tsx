// @flow
import * as React from 'react';
import {Button, Container, Dropdown, Image, Menu} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {Link, NavLink} from "react-router-dom";
import {useContext} from "react";
import {RootStoreContext} from "../../app/stores/rootStore";


const NavBar = () => {
    const {logout, user} = useContext(RootStoreContext).userStore
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} to='/' exact>
                    <img src='/assets/images/logo.png' alt='Logo'
                         style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item
                    name='Activities'
                    as={NavLink}
                    to='/activities'
                />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity'/>
                </Menu.Item>
                { user &&
                    (<Menu.Item position='right'>
                        <Image avatar spaced='right' src={user.image  || '/assets/images/user.png'} />
                        <Dropdown pointing='top left' text={user.username}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user'/>
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>)
                }
            </Container>
        </Menu>
    );
}

export default observer(NavBar)