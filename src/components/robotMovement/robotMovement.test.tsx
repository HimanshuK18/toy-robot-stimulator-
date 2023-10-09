import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RobotMovement from './robotMovement';
import { RobotContext } from '../../state/robotState';

let mockContextValue = {
  currentPosition: { XPosition: 2, YPosition: 2 },
  dispatch: jest.fn(),
};

beforeEach(() => {
   mockContextValue = {
    currentPosition: { XPosition: 2, YPosition: 2 },
    dispatch: jest.fn(),
  };
});


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

  it('adds and removes event listener on mount and unmount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    render(
      <RobotContext.Provider value={mockContextValue}>
        <RobotMovement />
      </RobotContext.Provider>
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function), true);
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('handles Arrow keys press', () => {
    render(
      <RobotContext.Provider value={mockContextValue} >
        <RobotMovement />
      </RobotContext.Provider>
    );
    const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    const arrowLeftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    document.dispatchEvent(arrowUpEvent);
    document.dispatchEvent(arrowDownEvent);
    document.dispatchEvent(arrowRightEvent);
    document.dispatchEvent(arrowLeftEvent);

    expect(mockContextValue.dispatch).toHaveBeenCalledTimes(4);
  });
});
