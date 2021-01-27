import React, { useEffect, useReducer, useState } from 'react';
import {
  Dimmer,
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
import { getScannerData } from '../controller/marketScannerController';
import sortBy from 'lodash/sortBy';

const getIcon = (direction: Direction) => {
  if (direction === Direction.BULLISH) {
    return <Icon name="arrow up" color="green" />;
  } else if (direction === Direction.BEARISH) {
    return <Icon name="arrow down" color="red" />;
  }
  return null;
};

function sortReducer(state: any, action: any) {
  switch (action.type) {
    case 'CHANGE_SORT':
      console.log('change sort');
      if (state.column === action.column) {
        return {
          ...state,
          emaData:
            state.direction === 'ascending'
              ? sortBy(state.emaData, [action.column]).reverse()
              : sortBy(state.emaData, [action.column]),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }
      return {
        column: action.column,
        emaData: sortBy(state.emaData, [action.column]),
        direction: 'ascending',
      };

    case 'UPDATE_DATA':
      return {
        ...state,
        emaData: action.emaData,
      };
    default:
      throw new Error();
  }
}

const MarketScannerTable: React.FC = () => {
  const [scanner, setScanner] = useState<'ema' | 'macd' | 'rsi'>('ema');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  // const [emaData, setEmaData] = useState<EmaScanner[]>([]);
  const [state, dispatch] = useReducer(sortReducer, {
    column: null,
    emaData: [],
    direction: null,
  });
  const { column, emaData, direction } = state;

  useEffect(() => {
    setLoading(true);
    setError(null);
    getScannerData(scanner)
      .then((emas) => {
        dispatch({ type: 'UPDATE_DATA', emaData: emas });
        setLoading(false);
      })
      .catch((error: any) => {
        setError(error.response);
        setLoading(false);
      });
  }, [scanner]);

  const handleScannerChange = (e: any, { value }: any) => setScanner(value);

  return (
    <>
      <Segment inverted>
        <div className="scanner-table-without-loader">
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
            </Form>
          </div>
          <Table inverted celled={emaData && emaData.length > 0} fixed sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === 'symbol' ? direction : null}
                  onClick={() =>
                    dispatch({ type: 'CHANGE_SORT', column: 'symbol' })
                  }
                >
                  Symbol
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'minute15' ? direction : null}
                  onClick={() =>
                    dispatch({ type: 'CHANGE_SORT', column: 'minute15' })
                  }
                >
                  15m
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'minute30' ? direction : null}
                  onClick={() =>
                    dispatch({ type: 'CHANGE_SORT', column: 'minute30' })
                  }
                >
                  30m
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'hour1' ? direction : null}
                  onClick={() =>
                    dispatch({ type: 'CHANGE_SORT', column: 'hour1' })
                  }
                >
                  1h
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'hour2' ? direction : null}
                  onClick={() =>
                    dispatch({ type: 'CHANGE_SORT', column: 'hour2' })
                  }
                >
                  2h
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'hour4' ? direction : null}
                  onClick={() =>
                    dispatch({ type: 'CHANGE_SORT', column: 'hour4' })
                  }
                >
                  4h
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'hour12' ? direction : null}
                  onClick={() =>
                    dispatch({ type: 'CHANGE_SORT', column: 'hour12' })
                  }
                >
                  12h
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'day1' ? direction : null}
                  onClick={() =>
                    dispatch({ type: 'CHANGE_SORT', column: 'day1' })
                  }
                >
                  1d
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {emaData && emaData.length > 0 ? (
                emaData.map((ema: EmaScanner, idx: number) => (
                  <Table.Row key={idx}>
                    <Table.Cell>{ema.symbol}</Table.Cell>
                    <Table.Cell>{getIcon(ema.minute15)}</Table.Cell>
                    <Table.Cell>{getIcon(ema.minute30)}</Table.Cell>
                    <Table.Cell>{getIcon(ema.hour1)}</Table.Cell>
                    <Table.Cell>{getIcon(ema.hour2)}</Table.Cell>
                    <Table.Cell>{getIcon(ema.hour4)}</Table.Cell>
                    <Table.Cell>{getIcon(ema.hour12)}</Table.Cell>
                    <Table.Cell>{getIcon(ema.day1)}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row key={1}>
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell>No Data</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
        <Dimmer active={loading}>
          <Loader active={loading} inverted inline="centered" />
        </Dimmer>
      </Segment>
      {error && (
        <div className="scanner-table-error-container">
          <Message negative compact>
            <Message.Header>Oops, something went wrong...</Message.Header>
            <p>{error!!.data.message || error!!.data.error}</p>
          </Message>
        </div>
      )}
    </>
  );
};

export default MarketScannerTable;
