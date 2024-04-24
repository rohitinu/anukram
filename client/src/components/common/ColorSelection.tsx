import { Container, Row, Col } from 'react-bootstrap';
import { COLOR_TYPE, UserType } from '../UserForm/UserSlection';

const getPlayerNames = (playerInfo: UserType[], color: COLOR_TYPE) => {
  return playerInfo
    .filter((player) => player.color === color)
    ?.map((cv) => <div key={cv.id}>{cv.userName}</div>);
};
const ColorSelection = ({
  playerInfo,
  setSelectedColor,
}: {
  playerInfo: UserType[];
  setSelectedColor?: (val: COLOR_TYPE) => void;
}) => {
  return (
    <Container>
      <Row style={{ margin: '1rem 0' }}>
        <Col
          onClick={() => setSelectedColor?.('RED')}
          style={{
            height: '6rem',
            background: 'red',
            margin: '.5rem',
            alignContent: 'center',
            color: 'white',
          }}
        >
          {getPlayerNames(playerInfo, 'RED')}
        </Col>
        <Col
          onClick={() => setSelectedColor?.('BLUE')}
          style={{
            height: '6rem',
            background: 'blue',
            margin: '.5rem',
            alignContent: 'center',
            color: 'white',
          }}
        >
          {getPlayerNames(playerInfo, 'BLUE')}
        </Col>
        <Col
          onClick={() => setSelectedColor?.('GREEN')}
          style={{
            height: '6rem',
            background: 'green',
            margin: '.5rem',
            alignContent: 'center',
            color: 'white',
          }}
        >
          {getPlayerNames(playerInfo, 'GREEN')}
        </Col>
      </Row>
    </Container>
  );
};

export default ColorSelection;
