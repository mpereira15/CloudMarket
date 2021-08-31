import React, { Component } from 'react';
import Link from 'next/link';
import { Button, Label, Table } from 'semantic-ui-react';

class ProductRow extends Component {  

    renderStatus(status) {
        switch (status) {
            case 'Tracking':
                return <Label color='blue'>{status}</Label>;
            case 'On sale':
                return <Label color='green'>{status}</Label>;
            case 'Sold':
                return <Label color='red'>{status}</Label>;
        }
    }

    render() {
        const { id, name, status, owner, registerTime } = this.props;

        const registerDate = 
            new Date(registerTime * 1000 + new Date().getTimezoneOffset() * -1)
                .toISOString()
                .slice(0,10);

        return (
            <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell textAlign='center'>
                    {this.renderStatus(status)}
                </Table.Cell>
                <Table.Cell>{owner}</Table.Cell>
                <Table.Cell>{registerDate}</Table.Cell>
                <Table.Cell textAlign='center' style={{ width: '1px' }}>
                    <Link href={`/products/${id}`} >
                        <Button icon='eye' bordered='true'/>
                    </Link>
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default ProductRow;