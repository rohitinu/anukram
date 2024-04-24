import { Container, Row, Col } from 'react-bootstrap';
import { COLOR_TYPE, UserType } from '../UserForm/UserSlection';

const getPlayerNames = (playerInfo: UserType[], color: COLOR_TYPE) => {
  return playerInfo
    .filter((player) => player.color === color)
    ?.map((cv) => <div key={cv.id}>{cv.isAdmin ? cv.userName + '[Admin]' : cv.userName}</div>);
};
const defaultStyle = {
  height: '6rem',
  margin: '.5rem',
  alignContent: 'center',
  color: 'white',
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
            background: 'red',
            ...defaultStyle,
          }}
        >
          {getPlayerNames(playerInfo, 'RED')}
        </Col>
        <Col
          onClick={() => setSelectedColor?.('BLUE')}
          style={{
            background: 'blue',
            ...defaultStyle,
          }}
        >
          {getPlayerNames(playerInfo, 'BLUE')}
        </Col>
        <Col
          onClick={() => setSelectedColor?.('GREEN')}
          style={{
            background: 'green',
            ...defaultStyle,
          }}
        >
          {getPlayerNames(playerInfo, 'GREEN')}
        </Col>
      </Row>
    </Container>
  );
};

export default ColorSelection;
