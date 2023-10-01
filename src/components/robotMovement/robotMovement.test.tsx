import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RobotMovement from './RobotMovement';
import { RobotContext } from '../../state/robotState';


const mockContextValue = {
  currentPosition: { XPosition: 0, YPosition: 0 },
  dispatch: jest.fn(),
};

describe('RobotMovement', () => {
  it('should render without errors', () => {
    render(
      <RobotContext.Provider value={mockContextValue}>
        <RobotMovement />
      </RobotContext.Provider>
    );
  });

  it('should handle button clicks correctly', () => {
    const { getByText } = render(
      <RobotContext.Provider value={mockContextValue}>
        <RobotMovement />
      </RobotContext.Provider>
    );

    const upButton = getByText('Up');
    const downButton = getByText('Down');
    const leftButton = getByText('Left');
    const rightButton = getByText('Right');

    fireEvent.click(upButton);
    fireEvent.click(downButton);
    fireEvent.click(leftButton);
    fireEvent.click(rightButton);

    expect(mockContextValue.dispatch).toHaveBeenCalledTimes(4);

  });
});
