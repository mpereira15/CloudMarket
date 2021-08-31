import React, { Component } from 'react';
import Router from 'next/router';
import { Form, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import CloudMarket from '../../ethereum/cloudMarket';
import web3 from '../../ethereum/web3';

class NewProduct extends Component {
    
    state = {
        name: '',
        tracker: '',
        description: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        if (!this.state.name) 
            this.setState({ errorMessage: "Invalid name" });
        else if (!this.state.tracker)
            this.setState({ errorMessage: "Invalid address" });
        else if (!this.state.description)
            this.setState({ errorMessage: "Invalid description" });
        else {
            const cloudMarket = CloudMarket(),
                accounts = await web3.eth.getAccounts();
                
            try {
                await cloudMarket.methods
                    .createProduct(
                        this.state.name,
                        this.state.description,
                        this.state.tracker
                    ).send({
                        from: accounts[0],
                    });

                this.setState({ loading: false });

                Router.push('/products');
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
                            label = 'Product name'
                            placeholder = 'Product name'
                            value = {this.state.name}
                            onChange = {event => this.setState({ name: event.target.value })}
                        />
                        <Form.Input
                            label = 'Tracker address'
                            placeholder = '0xb1618dcb53C71. . .'
                            value = {this.state.tracker}
                            onChange = {event => this.setState({ tracker: event.target.value })}
                        />
                    </Form.Group>
                    <Form.TextArea
                        label = 'Description'
                        placeholder = 'Product description...'
                        value = {this.state.description}
                        onChange = {event => this.setState({ description: event.target.value })}
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

export default NewProduct;