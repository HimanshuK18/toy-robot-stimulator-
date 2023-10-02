import React from 'react';
import { render, screen } from '@testing-library/react';
import Board from './board';
import { RobotContext } from '../../state/robotState';


describe('Board Component', () => {
  it('should render the board', () => {
    const mockContextValue = {
      currentPosition: { XPosition: 0, YPosition: 0 },
      dispatch: jest.fn()
    };
    jest.spyOn(React, 'useContext').mockReturnValue(mockContextValue);
    render(<Board />);
    const boardElement = screen.getByTestId('board');
    expect(boardElement).toBeTruthy();
  });


  it('should display the status labels and values', () => {
    const mockContextValue = {
      currentPosition: { XPosition: 1, YPosition: 1 },
      dispatch: jest.fn()
    };
    jest.spyOn(React, 'useContext').mockReturnValue(mockContextValue);
    render(<Board />);
    const statusLabels = screen.getByTestId('status-robot');
    const xStatusValue = screen.getByTestId('status-x');
    const yStatusValue = screen.getByTestId('status-y');
    
    expect(statusLabels).toBeTruthy();
    expect(xStatusValue).toBeTruthy();
    expect(yStatusValue).toBeTruthy();
  });

  it('should display the robot icon', () => {
    const mockContextValue = {
      currentPosition: { XPosition: 1, YPosition: 1 },
      dispatch: jest.fn(),
    };
    const { getByText } = render(
      <RobotContext.Provider value={mockContextValue}>
        <Board />
      </RobotContext.Provider>
    );
    const robotIcon = screen.getByTestId('robot');
    expect(robotIcon).toBeTruthy();
  });

  it('should display the robot icon', () => {
    const mockContextValue = {
      currentPosition: { XPosition: 1, YPosition: 1 },
      dispatch: jest.fn(),
    };
    render(
      <RobotContext.Provider value={mockContextValue}>
        <Board />
      </RobotContext.Provider>
    );
    const robotIcon = screen.getByTestId('robot');
    expect(robotIcon).toBeTruthy();
  });
});
