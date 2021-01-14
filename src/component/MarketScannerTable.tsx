import React, { useState } from 'react';
import { Form, Loader, Radio, Segment, Table } from 'semantic-ui-react';
import './MarketScannerTable.scss';

const MarketScannerTable: React.FC = () => {
  const [scanner, setScanner] = useState(null);

  const handleScannerChange = (e: any, { value }: any) => setScanner(value);

  return (
    <Segment inverted className="scanner-table-container">
      <div className="scanner-tool-container">
        <Form inverted className="scanner-radio-group">
          <Form.Field>
            <b>Scanners</b>
          </Form.Field>
          <Form.Field>
            <Radio
              label="10/20 EMA"
              name="radioGroup"
              value="ema"
              checked={scanner === 'ema'}
              onChange={handleScannerChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="MacD"
              name="radioGroup"
              value="macd"
              checked={scanner === 'macd'}
              onChange={handleScannerChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="RSI"
              name="radioGroup"
              value="rsi"
              checked={scanner === 'rsi'}
              onChange={handleScannerChange}
            />
          </Form.Field>
        </Form>
      </div>
      <Table inverted celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Symbol</Table.HeaderCell>
            <Table.HeaderCell>15m</Table.HeaderCell>
            <Table.HeaderCell>30m</Table.HeaderCell>
            <Table.HeaderCell>1h</Table.HeaderCell>
            <Table.HeaderCell>2h</Table.HeaderCell>
            <Table.HeaderCell>4h</Table.HeaderCell>
            <Table.HeaderCell>12h</Table.HeaderCell>
            <Table.HeaderCell>1d</Table.HeaderCell>
            <Table.HeaderCell>1w</Table.HeaderCell>
            <Table.HeaderCell>1M</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row key={1}>
            <Table.Cell>FOO</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
          </Table.Row>
          <Table.Row key={2}>
            <Table.Cell>BAR</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
            <Table.Cell>0.000123</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Loader active={false} inverted inline="centered" />
    </Segment>
  );
};

export default MarketScannerTable;
