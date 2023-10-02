import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { RobotPositionProvider, RobotContext, Action } from './robotState';

// Mock a component that consumes the context
const MockConsumer = () => {
  const { currentPosition, dispatch } = useContext(RobotContext);

  const handleSave = () => {
    const newPosition = { XPosition: 10, YPosition: 20 };
    dispatch({ type: 'save', newPostion: newPosition });
  };

  const handleReset = () => {
    dispatch({ type: 'reset' });
  };

  return (
    <div>
      <p>X Position: {currentPosition.XPosition}</p>
      <p>Y Position: {currentPosition.YPosition}</p>
      <button onClick={handleSave}>Save Position</button>
      <button onClick={handleReset}>Reset Position</button>
    </div>
  );
};

describe('RobotContext', () => {
  it('provides the initial state', () => {
    render(
      <RobotPositionProvider>
        <MockConsumer />
      </RobotPositionProvider>
    );

    expect(screen.getByText('X Position: -1')).toBeInTheDocument();
    expect(screen.getByText('Y Position: -1')).toBeInTheDocument();
  });

  it('updates the state correctly on "save" action', () => {
    render(
      <RobotPositionProvider>
        <MockConsumer />
      </RobotPositionProvider>
    );

    const saveButton = screen.getByText('Save Position');
    fireEvent.click(saveButton);

    expect(screen.getByText('X Position: 10')).toBeInTheDocument();
    expect(screen.getByText('Y Position: 20')).toBeInTheDocument();
  });

  it('resets the state correctly on "reset" action', () => {
    render(
      <RobotPositionProvider>
        <MockConsumer />
      </RobotPositionProvider>
    );

    const saveButton = screen.getByText('Save Position');
    fireEvent.click(saveButton);

    const resetButton = screen.getByText('Reset Position');
    fireEvent.click(resetButton);

    expect(screen.getByText('X Position: -1')).toBeInTheDocument();
    expect(screen.getByText('Y Position: -1')).toBeInTheDocument();
  });
});
