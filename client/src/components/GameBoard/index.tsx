import { Container, Spinner } from 'react-bootstrap';
import PlayerInfo from './PlayerInfo';
import Board from './Board';
import { useBoardContext } from './GameBoardProvider';
import socket from '../../common/socket';
import { SocketAction } from '../../common/types';
import { REMOVE_CARD_STRING, WILD_CARD_STRING } from './imageImport';
const checkContainsWildCard = (cards?: string[]): boolean => {
  return !!cards?.find((cv) => WILD_CARD_STRING.includes(cv));
};
const checkContainsRemoveCard = (cards?: string[]): boolean => {
  return !!cards?.find((cv) => REMOVE_CARD_STRING.includes(cv));
};
const GameBoard = () => {
  const { coinPosition, activePlayer, playerInfo, currentPlayerId, room } = useBoardContext();
  const myIndex = playerInfo.findIndex((user) => user.id === currentPlayerId);

  const handlePlayerClick = (id: string, cardName: string) => {
    const player = playerInfo[myIndex];
    if (
      coinPosition[id] &&
      coinPosition[id].toLowerCase() !== player?.color?.toLowerCase() &&
      checkContainsRemoveCard(player?.cards)
    ) {
      socket.emit(SocketAction.MOVE, {
        room,
        color: player.color?.toLowerCase(),
        action: 'REMOVE',
        location: id,
        card: player.cards?.find((cv) => REMOVE_CARD_STRING.includes(cv)),
        id: player.id,
      });
    } else if (player.cards?.includes(cardName) && !coinPosition[id]) {
      socket.emit(SocketAction.MOVE, {
        room,
        color: player.color?.toLowerCase(),
        action: 'PUT',
        location: id,
        card: cardName,
        id: player.id,
      });
    } else if (checkContainsWildCard(player.cards)) {
      socket.emit(SocketAction.MOVE, {
        room,
        color: player.color?.toLowerCase(),
        action: 'PUT',
        location: id,
        card: player.cards?.find((cv) => WILD_CARD_STRING.includes(cv)),
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
        <PlayerInfo isActive={activePlayer === 0} user={playerInfo[0]} />
        <PlayerInfo isActive={activePlayer === 1} user={playerInfo[1]} />
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
        {boardLength > 2 && <PlayerInfo isActive={activePlayer === 2} user={playerInfo[2]} />}
      </div>
    </div>
  );
};
export default GameBoard;
