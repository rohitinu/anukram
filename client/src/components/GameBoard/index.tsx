import { Container, Row, Stack } from 'react-bootstrap';
import PlayerInfo from './PlayerInfo';
import Board from './Board';

const GameBoard = () => {
  return (
    <Stack>
      <Container>
        <Row xs='2'>
          <PlayerInfo name='Rohit' />
        </Row>
        <Row xs='2'>
          <PlayerInfo name='Sharma' />
        </Row>
      </Container>
      <Container>
        <Board />
      </Container>
      <Container>
        <Row xs='2'>
          <PlayerInfo name='Golu' />
        </Row>
        <Row xs='2'>
          <PlayerInfo name='Polu' />
        </Row>
      </Container>
    </Stack>
  );
};
export default GameBoard;
