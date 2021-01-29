import React from 'react';
import {
    Dropdown,
    Header as SemanticHeader,
    Icon,
    Menu,
} from 'semantic-ui-react';
import '../App.scss';
import {useHistory} from 'react-router-dom';

const Header = ({title}: { title: string }) => {
    const history = useHistory();

    return (
        <div className="app-header">
            <Menu inverted secondary>
                <Dropdown
                    className="header__dropdown"
                    item
                    simple
                    icon={() => <Icon name="list" size="big"/>}
                >
                    <Dropdown.Menu className="header__dropdown-menu">
                        <Dropdown.Item onClick={() => history.push('/market-scanner')}>
                            <div className="header__dropdown-menu-text">Market Scanner</div>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => history.push('/scanner-alerts')}>
                            <div className="header__dropdown-menu-text">Scanner Alerts</div>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => history.push('/price-alerts')}>
                            <div className="header__dropdown-menu-text">Price Alerts</div>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => history.push('/manage-symbols')}>
                            <div className="header__dropdown-menu-text">Manage Symbols</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
            <SemanticHeader inverted as="h1">
                <SemanticHeader.Content>{title}</SemanticHeader.Content>
            </SemanticHeader>
            <div></div>
        </div>
    );
};

export default Header;
