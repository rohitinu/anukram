import { useEffect, useState, useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import socket from '../../common/socket';
import { COLOR_TYPE, UserType } from './UserSlection';
import ColorSelection from '../common/ColorSelection';
import { SocketAction, SocketListner } from '../../common/types';
import { useToast } from '../Toast/ToastProvider';
import { useNavigate } from 'react-router-dom';

const JoinBoard = () => {
  const [playerInfo, setPlayerInfo] = useState<UserType[]>([
    JSON.parse(sessionStorage.getItem('playerInfo') || '') as UserType,
  ]);
  const currentPlayer = useRef(playerInfo[0]);
  const [gameCode, setGameCode] = useState<string>('86267');
  const [colorSelection, setColorSlectionMode] = useState<boolean>(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleContinue = () => {
    socket.emit(SocketAction.JOIN_GAME, {
      room: gameCode,
      id: currentPlayer.current?.id,
      userName: currentPlayer.current.userName,
    } as any);
  };
  useEffect(() => {
    socket.on(SocketListner.ERROR_MESSAGE, (data) => {
      addToast({ text: data.message, intent: 'danger' });
    });
    socket.on(SocketListner.PLAYER_MESSAGE, (data) => {
      setColorSlectionMode(true);
      addToast({ text: data.message, intent: 'info' });
      setPlayerInfo(data.gameInfo.users);
      if (data.start) {
        addToast({ text: 'Game will start in 5sec', intent: 'success' });
        setTimeout(() => {
          if (data.start) {
            navigate('/game');
          }
        }, 5000);
      }
    });
    return () => {
      socket.off(SocketListner.ERROR_MESSAGE);
      socket.off(SocketListner.PLAYER_MESSAGE);
    };
  }, []);
  const handleColorClick = (color: COLOR_TYPE) => {
    socket.emit(SocketAction.UPDATE_COLOR, {
      id: currentPlayer.current.id,
      color: color,
      room: gameCode,
      userName: currentPlayer.current.id,
    });
  };
  return (
    <Card.Text>
      {colorSelection ? (
        <>
          <h5>Wating for Players To Join</h5>
          <ColorSelection playerInfo={playerInfo} setSelectedColor={handleColorClick} />
        </>
      ) : (
        <>
          <Form.Control
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value)}
            size='lg'
            type='text'
            placeholder='Please Enter Game code'
          />
          <Button variant='primary' onClick={handleContinue}>
            Join
          </Button>
        </>
      )}
    </Card.Text>
  );
};
export default JoinBoard;
