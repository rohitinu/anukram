import { Card } from 'react-bootstrap';
import ColorSelection from '../common/ColorSelection';
import { useEffect, useRef, useState } from 'react';
import socket from '../../common/socket';
import { SocketListner, UserType } from '../../common/types';
import { useToast } from '../Toast/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../stores/AppContextProvider';

const WaitinRoom = () => {
  const [playerInfo, setPlayerInfo] = useState<UserType[]>([
    JSON.parse(sessionStorage.getItem('playerInfo') || '') as UserType,
  ]);
  const { addToast } = useToast();
  const room = useRef(playerInfo[0]?.room);
  const navigate = useNavigate();
  const { isDarkTheme } = useAppContext();

  useEffect(() => {
    socket.on(SocketListner.PLAYER_MESSAGE, (data) => {
      setPlayerInfo(data.gameInfo.users);
      addToast({ text: data.message, intent: 'info' });
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
      socket.off(SocketListner.PLAYER_MESSAGE);
    };
  }, []);

  return (
    <Card
      data-bs-theme={isDarkTheme ? 'dark' : 'light'}
      style={{ width: '40rem', margin: '1rem auto' }}
    >
      <Card.Body>
        <Card.Title>Game Settings</Card.Title>
        <Card.Title>Code: {room.current}</Card.Title>
        <ColorSelection playerInfo={playerInfo} />
      </Card.Body>
    </Card>
  );
};
export default WaitinRoom;
