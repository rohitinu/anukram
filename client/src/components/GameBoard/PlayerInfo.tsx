import { Card } from 'react-bootstrap';

const PlayerInfo = ({ name }: { name: string }) => {
  return <Card>{name}</Card>;
};
export default PlayerInfo;
