import React from 'react';
import ScannerTable from '../component/ScannerTable';
import Header from '../component/Header';
import '../App.scss';

const MarketScanner = () => {
  return (
    <div className="app-background">
      <div className="app-container">
        <Header />
        <ScannerTable />
      </div>
    </div>
  );
};

export default MarketScanner;
