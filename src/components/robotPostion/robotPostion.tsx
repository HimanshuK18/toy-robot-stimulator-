import React, { useState, useContext } from 'react';
import { BOARD_DIMENSION } from '../../config/constants';
import { type Action, RobotContext } from '../../state/robotState';
import './robotPostion.css'

const RobotPostion: React.FC = () => {
  const { dispatch } = useContext(RobotContext);
  const [robotX, setRobotX] = useState(-1);
  const [robotY, setRobotY] = useState(-1);

  const handleSetRobotPosition = (e: React.FormEvent): void => {
    e.preventDefault();
    const newRobotX = robotX;
    const newRobotY = robotY;
    if (!isNaN(newRobotX) && !isNaN(newRobotY) && newRobotX >= 0 && newRobotX < BOARD_DIMENSION.x && newRobotY >= 0 && newRobotY < BOARD_DIMENSION.y) {
      const saveAction: Action = {
        type: 'save',
        newPostion: {
          XPosition: newRobotX,
          YPosition: newRobotY
        }
      }
      dispatch(saveAction);
    }
  };

  const handleReSetRobotPosition = (): void => {
    const reSetAction: Action = {
      type: 'reset'
    }
    setRobotX(-1);
    setRobotY(-1);
    dispatch(reSetAction);
  };

  return (<>
        <div className="container">
            <div className="column">
            <form onSubmit={handleSetRobotPosition}>
                <label htmlFor="xInput">X:</label>
                <input
                    data-testid="xInput-input"
                    type="number"
                    id="xInput"
                    aria-label="Enter your X coordinate"
                    min={0}
                    required
                    max={BOARD_DIMENSION.x - 1}
                    value={robotX === -1 ? '' : robotX}
                    onChange={(e) => { setRobotX(parseInt(e.target.value)); }}
                />
                <label htmlFor="yInput">Y:</label>
                <input
                    data-testid="yInput-input"
                    type="number"
                    aria-label="Enter your Y coordinate"
                    id="yInput"
                    required
                    min={0}
                    max={BOARD_DIMENSION.y - 1}
                    value={robotY === -1 ? '' : robotY}
                    onChange={(e) => { setRobotY(parseInt(e.target.value)); }}
                />
                <button aria-label="Set Robot Position" data-testid="Button-Position" type="submit" className='button-movement'>Set Robot Position</button>
                </form>
                <button aria-label="Reset Position" data-testid="Button-Reset" onClick={handleReSetRobotPosition} className='button-movement'>Reset Position</button>
            </div>
        </div>
    </>);
};

export default RobotPostion;
