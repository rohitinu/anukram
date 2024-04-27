import React, { useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAppContext } from '../stores/AppContextProvider';
import { UserType } from '../../common/types';

const WithNavigationBar = ({ children }: { children: React.ReactChild }) => {
  const [playerInfo] = useState<UserType>(
    JSON.parse(sessionStorage.getItem('playerInfo') || '{}') as UserType,
  );
  const { isDarkTheme, toggleTheme } = useAppContext();
  return (
    <>
      <Navbar bg={isDarkTheme ? 'dark' : 'light'} data-bs-theme={isDarkTheme ? 'dark' : 'light'}>
        <Container>
          <Navbar.Collapse className='justify-content-lg-between'>
            <Navbar.Text>
              Player Name: <span>{playerInfo?.userName}</span>
            </Navbar.Text>
            <Button variant={isDarkTheme ? 'light' : 'dark'} onClick={toggleTheme}>
              {isDarkTheme ? 'Light' : 'Dark'}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  );
};
export default WithNavigationBar;
