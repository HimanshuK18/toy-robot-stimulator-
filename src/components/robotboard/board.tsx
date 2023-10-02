import React, { useContext } from 'react';
import { BOARD_DIMENSION } from '../../config/constants';
import { RobotContext } from '../../state/robotState';
import RobotMovement from '../robotMovement/robotMovement';
import RobotPostion from '../robotPostion/robotPostion';
import './board.css';

const Board: React.FC = () => {
  const { currentPosition } = useContext(RobotContext);

  const generateBoard = (): JSX.Element[] => {
    const rows = [];
    for (let i = BOARD_DIMENSION.x - 1; i >= 0; i--) {
      const cells = [];
      for (let j = BOARD_DIMENSION.y - 1; j >= 0; j--) {
        const cellColor = (i + j) % 2 === 0 ? 'maroon' : 'gary';
        cells.push(
                    <div key={j} className={`cell ${cellColor}`}>
                      {i},{ j } {currentPosition.XPosition === i && currentPosition.YPosition === j &&
                        <img data-testid="robot" className="icon" src={process.env.PUBLIC_URL + '/icons/icons-robot.png'} alt="Robot" />}
                    </div>
        );
      }
      rows.push(
                <div key={i}>
                    {cells}
                </div>
      );
    }

    return rows;
  };

  return (<>
    <div className="container">
      <div className="column">
        <div className="board" data-testid="board">
          {generateBoard()}
        </div>
      </div>
      <div className="column">
        <label htmlFor="Robot Status" className="status-label" data-testid="status-robot">Status: </label>
        <span className="status-text">
          X:<span data-testid="status-x" className="status-text-value">{currentPosition.XPosition === -1 ? '' : currentPosition.XPosition}</span>,
          Y:<span data-testid="status-y" className="status-text-value">{currentPosition.YPosition === -1 ? '' : currentPosition.YPosition}</span>
        </span>

        <RobotMovement></RobotMovement>
        <RobotPostion></RobotPostion>
      </div>
    </div>

  </>);
};

export default Board;
