import React, { Component } from 'react';
import Router from 'next/router';
import { Form, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import CloudMarket from '../../ethereum/cloudMarket';
import web3 from '../../ethereum/web3';

const options = [
    { key: 'pt', text: 'Portugal', value: 'portugal'},
    { key: 'es', text: 'Spain', value: 'spain'},
    { key: 'us', text: 'United States', value: 'usa'},
    { key: 'gb', text: 'United Kingdom', value: 'uk'},
];

class NewCompany extends Component {
    
    state = {
        name: '',
        email: '',
        country: '',
        terms: false,
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        if(!this.state.terms)
            this.setState({ errorMessage: 'You have to accept the terms and Conditions' });
        else if(!this.state.name)
            this.setState({ errorMessage: 'Invalid name' });
        else if(!this.state.email)
            this.setState({ errorMessage: 'Invalid email' });
        else if(!this.state.country)
            this.setState({ errorMessage: 'Select a country' });
        else {
            const cloudMarket = CloudMarket(),
               accounts = await web3.eth.getAccounts();
            try {
                await cloudMarket.methods.createCompany(
                    this.state.name,
                    this.state.email,
                    this.state.country
                ).send({
                    from: accounts[0]
                });
                
                this.setState({ loading: false });

                Router.push('/companies');
            } catch (error) {
                this.setState({ errorMessage: error.message });
            }
        }

        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <h1>Register form</h1>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Input
                            label = 'Company name'
                            placeholder = 'Company name'
                            value = {this.state.name}
                            onChange = {event => this.setState({ name: event.target.value })}
                        />
                        <Form.Input
                            type = 'email'
                            label = 'Contact email'
                            placeholder = 'company@domain.com'
                            value = {this.state.email}
                            onChange = {event => this.setState({ email: event.target.value })}
                        />
                        <Form.Select
                            label = 'Country'
                            options = {options}
                            placeholder = 'Select Country'
                            onChange = {event => this.setState({ country: event.target.textContent })}
                        />
                    </Form.Group>
                    <Form.Checkbox
                        label = 'I agree to the Terms and Conditions'
                        onChange = {(event, data) => this.setState({ terms: data.checked })}
                    />
                    <Message error header='Oops!' content={this.state.errorMessage} />
                    <Form.Button 
                        content = 'Submit!'
                        icon = 'file alternate outline'
                        loading = {this.state.loading} 
                        primary 
                        circular
                    />
                </Form>
            </Layout>
        );
    };
}

export default NewCompany;