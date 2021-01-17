import React, { useEffect, useState } from 'react';
import {
  Form,
  Icon,
  Loader,
  Message,
  Radio,
  Segment,
  Table,
} from 'semantic-ui-react';
import './MarketScannerTable.scss';
import { Direction, EmaScanner } from '../model/scanner';
import { getEmas } from '../controller/marketScannerController';

const getIcon = (direction: Direction) => {
  if (direction === Direction.BULLISH) {
    return <Icon name="arrow up" color="green" />;
  } else if (direction === Direction.BEARISH) {
    return <Icon name="arrow down" color="red" />;
  }
  return null;
};

const MarketScannerTable: React.FC = () => {
  const [scanner, setScanner] = useState('ema');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [emaData, setEmaData] = useState<EmaScanner[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getEmas()
      .then((emas) => {
        setEmaData(emas);
        setLoading(false);
      })
      .catch((error: any) => {
        setError(error.response);
        setLoading(false);
      });
  }, []);

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
          {emaData &&
            emaData.map((ema, idx) => (
              <Table.Row key={idx}>
                <Table.Cell>{ema.symbol}</Table.Cell>
                <Table.Cell>{getIcon(ema.minute15)}</Table.Cell>
                <Table.Cell>{getIcon(ema.minute30)}</Table.Cell>
                <Table.Cell>{getIcon(ema.hour1)}</Table.Cell>
                <Table.Cell>{getIcon(ema.hour2)}</Table.Cell>
                <Table.Cell>{getIcon(ema.hour4)}</Table.Cell>
                <Table.Cell>{getIcon(ema.hour12)}</Table.Cell>
                <Table.Cell>{getIcon(ema.day1)}</Table.Cell>
                <Table.Cell>{getIcon(ema.week1)}</Table.Cell>
                <Table.Cell>{getIcon(ema.month1)}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>

      <Loader active={loading} inverted inline="centered" />

      {error && (
        <Message negative>
          <Message.Header>Oops, something went wrong...</Message.Header>
          <p>{error!!.data.message || error!!.data.error}</p>
        </Message>
      )}
    </Segment>
  );
};

export default MarketScannerTable;
