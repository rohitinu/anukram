import { Container, Row, Stack } from 'react-bootstrap';
import PlayerInfo from './PlayerInfo';
import Board from './Board';
import { cardDeck, cardMap } from './imageImport';
import { useRef, useState } from 'react';
interface PlayeInfo {
  player: number;
  color: 'green' | 'red' | 'blue';
  name: string;
  cardInfo: string[];
}
function shuffle(array: string[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex: number = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}
shuffle(cardDeck);
const pickACard = () => {
  return cardDeck.pop() || 'NO_MORE_CARD';
};

const GameBoard = () => {
  // const [playerSize] = useState(localStorage.getItem('playerSize'));
  const playerMapping = useRef<PlayeInfo[]>([
    {
      player: 0,
      color: 'green',
      name: 'Rohit',
      cardInfo: [pickACard(), pickACard(), pickACard(), pickACard(), pickACard()],
    },
    {
      player: 1,
      color: 'blue',
      name: 'Sachin',
      cardInfo: [pickACard(), pickACard(), pickACard(), pickACard(), pickACard()],
    },
    {
      player: 2,
      color: 'green',
      name: 'Gocool',
      cardInfo: [pickACard(), pickACard(), pickACard(), pickACard(), pickACard()],
    },
    {
      player: 3,
      color: 'blue',
      name: 'Chacha',
      cardInfo: [pickACard(), pickACard(), pickACard(), pickACard(), pickACard()],
    },
  ]);
  const [activePlayer, setActivePlayer] = useState<number>(0);
  const [coinPosition, setCoinPostion] = useState<Record<string, string>>({});

  const handlePlayerClick = (id: string, cardName: string) => {
    const index = playerMapping.current[activePlayer].cardInfo.indexOf(cardName);
    if (index >= 0) {
      playerMapping.current[activePlayer].cardInfo[index] = pickACard();
      setCoinPostion((prevstate) => {
        return { ...prevstate, [id]: `${playerMapping.current[activePlayer].color}-color` };
      });
      setActivePlayer((prevState) => {
        return prevState + 1 >= 4 ? 0 : prevState + 1;
      });
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <PlayerInfo
          isActive={activePlayer === playerMapping.current[0].player}
          playersBoard={activePlayer === playerMapping.current[0].player}
          name={playerMapping.current[0].name}
          color={playerMapping.current[0].color}
          cardInfo={playerMapping.current[0].cardInfo}
        />
        <PlayerInfo
          isActive={activePlayer === playerMapping.current[1].player}
          playersBoard={activePlayer === playerMapping.current[1].player}
          name={playerMapping.current[1].name}
          color={playerMapping.current[1].color}
          cardInfo={playerMapping.current[1].cardInfo}
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
        <PlayerInfo
          isActive={activePlayer === playerMapping.current[2].player}
          name={playerMapping.current[2].name}
          color={playerMapping.current[2].color}
          playersBoard={activePlayer === playerMapping.current[2].player}
          cardInfo={playerMapping.current[2].cardInfo}
        />
        <PlayerInfo
          isActive={activePlayer === playerMapping.current[3].player}
          playersBoard={activePlayer === playerMapping.current[3].player}
          name={playerMapping.current[3].name}
          color={playerMapping.current[3].color}
          cardInfo={playerMapping.current[3].cardInfo}
        />
      </div>
    </div>
  );
};
export default GameBoard;
