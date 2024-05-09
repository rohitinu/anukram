import { Container, Spinner } from 'react-bootstrap';
import PlayerInfo from './PlayerInfo';
import Board from './Board';
import { useBoardContext } from './GameBoardProvider';
import socket from '../../common/socket';
import { SocketAction } from '../../common/types';

const GameBoard = () => {
  const { coinPosition, activePlayer, playerInfo, currentPlayerId, room } = useBoardContext();
  const myIndex = playerInfo.findIndex((user) => user.id === currentPlayerId);

  const handlePlayerClick = (id: string, cardName: string) => {
    const player = playerInfo[myIndex];
    if (player.cards?.includes(cardName)) {
      socket.emit(SocketAction.MOVE, {
        room,
        color: player.color?.toLowerCase(),
        action: 'PUT',
        location: id,
        card: cardName,
        id: player.id,
      });
    }
  };
  const boardLength = playerInfo?.length;
  console.log(playerInfo, activePlayer, myIndex, currentPlayerId, coinPosition);
  if (!boardLength) {
    return <Spinner animation='border' variant='info' />;
  }
  return (
    <div data-bs-theme='dark' style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <PlayerInfo
          isActive={activePlayer === 0}
          cardInfo={playerInfo[0]?.cards || []}
          name={playerInfo[0].userName || ''}
          color={playerInfo[0].color || ''}
        />
        <PlayerInfo
          isActive={activePlayer === 1}
          cardInfo={playerInfo[1]?.cards || []}
          name={playerInfo[1].userName || ''}
          color={playerInfo[1].color || ''}
        />
      </div>
      <Container style={{ transform: 'rotate(90deg)', margin: '0 auto', width: '70%' }}>
        <Board
          handlePlayerClick={handlePlayerClick}
          coinPosition={coinPosition}
          isActive={activePlayer === myIndex}
        />
      </Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        {boardLength > 2 && (
          <PlayerInfo
            isActive={activePlayer === 2}
            cardInfo={playerInfo[2]?.cards || []}
            name={playerInfo[2].userName || ''}
            color={playerInfo[2].color || ''}
          />
        )}
      </div>
    </div>
  );
};
export default GameBoard;
