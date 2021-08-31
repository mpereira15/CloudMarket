import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import CompanyRow from '../../components/CompanyRow';
import CloudMarket from '../../ethereum/cloudMarket';

export async function getStaticProps() {
    const cloudMarket = CloudMarket(),
        companiesAddresses = await cloudMarket.methods.getCompanyAddresses().call();
        
    let companies = [];

    for (const companyId of companiesAddresses) {
        companies.push(
            JSON.stringify(await cloudMarket.methods.companies(companyId).call())
        );
    }

    return {
        props: { companies },
    };
}

class CompaniesIndex extends Component {

    renderRows() {
        return this.props.companies.map((item) => {
            const company = JSON.parse(item);
            return (
                <CompanyRow
                    key = {company.id}
                    name = {company.name}
                    email = {company.email}
                    country = {company.country}
                    address = {company.id}
                />
            );
        });
    }

    render() {  
        return (
            <Layout>
                <h1>Companies list</h1>
                <Table celled striped >
                    <Table.Header>
                        <Table.Row textAlign='center'>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Country</Table.HeaderCell>
                            <Table.HeaderCell>Contact</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
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

export default CompaniesIndex;