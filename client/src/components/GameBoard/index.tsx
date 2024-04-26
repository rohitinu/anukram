import { Container, Spinner } from 'react-bootstrap';
import PlayerInfo from './PlayerInfo';
import Board from './Board';
import { useBoardContext } from './GameBoardProvider';

const GameBoard = () => {
  const { coinPosition, activePlayer, playerInfo, currentPlayerId } = useBoardContext();

  const handlePlayerClick = (id: string, cardName: string) => {
    // const index = playerMapping.current[activePlayer].cardInfo.indexOf(cardName);
    // if (index >= 0) {
    //   playerMapping.current[activePlayer].cardInfo[index] = pickACard();
    //   setCoinPostion((prevstate) => {
    //     return { ...prevstate, [id]: `${playerMapping.current[activePlayer].color}-color` };
    //   });
    //   setActivePlayer((prevState) => {
    //     return prevState + 1 >= 4 ? 0 : prevState + 1;
    //   });
    // }
  };
  const boardLength = playerInfo?.length;
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
          isActive={true}
          cardInfo={playerInfo[0]?.cards || []}
          name={playerInfo[0].userName || ''}
          color={playerInfo[0].color || ''}
        />
        <PlayerInfo
          isActive={activePlayer === playerInfo[1].id}
          cardInfo={playerInfo[1]?.cards || []}
          name={playerInfo[1].userName || ''}
          color={playerInfo[1].color || ''}
        />
      </div>
      <Container>
        <Board handlePlayerClick={handlePlayerClick} coinPosition={coinPosition} />
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
            isActive={activePlayer === playerInfo[2].id}
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
