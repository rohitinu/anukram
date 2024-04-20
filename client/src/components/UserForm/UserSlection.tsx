import React, { useEffect, useState } from 'react';
import { Navbar, Container, Card, Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserSelection = () => {
  const [playerName] = useState(localStorage.getItem('playerName') || '');
  const [selectedPlayer, setSelectedPlayer] = useState('2');
  const [selectedColor, setSelectedColor] = useState<'RED' | 'GREEN' | 'BLUE'>('RED');
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem('playerSize', selectedPlayer);
    navigate('/game');
  };
  useEffect(() => {
    if (playerName) {
      navigate('/');
    }
  }, []);
  const adminPlayeName =
    (playerName?.length > 15 ? selectedPlayer?.slice(0, 15) + '...' : selectedPlayer) + '(Admin)';
  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              Signed in as: <span>{selectedPlayer}</span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Card style={{ width: '30rem', margin: '1rem auto' }}>
        <Card.Body>
          <Card.Title>Game Settings</Card.Title>
          <Card.Text>
            <FloatingLabel controlId='floatingSelectGrid' label='Number Of player'>
              <Form.Select
                onChange={(e) => {
                  setSelectedPlayer(e.target.value);
                }}
                aria-label='Default select example'
              >
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='6'>6</option>
              </Form.Select>
            </FloatingLabel>
            <Container>
              <Row style={{ margin: '1rem 0' }}>
                <Col
                  onClick={() => setSelectedColor('RED')}
                  style={{
                    height: '4rem',
                    background: 'red',
                    margin: '.5rem',
                    alignContent: 'center',
                    color: 'white',
                  }}
                >
                  {selectedColor == 'RED' ? adminPlayeName : ''}
                </Col>
                <Col
                  onClick={() => setSelectedColor('BLUE')}
                  style={{
                    height: '4rem',
                    background: 'blue',
                    margin: '.5rem',
                    alignContent: 'center',
                    color: 'white',
                  }}
                >
                  {selectedColor == 'BLUE' ? adminPlayeName : ''}
                </Col>
                <Col
                  onClick={() => setSelectedColor('GREEN')}
                  style={{
                    height: '4rem',
                    background: 'green',
                    margin: '.5rem',
                    alignContent: 'center',
                    color: 'white',
                  }}
                >
                  {selectedColor == 'GREEN' ? adminPlayeName : ''}
                </Col>
              </Row>
            </Container>
            <Button variant='primary' onClick={handleContinue}>
              Start Game
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserSelection;
