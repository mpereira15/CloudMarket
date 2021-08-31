import React, { Component } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import StepSet from '../../components/StepSet';
import ProductData from '../../components/ProductData';
import CloudMarket from '../../ethereum/cloudMarket';

export async function getStaticProps(context) {
    const cloudMarket = CloudMarket(),
    product = JSON.stringify(await cloudMarket.methods.products(context.params.product).call()),
    //change owner
    owner = (await cloudMarket.methods.companies(JSON.parse(product).owner).call()).name,
    dataIds = (await cloudMarket.methods.getProductData(JSON.parse(product).id).call()),
    companyAddresses = JSON.stringify(await cloudMarket.methods.getCompanyAddresses().call()),
    registerDate = 
        new Date(JSON.parse(product).registerTime * 1000 + new Date().getTimezoneOffset() * -1)
            .toISOString()
            .slice(0,10);

    let data = [];

    for (const dataId of dataIds) {
        data.push(
            JSON.stringify(await cloudMarket.methods.data(dataId).call())
        )
    }

    return { 
        props: { product, owner, data, companyAddresses, registerDate }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

class ProductShow extends Component {

    renderData() {
        if(this.props.data.length > 0)
            return <ProductData data={this.props.data}/>;
        return null;
    }

    render() {
        const product = JSON.parse(this.props.product);

        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column textAlign="center" style={{ marginTop: "5px" }}>
                            <StepSet product={this.props.product} companyAddresses={this.props.companyAddresses}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Card
                                header = {product.name}
                                meta = 'Name'
                                description = {product.description}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Card
                                header = {this.props.owner}
                                meta = 'Owner'
                                description = {product.owner}
                                fluid centered
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Card
                                header = {this.props.registerDate}
                                meta = 'Register Date'
                                centered
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {this.renderData()}
            </Layout>
        );
    }
}

export default ProductShow;