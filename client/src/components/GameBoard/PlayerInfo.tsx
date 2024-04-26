import { Card, Image } from 'react-bootstrap';
import Logo from '../../logo.svg';
import { cardMap } from './imageImport';
const PlayerInfo = ({
  name,
  cardInfo,
  color,
  isActive,
}: {
  name: string;
  cardInfo: string[];
  color: string;
  isActive: boolean;
}) => {
  return (
    <Card
      style={{
        width: '25rem',
        backgroundColor: color.toLowerCase(),
        color: 'white',
        ...(isActive && { boxShadow: '12px 12px 2px 1px rgba(0, 0, 255, .2)', margin: '.5rem' }),
      }}
    >
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        {cardInfo.map((cv) => (
          <Image
            style={{ height: '5rem', width: '4rem' }}
            src={cv === 'LOGO' ? Logo : cardMap[cv]}
            key={cv}
            thumbnail
          />
        ))}
      </Card.Body>
    </Card>
  );
};
export default PlayerInfo;
