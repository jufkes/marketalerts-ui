import React from 'react';
import MarketScannerTable from '../component/MarketScannerTable';
import Header from '../component/Header';
import '../App.scss';

const MarketScanner = () => {
  return (
    <div className="app-background">
      <div className="app-container">
        <Header title='Market Scanner' />
        <MarketScannerTable />
      </div>
    </div>
  );
};

export default MarketScanner;
