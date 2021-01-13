import React from 'react';
import { Header as SemanticHeader } from 'semantic-ui-react';
import '../App.scss';

const Header = () => {
  return (
    <div className="app-header">
      <SemanticHeader inverted as="h1" textAlign="center">
        <SemanticHeader.Content>Market Scanner</SemanticHeader.Content>
      </SemanticHeader>
    </div>
  );
};

export default Header;
