import React, { Component } from 'react';
import Router from 'next/router'
import { Button, Form, Grid, Icon, Label, Message, Step } from 'semantic-ui-react';
import CloudMarket from '../ethereum/cloudMarket';
import web3 from '../ethereum/web3';

class StepSet extends Component {
    state = {
        price: JSON.parse(this.props.product).price,
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        if (!this.state.price) 
            this.setState({ errorMessage: "Invalid price" });
        else {
            const cloudMarket = CloudMarket(),
                accounts = await web3.eth.getAccounts();

            switch (JSON.parse(this.props.product).status) {

                case 'Tracking':
                    try {
                        if(accounts[0] != JSON.parse(this.props.product).owner)
                            throw new Error('Only the owner can set the price');
                        await cloudMarket.methods
                            .authorizeSale(
                                JSON.parse(this.props.product).id,
                                this.state.price
                            ).send({
                                from: accounts[0],
                            });
                        Router.reload(window.location.pathname);
                    } catch (error) {
                        this.setState({ errorMessage: error.message });
                    }
                    break;
            
                case 'On sale':
                    try {
                        if(accounts[0] === JSON.parse(this.props.product).owner)
                            throw new Error('You cannot buy your own product');
                        if(!JSON.parse(this.props.companyAddresses).includes(accounts[0]))
                            throw new Error('Address not registered');
                        await cloudMarket.methods.payment(
                                JSON.parse(this.props.product).id
                            ).send({
                                from: accounts[0],
                                value: web3.utils.toWei(this.state.price, 'ether')
                            });
                        Router.reload(window.location.pathname);
                    } catch (error) {
                        this.setState({ errorMessage: error.message });
                    }
                    break;
            }
        }
        this.setState({ loading: false });
    };

    render() {
        let steps;

        switch (JSON.parse(this.props.product).status) {

            case 'Tracking':
                steps = [
                    { active:true, key: 'tracking', icon: 'truck', title: 'Tracking', description: 'Product tracking active' },
                    { disabled: true, key: 'onsale', icon: 'payment', title: 'On Sale', description: 'Product available for sale' },
                    { disabled: true, key: 'sold', icon: 'times', title: 'Sold', description: 'Product unavailable' }
                ];
                return (
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Grid>
                            <Grid.Row>
                                 <Grid.Column textAlign="center">
                                    <Step.Group items={steps} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={3}>
                                <Grid.Column/>
                                <Grid.Column textAlign="center">
                                    <Form.Input
                                        action = {{
                                            color: 'blue',
                                            labelPosition: 'right',
                                            icon: 'hand point right outline',
                                            content: 'Authorize Sale'
                                        }}
                                        actionPosition = 'left'
                                        placeholder = 'Set price in Eth...'
                                        loading = {this.state.loading}
                                        onChange = {event => this.setState({ price: event.target.value })}
                                        fluid
                                    />
                                    <Message error header='Oops!' content={this.state.errorMessage} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                );

            case 'On sale':
                steps = [
                    { key: 'tracking', icon: 'truck', title: 'Tracking', description: 'Product tracking active' },
                    { active: true, key: 'onsale', icon: 'payment', title: 'On Sale', description: 'Product available for sale' },
                    { disabled: true, key: 'sold', icon: 'times', title: 'Sold', description: 'Product unavailable' }
                ];
                return (
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Grid>
                            <Grid.Row>
                                 <Grid.Column textAlign="center">
                                    <Step.Group items={steps} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column textAlign="center">
                                    <Button 
                                        content='Buy Product'
                                        icon='shopping cart' 
                                        labelPosition='right' 
                                        loading={this.state.loading}
                                        primary circular
                                    />
                                    <Label color='grey' size='medium' tag>
                                        <Icon name='ethereum' color='black' />{this.state.price / 1000000000000000000} Units
                                    </Label>
                                    <Message error header='Oops!' content={this.state.errorMessage} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                );

            case 'Sold':
                steps = [
                    { key: 'tracking', icon: 'truck', title: 'Tracking', description: 'Product tracking active' },
                    { key: 'onsale', icon: 'payment', title: 'On Sale', description: 'Product available for sale' },
                    { active: true, key: 'sold', icon: 'times', title: 'Sold', description: 'Product unavailable' }
                ];
                return <Step.Group items={steps} />;
        }
    }
}

export default StepSet;