import { Card } from 'react-bootstrap';
import ColorSelection from '../common/ColorSelection';
import { useEffect, useRef, useState } from 'react';
import { UserType } from './UserSlection';
import socket from '../../common/socket';

const WaitinRoom = () => {
  const [playerInfo, setPlayerInfo] = useState<UserType[]>([
    JSON.parse(sessionStorage.getItem('playerInfo') || '') as UserType,
  ]);
  const room = useRef(playerInfo[0]?.room);
  useEffect(() => {
    socket.on('player_message', (data) => {
      setPlayerInfo(data.gameInfo.users);
      console.log(data);
    });
    return () => {
      socket.off('player_message');
    };
  }, []);
  console.log(playerInfo);

  return (
    <Card style={{ width: '40rem', margin: '1rem auto' }}>
      <Card.Body>
        <Card.Title>Game Settings</Card.Title>
        <Card.Title>Code: {room.current}</Card.Title>
        <Card.Text>
          <ColorSelection playerInfo={playerInfo} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default WaitinRoom;
