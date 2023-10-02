import React, { useEffect, useRef, useContext } from 'react';
import { type Action, RobotContext } from '../../state/robotState';
import { Direction, BOARD_DIMENSION, type RobotPosition } from '../../config/constants';
import './robotMovement.css'

const RobotMovement: React.FC = () => {
  const { currentPosition, dispatch } = useContext(RobotContext);
  const currentPositionRef = useRef(currentPosition);

  useEffect(() => {
    currentPositionRef.current = currentPosition;
  }, [currentPosition]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const currentPos = currentPositionRef.current;

      switch (e.key) {
        case 'ArrowUp':
          handleRobotButton(Direction.Up, currentPos);
          break;
        case 'ArrowDown':
          handleRobotButton(Direction.Down, currentPos);
          break;
        case 'ArrowLeft':
          handleRobotButton(Direction.Left, currentPos);
          break;
        case 'ArrowRight':
          handleRobotButton(Direction.Right, currentPos);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleRobotButton = (buttonType: Direction, currentPos: RobotPosition): void => {
    const maxX = BOARD_DIMENSION.x;
    const maxY = BOARD_DIMENSION.y;
    let newXPosition: number = currentPos.XPosition;
    let newYPosition: number = currentPos.YPosition;

    if (buttonType === Direction.Up) {
      if (newYPosition < maxY - 1) {
        newYPosition = newYPosition + 1;
      }
    }

    if (buttonType === Direction.Down) {
      if (newYPosition > 0) {
        newYPosition = newYPosition - 1;
      }
    }

    if (buttonType === Direction.Left) {
      if (newXPosition < maxX - 1) {
        newXPosition = newXPosition + 1;
      }
    }

    if (buttonType === Direction.Right) {
      if (newXPosition > 0) {
        newXPosition = newXPosition - 1;
      }
    }

    const savePosition: Action = {
      type: 'save',
      newPostion: { XPosition: newXPosition, YPosition: newYPosition }
    }
    dispatch(savePosition);
  };

  return (<>
    <div>
      <h3>Move the Robot</h3>
      <div className="button-container">
        <button aria-label="Move Up" className="button-default" onClick={() => { handleRobotButton(Direction.Up, currentPosition); }}>Up</button>
        <button aria-label="Move Down" className="button-default" onClick={() => { handleRobotButton(Direction.Down, currentPosition); }}>Down</button>
        <button aria-label="Move Left" className="button-default" onClick={() => { handleRobotButton(Direction.Left, currentPosition); }}>Left</button>
        <button aria-label="Move Right" className="button-default" onClick={() => { handleRobotButton(Direction.Right, currentPosition); }}>Right</button>
      </div>
    </div>
  </>);
}

export default RobotMovement;
