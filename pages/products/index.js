import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import ProductRow from '../../components/ProductRow';
import CloudMarket from '../../ethereum/cloudMarket';

export async function getStaticProps() {
    const cloudMarket = CloudMarket(),
        numProducts = await cloudMarket.methods.numProducts().call();
        
    let products = [];

    for (let productId = 1; productId<numProducts; productId++) {
        products.push(
            JSON.stringify(await cloudMarket.methods.products(productId).call())
        )
    }

    return {
        props: { products },
    };
}

class ProductsIndex extends Component {

    renderRows() {
        return this.props.products.map((item) => {
            const product = JSON.parse(item);
            return (
                <ProductRow
                    key = {product.id}
                    id = {product.id}
                    name = {product.name}
                    status = {product.status}
                    owner = {product.owner}
                    registerTime = {product.registerTime}
                />
            );
        });
    }

    render() {
        return (
            <Layout>
                <h1>Products list</h1>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row textAlign='center'>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Owner</Table.HeaderCell>
                            <Table.HeaderCell>Registered Time</Table.HeaderCell>
                            <Table.HeaderCell>Show Product</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>
            </Layout>
        );
    }
}

export default ProductsIndex;