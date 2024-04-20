import { Container, Image } from 'react-bootstrap';
import { boardSeq } from './imageImport';
const Board = () => {
  const tableData = () => {
    const tableElem = [];
    for (let i = 0; i < 10; i++) {
      const rowData = [];
      for (let j = 0; j < 10; j++) {
        rowData.push(
          <td key={`${i}-${j}`}>
            <div style={{}}>
              <Image className='image-css' src={boardSeq[i][j]} thumbnail />
            </div>
          </td>,
        );
      }
      tableElem.push(<tr key={`row-${i}`}>{rowData}</tr>);
    }
    return tableElem;
  };
  return (
    <Container style={{ backgroundColor: 'gray' }}>
      <table style={{}}>
        <tbody>{tableData()}</tbody>
      </table>
    </Container>
  );
};
export default Board;
