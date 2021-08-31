import React, { Component } from 'react';
import { Accordion, Card, Grid, Icon, Table } from 'semantic-ui-react';

class ProductData extends Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps,
            { activeIndex } = this.state,
            newIndex = activeIndex === index ? -1 : index;
        
        this.setState({ activeIndex: newIndex });
    }

    renderRows() {
        return this.props.data.map((entry) => {
            return (
                <Table.Row textAlign='right' key={Math.random().toString().replace("0.", "")}>
                    <Table.Cell>{JSON.parse(entry).temperature} °C</Table.Cell>
                    <Table.Cell>{JSON.parse(entry).humidity}%</Table.Cell>
                    <Table.Cell>{JSON.parse(entry).c02Level}%</Table.Cell>
                    <Table.Cell>{JSON.parse(entry).soilMoisture}%</Table.Cell>
                    <Table.Cell>{JSON.parse(entry).soilPh}%</Table.Cell>
                    <Table.Cell>{JSON.parse(entry).location}</Table.Cell>
                    <Table.Cell>
                        { 
                            new Date(JSON.parse(entry).registerTime * 1000 + new Date().getTimezoneOffset() * -1)
                                .toISOString()
                                .slice(0,19)
                                .replace('T',' ')
                        }
                    </Table.Cell>
                </Table.Row>
            );
        });
        
    }

    render() {
        let maxTemperature, minTemperature, maxHumidity, minHumidity, location;
        let sumTemp=0;
        let sumHum=0;
        
        for(let entry of this.props.data) {
            entry = JSON.parse(entry);
            if(!maxTemperature || entry.temperature>maxTemperature)
                maxTemperature = entry.temperature;
            if(!minTemperature || entry.temperature<minTemperature)
                minTemperature = entry.temperature;
            if(!maxHumidity || entry.humidity>maxHumidity)
                maxHumidity = entry.humidity;
            if(!minHumidity || entry.humidity<minHumidity)
                minHumidity = entry.humidity;
            sumTemp+=Number(entry.temperature);
            sumHum+=Number(entry.humidity);
            location = entry.location;
        }
        const avgTemperature = (sumTemp/this.props.data.length),
            avgHumidity = (sumHum/this.props.data.length);



        return (
            <Grid>
                <Grid.Row columns={5}>
                    <Grid.Column>
                        <Card
                            header = {`${avgTemperature} °C`}
                            meta = 'Average Temp'
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Card
                            header = {`${minTemperature}-${maxTemperature} °C`}
                            meta = 'Min/Max Temp'
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Card
                            header = {location}
                            meta = 'Current Location'
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Card
                            header = {`${avgHumidity}%`}
                            meta = 'Average Humidity'
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Card
                            header = {`${minHumidity}-${maxHumidity}%`}
                            meta = 'Min/Max Humidity'
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Accordion fluid styled>
                        <Accordion.Title
                            active = { this.state.activeIndex === 1 }
                            index = {1}
                            onClick = {this.handleClick}
                        >
                        <Icon name='dropdown' />
                        Show data
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 1}>
                            <Table celled striped>
                            <Table.Header>
                                <Table.Row textAlign='center'>
                                    <Table.HeaderCell>Temperature</Table.HeaderCell>
                                    <Table.HeaderCell>Humidity</Table.HeaderCell>
                                    <Table.HeaderCell>c02 level</Table.HeaderCell>
                                    <Table.HeaderCell>Soil moisture</Table.HeaderCell>
                                    <Table.HeaderCell>Soil Ph</Table.HeaderCell>
                                    <Table.HeaderCell>Location</Table.HeaderCell>
                                    <Table.HeaderCell>Registered Time</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.renderRows()}
                            </Table.Body>
                        </Table>
                        </Accordion.Content>
                    </Accordion>
                </Grid.Row>
            </Grid>
        );
    }
}

export default ProductData;