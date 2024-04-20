import { Card, Image } from 'react-bootstrap';
import Logo from '../../logo.svg';
const PlayerInfo = ({
  name,
  cardInfo,
  color,
  isActive,
  playersBoard,
}: {
  name: string;
  cardInfo: string[];
  color: string;
  isActive: boolean;
  playersBoard: boolean;
}) => {
  return (
    <Card style={{ width: '25rem', ...(isActive && { backgroundColor: color, color: 'white' }) }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {cardInfo.map((cv) =>
            playersBoard ? (
              <Image style={{ height: '5rem', width: '4rem' }} src={cv} key={cv} thumbnail />
            ) : (
              <Image style={{ height: '5rem', width: '4rem' }} src={Logo} key={cv} thumbnail />
            ),
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default PlayerInfo;
