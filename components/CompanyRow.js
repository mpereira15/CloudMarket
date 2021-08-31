import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class CompanyRow extends Component {  

    render() {
        const { name, country, email, address } = this.props;

        return (
            <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{country}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell style={{ width: '1px' }}>{address}</Table.Cell>
            </Table.Row>
        );
    }
}

export default CompanyRow;