import { Container, Image } from 'react-bootstrap';
import { boardSeq } from './imageImport';
const Board = ({
  coinPosition,
  handlePlayerClick,
}: {
  coinPosition: Record<string, string>;
  handlePlayerClick: (val: string, cardName: string) => void;
}) => {
  const tableData = () => {
    const tableElem = [];
    for (let i = 0; i < 10; i++) {
      const rowData = [];
      for (let j = 0; j < 10; j++) {
        const color = coinPosition?.[`${i}-${j}`];
        rowData.push(
          <td key={`${i}-${j}`}>
            <div
              onClick={() => {
                if (!color && !([0, 9].includes(i) && [0, 9].includes(j))) {
                  handlePlayerClick(`${i}-${j}`, boardSeq[i][j]);
                }
              }}
              style={{ position: 'relative' }}
            >
              <Image className='image-css' src={boardSeq[i][j]} thumbnail />
              {color ? <span className={`dot ${color}`}></span> : null}
            </div>
          </td>,
        );
      }
      tableElem.push(<tr key={`row-${i}`}>{rowData}</tr>);
    }
    return tableElem;
  };
  return (
    <Container style={{ backgroundColor: 'gray', width: '80%' }}>
      <table>
        <tbody>{tableData()}</tbody>
      </table>
    </Container>
  );
};
export default Board;
