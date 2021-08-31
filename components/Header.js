import React from 'react';
import Link from 'next/link';
import { Dropdown, Menu} from 'semantic-ui-react';

const Header = () => {
    return (
        <Menu fluid widths={3}>
            <Menu.Item>
                <Link href='/' >
                    <a className="item" style={{fontSize: '18px'}} >CloudMarket</a>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Dropdown text='Products' style={{fontSize: '18px'}} simple>
                    <Dropdown.Menu>
                        <Link href='/products'>
                            <Dropdown.Item text='List' />
                        </Link>
                        <Link href='/products/new'>
                            <Dropdown.Item text='Register Product' />
                        </Link>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
            <Menu.Item>
                <Dropdown text='Companies' style={{fontSize: '18px'}} simple>
                    <Dropdown.Menu>
                        <Link href='/companies'>
                            <Dropdown.Item text='List' />
                        </Link>
                        <Link href='/companies/new'>
                            <Dropdown.Item text='Register Company' />
                        </Link>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Menu>
    );
};

export default Header;