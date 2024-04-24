import { useEffect, useState, useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import socket from '../../common/socket';
import { COLOR_TYPE, UserType } from './UserSlection';
import ColorSelection from '../common/ColorSelection';
// [
//   {
//       "id": "fbfe59c6-59f3-494e-9138-c96133d605c1",
//       "userName": "bbbb",
//       "color": "RED",
//       "isAdmin": true
//   },
//   {
//       "id": "cf57a178-e9f5-4094-b2d9-7b72c849eda7",
//       "userName": "ccccc",
//       "isAdmin": false
//   }
// ]
const JoinBoard = () => {
  const [playerInfo, setPlayerInfo] = useState<UserType[]>([
    JSON.parse(sessionStorage.getItem('playerInfo') || '') as UserType,
  ]);
  const currentPlayer = useRef(playerInfo[0]);
  const [gameCode, setGameCode] = useState<string>('86267');
  const [colorSelection, setColorSlectionMode] = useState<boolean>(false);

  const handleContinue = () => {
    socket.emit('join_game', {
      room: gameCode,
      id: currentPlayer.current?.id,
      userName: currentPlayer.current.userName,
    } as any);
  };
  useEffect(() => {
    socket.on('invalid_room', (data) => {
      console.log(data);
    });
    socket.on('player_message', (data) => {
      setColorSlectionMode(true);
      console.log(data);
      setPlayerInfo(data.gameInfo.users);
    });
    return () => {
      socket.off('invalid_room');
      socket.off('player_message');
    };
  }, []);
  const handleColorClick = (color: COLOR_TYPE) => {
    socket.emit('update_color', {
      id: currentPlayer.current.id,
      color: color,
      room: gameCode,
      userName: currentPlayer.current.id,
    });
  };
  return (
    <Card.Text>
      {colorSelection ? (
        <ColorSelection playerInfo={playerInfo} setSelectedColor={handleColorClick} />
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
