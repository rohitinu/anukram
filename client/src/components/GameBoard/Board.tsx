import { Image } from 'react-bootstrap';
import { boardSeq, boardSeqString } from './imageImport';
const Board = ({
  coinPosition,
  handlePlayerClick,
  isActive,
}: {
  coinPosition: Record<string, string>;
  isActive?: boolean;
  handlePlayerClick: (val: string, cardName: string) => void;
}) => {
  const tableData = () => {
    const tableElem = [];
    for (let i = 0; i < 10; i++) {
      const rowData = [];
      for (let j = 0; j < 10; j++) {
        const color = coinPosition?.[`${i}-${j}`];
        rowData.push(
          <td style={{ cursor: isActive ? 'pointer' : 'not-allowed' }} key={`${i}-${j}`}>
            <div
              onClick={() => {
                if (!([0, 9].includes(i) && [0, 9].includes(j))) {
                  handlePlayerClick(`${i}-${j}`, boardSeqString[i][j]);
                }
              }}
              style={{ position: 'relative' }}
            >
              <Image
                style={{ height: '7rem', width: '4rem', padding: '2px' }}
                className='image-css'
                src={boardSeq[i][j]}
              />
              {color ? <span className={`dot ${color}-color`}></span> : null}
            </div>
          </td>,
        );
      }
      tableElem.push(<tr key={`row-${i}`}>{rowData}</tr>);
    }
    return tableElem;
  };

  return (
    <table>
      <tbody>{tableData()}</tbody>
    </table>
  );
};
export default Board;
