import React, { useState } from 'react'
import { Navbar, Container, Card, Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap'

const player = 'Rohit'
const UserSelection = () => {
  const [selectedPlayer, setSelectedPlayer] = useState('2')
  const [selectedColor, setSelectedColor] = useState<'RED' | 'GREEN' | 'BLUE'>('RED')
  const handleContinue = () => {
    console.log(selectedPlayer)
  }
  const adminPlayeName = player + '(Admin)'
  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              Signed in as: <span>Rohit</span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Card style={{ width: '30rem', margin: '1rem auto' }}>
        <Card.Body>
          <Card.Title>Game Settings</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>Card Subtitle</Card.Subtitle>
          <Card.Text>
            <FloatingLabel controlId='floatingSelectGrid' label='Number Of player'>
              <Form.Select
                onChange={(e) => {
                  setSelectedPlayer(e.target.value)
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
  )
}

export default UserSelection
