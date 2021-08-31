import React, { Component } from 'react';
import Image from 'next/image';
import { Grid, Icon, Statistic } from 'semantic-ui-react';
import Layout from '../components/Layout';
import CloudMarket from '../ethereum/cloudMarket';

export async function getStaticProps() {
    const cloudMarket = CloudMarket(),
        totalProductsOnSale = await cloudMarket.methods.numProductsOnSale().call(),
        totalProducts = await cloudMarket.methods.numProducts().call(),
        totalCompanies = (await cloudMarket.methods.getCompanyAddresses().call()).length;

    return {
        props: { totalProductsOnSale, totalProducts, totalCompanies },
    };
}

class MarketIndex extends Component {

    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <Image src="/cloud.png" alt="me" width="300" height="300" />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Statistic.Group widths='3' style={{ marginTop: "50px" }}>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='shopping basket' />{this.props.totalProductsOnSale}
                        </Statistic.Value>
                        <Statistic.Label>Products on sale</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='tags' size='small'/>{this.props.totalProducts-1}
                        </Statistic.Value>
                        <Statistic.Label>Total products tracked</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='building outline' />{this.props.totalCompanies}
                        </Statistic.Value>
                        <Statistic.Label>Companies</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            </Layout>
        );
    }
}

export default MarketIndex;