import React, {Component} from 'react';
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {Header, Icon, List} from "semantic-ui-react";

class App extends Component<any, any> {

    state = {
        values: []
    }


    componentDidMount() {
        axios.get('/api/v1/values').then(response => {
            this.setState({
                values: response.data
            })
        })

    }

    render() {
        return (
            <div>
                <Header as='h2'>
                    <Icon name='users' />
                    <Header.Content>Uptime Guarantee</Header.Content>
                </Header>
                <List>
                    {this.state.values.map((value: any) => (
                        <List.Item key={value.id}>{value.name}</List.Item>
                    ))}
                </List>
            </div>
        );
    }
}


export default App;
