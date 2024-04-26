import GameBoard from '.';
import { BoardContextProvider } from './GameBoardProvider';

const GameBoardConatiner = () => {
  const playerInfo = (sessionStorage.getItem('currentPlayerId') || '') as string;
  const currentRoom = (sessionStorage.getItem('roomId') || '') as string;
  return (
    <BoardContextProvider room={currentRoom} id={playerInfo}>
      <GameBoard />
    </BoardContextProvider>
  );
};
export default GameBoardConatiner;
