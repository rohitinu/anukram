import React, { useEffect, useState } from 'react';
import { Card, Form, Button, FloatingLabel, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ColorSelection from '../common/ColorSelection';
import JoinBoard from './JoinBoard';
import socket from '../../common/socket';
import {
  COLOR_TYPE,
  CreateRoomPayload,
  SocketAction,
  SocketListner,
  UserType,
} from '../../common/types';
import { useToast } from '../Toast/ToastProvider';
import { useAppContext } from '../stores/AppContextProvider';

const UserSelection = () => {
  const [playerInfo] = useState<UserType>(
    JSON.parse(sessionStorage.getItem('playerInfo') || '') as UserType,
  );
  const { isDarkTheme } = useAppContext();

  const [isInitiator, setIsInitiator] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState('2');
  const [selectedColor, setSelectedColor] = useState<COLOR_TYPE>('RED');
  const [gameCode, setGameCode] = useState<string>('4365');
  const { addToast } = useToast();
  const navigate = useNavigate();
  const handleContinue = () => {
    socket.emit(SocketAction.CREATE_ROOM, {
      userName: playerInfo.userName || '',
      id: playerInfo.id,
      color: selectedColor,
      initiationId: gameCode,
      playerSize: parseInt(selectedPlayer),
    } as CreateRoomPayload);
  };
  useEffect(() => {
    if (!playerInfo.id) {
      navigate('/');
    }
    socket.on(SocketListner.ERROR_MESSAGE, (data) => {
      addToast({ text: data.message, intent: 'danger' });
    });
    socket.on(SocketListner.ROOM_CREATED, (data) => {
      sessionStorage.setItem('playerInfo', JSON.stringify({ ...data.user, room: data.room }));
      sessionStorage.setItem('roomId', data.room);
      navigate('/waiting-room');
    });
    return () => {
      socket.off(SocketListner.ERROR_MESSAGE);
      socket.off(SocketListner.ROOM_CREATED);
    };
  }, []);

  return (
    <Card
      data-bs-theme={isDarkTheme ? 'dark' : 'light'}
      style={{ width: '40rem', margin: '1rem auto' }}
    >
      <Card.Body>
        <Card.Title>{isInitiator ? 'Game Settings' : 'Join Game Board'}</Card.Title>

        <Container>
          <Row sm={3}>
            <Form.Check // prettier-ignore
              type='switch'
              id='custom-switch'
              label='Join as Player'
              value={'' + isInitiator}
              onChange={() => setIsInitiator((prevState) => !prevState)}
            />
          </Row>
        </Container>
        {isInitiator ? (
          <>
            <FloatingLabel controlId='floatingSelectGrid' label='Number Of player'>
              <Form.Select
                onChange={(e) => {
                  setSelectedPlayer(e.target.value);
                }}
                aria-label='Default select example'
              >
                <option value='2'>2</option>
                <option value='3'>3</option>
              </Form.Select>
            </FloatingLabel>
            <ColorSelection
              setSelectedColor={(color) => setSelectedColor(color)}
              playerInfo={[
                { userName: playerInfo.userName, id: playerInfo.id, color: selectedColor },
              ]}
            />
            <Form.Control
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
              size='lg'
              type='text'
              placeholder='Please Game Initiation code'
            />
            <Button variant='primary' className='m-4' onClick={handleContinue}>
              Create Game Room
            </Button>
          </>
        ) : (
          <JoinBoard />
        )}
      </Card.Body>
    </Card>
  );
};

export default UserSelection;
