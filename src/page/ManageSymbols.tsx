import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import '../App.scss';
import './ManageSymbols.scss';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Form,
  Grid,
  Icon,
  Input,
  Message,
  Modal,
  Popup,
  Segment,
  TextArea,
} from 'semantic-ui-react';
import {
  addSymbol,
  bulkAddSymbols,
  deleteSymbol,
  getSymbols,
} from '../controller/marketScannerController';

const ManageSymbols = () => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openAddSymbol, setOpenAddSymbol] = useState(false);
  const [openBulkAddSymbol, setOpenBulkAddSymbol] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [newSymbol, setNewSymbol] = useState<string>('');
  const [commaDelimitedSymbols, setCommaDelimitedSymbols] = useState<string>(
    '',
  );
  const [searchText, setSearchText] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getSymbols()
      .then((symbolList) => {
        setSymbols(symbolList);
        setLoading(false);
      })
      .catch(() => {
        setError('Error getting symbols');
        setLoading(false);
      });
  }, []);

  const handleDeleteSymbol = (symbol: string) => {
    deleteSymbol(selectedSymbol)
      .then(() => {
        getSymbols()
          .then((symbolList) => {
            setSymbols(symbolList);
          })
          .catch(() => {
            setError('Error getting symbols');
          });
        setSelectedSymbol('');
        setOpenConfirmDelete(false);
      })
      .catch(() => {
        setSelectedSymbol('');
        setOpenConfirmDelete(false);
        setError('Error deleting symbol');
      });
  };

  const handleAddSymbol = (symbol: string) => {
    addSymbol(symbol.toUpperCase())
      .then(() => {
        getSymbols()
          .then((symbolList) => {
            setSymbols(symbolList);
          })
          .catch((error: any) => {
            setError(error.response);
          });
        setNewSymbol('');
        setOpenAddSymbol(false);
      })
      .catch(() => {
        setNewSymbol('');
        setOpenAddSymbol(false);
        setError('Error adding symbol');
      });
  };

  const handleBulkAddSymbols = (commaDelimitedSymbols: string) => {
    const symbolList = commaDelimitedSymbols
      .split(',')
      .map((symbol) => symbol.trim().toUpperCase());
    bulkAddSymbols(symbolList)
      .then(() => {
        getSymbols()
          .then((symbolList) => {
            setSymbols(symbolList);
          })
          .catch(() => {
            setError('Error getting symbols');
          });
        setCommaDelimitedSymbols('');
        setOpenBulkAddSymbol(false);
      })
      .catch(() => {
        getSymbols()
          .then((symbolList) => {
            setSymbols(symbolList);
          })
          .catch(() => {
            setError('Error getting symbols');
          });
        setCommaDelimitedSymbols('');
        setOpenBulkAddSymbol(false);
        setError(
          'Error adding symbols - some symbols may not have been added.',
        );
      });
  };

  return (
    <div className="app-background">
      <div className="app-container">
        <Header title="Manage Tokens" />
        <Segment inverted loading={loading}>
          <div className="manage-symbols_controls-container">
            <div>
              <Input
                className="search-symbol-input"
                focus
                placeholder="Search..."
                inverted
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                inverted
                disabled={!searchText}
                onClick={() => {
                  const filteredSymbols = symbols.filter((symbol) =>
                    symbol.includes(searchText.toUpperCase()),
                  );
                  setSymbols(filteredSymbols);
                }}
              >
                Search
              </Button>
            </div>
            <div>
              <Popup
                inverted
                content="Add symbol"
                trigger={
                  <Button icon inverted onClick={() => setOpenAddSymbol(true)}>
                    <Icon name="plus" />
                  </Button>
                }
              />
              <Popup
                inverted
                content="Bulk add symbols"
                trigger={
                  <Button
                    icon
                    inverted
                    onClick={() => setOpenBulkAddSymbol(true)}
                  >
                    <Icon name="upload" />
                  </Button>
                }
              />
            </div>
          </div>
          <Grid columns={6}>
            {symbols && symbols.length > 0 ? (
              symbols.map((symbol) => (
                <Grid.Column key={symbol}>
                  <Card>
                    <CardContent>
                      <CardHeader>
                        <div className="symbol-card_header">
                          <span>{symbol}</span>
                          <Button
                            icon="trash alternate"
                            onClick={() => {
                              setSelectedSymbol(symbol);
                              setOpenConfirmDelete(true);
                            }}
                          />
                        </div>
                      </CardHeader>
                    </CardContent>
                  </Card>
                </Grid.Column>
              ))
            ) : (
              <div>No symbols found</div>
            )}
          </Grid>
        </Segment>
        {error && (
          <div className="manage-symbols-error-container">
            <Message negative compact>
              <Message.Header>Oops, something went wrong...</Message.Header>
              <p>{error}</p>
            </Message>
          </div>
        )}
      </div>
      <Modal
        dimmer="inverted"
        size="tiny"
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <Modal.Header>
          {`Are you sure you want to delete ${selectedSymbol}`}
        </Modal.Header>
        <Modal.Content>
          Deleting the token will delete all associated data.
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button onClick={() => setOpenConfirmDelete(false)}>Cancel</Button>
            <Button.Or />
            <Button positive onClick={() => handleDeleteSymbol(selectedSymbol)}>
              Confirm
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
      <Modal
        dimmer="inverted"
        open={openAddSymbol}
        onClose={() => setOpenAddSymbol(false)}
        size="mini"
      >
        <Modal.Header>{`Add Symbol`}</Modal.Header>
        <Modal.Content>
          <Input
            placeholder="Name"
            onChange={(e) => setNewSymbol(e.target.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button
              onClick={() => {
                setNewSymbol('');
                setOpenAddSymbol(false);
              }}
            >
              Cancel
            </Button>
            <Button.Or />
            <Button
              positive
              disabled={!newSymbol}
              onClick={() => handleAddSymbol(newSymbol)}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
      <Modal
        dimmer="inverted"
        open={openBulkAddSymbol}
        onClose={() => setOpenBulkAddSymbol(false)}
        size="tiny"
      >
        <Modal.Header>{`Bulk Add Symbols`}</Modal.Header>
        <Modal.Content>
          Enter a comma delimited list of symbol names
          <Form>
            <TextArea
              placeholder="ETHUSDT, THETAUSDT"
              onChange={(e) => setCommaDelimitedSymbols(e.target.value)}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button
              onClick={() => {
                setCommaDelimitedSymbols('');
                setOpenBulkAddSymbol(false);
              }}
            >
              Cancel
            </Button>
            <Button.Or />
            <Button
              positive
              disabled={!commaDelimitedSymbols}
              onClick={() => handleBulkAddSymbols(commaDelimitedSymbols)}
            >
              Save All
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ManageSymbols;
