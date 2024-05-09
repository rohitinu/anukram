import { Card, Image } from 'react-bootstrap';
import Logo from '../../logo.svg';
import { cardMap } from './imageImport';
import { UserType } from '../../common/types';
const PlayerInfo = ({ user, isActive }: { user: UserType; isActive: boolean }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Card
        style={{
          width: '25rem',
          backgroundColor: user?.color?.toLowerCase(),
          color: 'white',
          padding: '0px',
          ...(isActive && { boxShadow: '12px 12px 2px 1px rgba(0, 0, 255, .2)', margin: '.5rem' }),
        }}
      >
        <Card.Body>
          {user?.userName}
          {user?.cards?.map((cv, id) => (
            <Image
              style={{ height: '5rem', width: '3.75rem', border: '1px solid black', margin: '2px' }}
              src={cv === 'LOGO' ? Logo : cardMap[cv]}
              key={cv + id}
            />
          ))}
        </Card.Body>
      </Card>
      {user?.lastCardUsed && (
        <Image
          style={{
            height: '7.5rem',
            width: '5rem',
            border: '5px double black',
            margin: '4px 2px',
          }}
          src={cardMap[user?.lastCardUsed]}
        />
      )}
    </div>
  );
};
export default PlayerInfo;
